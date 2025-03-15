const { put, get } = require('@vercel/blob');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.env.TMPDIR || __dirname, 'rocketq.sqlite');

async function downloadDatabase() {
  try {
    const blob = await get('rocketq.sqlite');
    if (blob) {
      const data = await blob.arrayBuffer();
      fs.writeFileSync(DB_PATH, Buffer.from(data));
      console.log('Banco de dados SQLite baixado com sucesso.');
    }
  } catch (error) {
    console.log('Banco de dados ainda não existe no Vercel Blob.');
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

// Certifica-se de que a pasta do banco de dados existe
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
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
