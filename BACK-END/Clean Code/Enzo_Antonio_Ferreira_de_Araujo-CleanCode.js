// =============================================================================
// ROTA DE AGENDAMENTOS
// =============================================================================

const express = require('express');
const pool = require('./config/database');

const app = express();
app.use(express.json());

const queryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) reject(err)
            else resolve(results)
        })
    })
};

function validarID() {
    if (!id || isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'ID inválido.'
        })
    }
};

function validarExistenciaReserva(result, res, tipo) {
    if (result.length === 0) {
        mensagem(res, tipo)
        return false
    }
    return true
};

app.get('/reservas'), async (req, res) => {
    try {
        const reservas = await queryAsync("SELECT * FROM reservas")
        res.json({
            sucesso: true,
            dados: reservas,
            total: reservas.length
        });

    } catch (erro) {
        console.error('Erro ao listar reservas: ', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar reservas.',
            erro: erro.message
        })
    }
};

// Busca de Reserva Por Data
app.get('/reservas/:data'), async (req, res) => {
    try {
        const {data} = req.params
        const reservas = await queryAsync("SELECT * FROM reservas WHERE data = ?", [data])

        if (!validarExistenciaReserva(reservas, res, 'Reserva')) {
            return
        }

        if (reservas.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Reserva não encontrada.'
            })
        }
        res.json({
            sucesso: true,
            dados: reservas[0]
        })

    } catch (erro) {
        console.error('Erro ao procurar reserva: ', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao encontrar reserva.',
            erro: erro.message
        })
    }
};

function validarDadosReserva (dados, res) {
    if (Object.keys(dados).length === 0) {
        res.status(400).json({
            sucesso: false,
            mensagem: 'Nenhum dado enviado.'
        })
        return false
    } else {
        return true
    }
};

app.put('/reservas/:id', async (req, res) => {
    try {
        const {id} = req.params
        const corpo = req.body

        validarID(ID)

        const reserva = await queryAsync("SELECT * FROM reservas WHERE id = ?", [id])
        if (!validarExistenciaReserva(reserva, res, 'Reserva')) {
            return
        }

        const reservaAtualizada = {}
        if (!validarDadosReserva(reserva, res) !== true) {
            reservaAtualizada.dados
        } else {
            return 'Dados são obrigatórios.'
        }

        await queryAsync("UPDATE reservas SET ? WHERE id = ?", [dados, id])
        res.status(201).json({
            sucesso: true,
            mensagem: 'Informações alteradas com sucesso.'
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao alterar informações da reserva.',
            erro: erro.message
        })
    }
});

app.delete('/reservas/:id'), async (req, res) => {
    try {
        const {id} = req.params

        validarID(ID)

        const reservaExiste = await queryAsync("SELECT * FROM reservas WHERE id = ?", [id])

        if (reservaExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Reserva não encontrada.'
            })
        }

        await queryAsync("DELETE FROM reservas WHERE id = ?", [id])
        res.json({
            sucesso: true,
            mensagem: 'Reserva cancelada com sucesso!'
        })

    } catch (erro) {
        console.error('Erro ao cancelar reserva.', erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao cancelar reserva.',
            erro: erro.message
        })
    }
};

module.exports = app