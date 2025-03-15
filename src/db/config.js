const { put, get } = require('@vercel/blob');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db', 'rocketq.sqlite');

async function downloadDatabase() {
  try {
    const blob = await get('https://your-vercel-blob-url/rocketq.sqlite');
    if (blob) {
      fs.writeFileSync(DB_PATH, blob.body);
      console.log('Banco de dados SQLite baixado com sucesso.');
    }
  } catch (error) {
    console.log('Erro ao baixar banco de dados:', error);
  }
}

async function uploadDatabase() {
  try {
    await put('rocketq.sqlite', fs.readFileSync(DB_PATH), { access: 'public' });
    console.log('Banco de dados SQLite atualizado no vercel-blob.');
  } catch (error) {
    console.error('Erro ao fazer upload do banco de dados:', error);
  }
}

// Baixa o banco antes de abrir a conexão
downloadDatabase();

module.exports = async () => {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  // Faz o upload do banco de tempos em tempos para evitar perda de dados
  setInterval(uploadDatabase, 60000); // Atualiza a cada 60 segundos

  return db;
};
