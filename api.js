// api.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000; // Ou use process.env.PORT se preferir

// Middleware
app.use(cors());
app.use(express.json());

// Configurações do banco de dados
const db = mysql.createConnection({
    host: 'localhost', // ou seu host do banco de dados
    user: 'root',
    password: 'Pablo13022001@',
    database: 'DesafioRadix'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão ao banco de dados estabelecida com sucesso!');
});

// Rota para obter apenas dados de temperatura
app.get('/api/sensores/temperatura', (req, res) => {
    const query = 'SELECT data_hora, temperatura FROM sensor_data'; // Ajuste conforme sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar os dados de temperatura:', err);
            return res.status(500).json({ error: 'Erro ao consultar os dados de temperatura.' });
        }
        res.json(results);
    });
});

// Rota para obter apenas dados de data e hora
app.get('/api/sensores/datas', (req, res) => {
    const query = 'SELECT data_hora FROM sensor_data'; // Ajuste conforme sua tabela
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar os dados de data e hora:', err);
            return res.status(500).json({ error: 'Erro ao consultar os dados de data e hora.' });
        }
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
