const request = require('supertest');
const router = require('./routes');
const { Banco, Conta, PIXKEY } = require('./database');
const express = require('express');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(router);

describe('GET /pixkey', () => {

    var PIX;
    beforeAll(async () => {
        const [pixkey, created] = await PIXKEY.findOrCreate({
            where: { chavepix: '873.078.680-08' },
            defaults: { chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true }
        });
        PIX = pixkey;
    });

    var bankId;
    beforeAll(async () => {
        const [bank, created] = await Banco.findOrCreate({
            where: { nome: 'Banco do Brasil' },
            defaults: { nome: 'Banco do Brasil', agencia: 1, CC: 1 }
        });
        bankId = bank.id;
    });

    var accountId;
    beforeAll(async () => {
        const [account, created] = await Conta.findOrCreate({
            where: { cpf_cnpj: '873.078.680-08' },
            defaults: { cpf_cnpj: '873.078.680-08', nome: 'Geraldo' }
        });
        accountId = account.id;
    });

    it('deve retornar todas as chaves Pix', async () => {
        var res = await request(app).get('/pixkey');
        expect(res.status).toBe(200);
    });
});

describe('GET /pixkey/:id', () => {

    var pixkeyId;
    beforeAll(async () => {
        const [pixkey, created] = await PIXKEY.findOrCreate({
            where: { chavepix: '873.078.680-08' },
            defaults: { chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true }
        });
        pixkeyId = pixkey.id;
    });

    it('deve retornar uma chave Pix específica', async () => {
        // Act
        const response = await request(app).get(`/pixkey/${pixkeyId}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('chavepix', '873.078.680-08');
    });

    it('deve retornar 404 se a chave Pix não for encontrada', async () => {
        // Act
        const response = await request(app).get('/pixkey/999999999');
        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Pixkey not found');
    });
});


describe('POST /pixkey', () => {

    var pixkeyId;
    beforeAll(async () => {
        const [pixkey, created] = await PIXKEY.findOrCreate({
            where: { chavepix: '873.078.680-08' },
            defaults: { chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true }
        });
        pixkeyId = pixkey.id;
    });

    var bankId;
    beforeAll(async () => {
        const [bank, created] = await Banco.findOrCreate({
            where: { nome: 'Banco do Brasil' },
            defaults: { nome: 'Banco do Brasil', agencia: 1, CC: 1 }
        });
        bankId = bank.id;
    });

    var accountId;
    beforeAll(async () => {
        const [account, created] = await Conta.findOrCreate({
            where: { cpf_cnpj: '873.078.680-08' },
            defaults: { cpf_cnpj: '873.078.680-08', nome: 'Geraldo' }
        });
        accountId = account.id;
    });

    it('deve criar uma nova chave Pix', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ chavepix: uuidv4(), banco_id: bankId, conta_id: accountId, tipochave: 'CHAVE_ALEATORIA', validado: false });
        // Assert
        expect(response.status).toBe(200);
    });

    it('deve retornar 404 se o banco ou a conta não for encontrado', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ chavepix: '873.078.680-08', banco_id: 9999, conta_id: 99999, tipochave: 'CPF', validado: true });


        // Assert
        expect(response.status).toBe(404);
    });

    it('deve retornar 400 se o tipo de chave Pix for inválido', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'invalid_key_type', validado: true });

        // Assert
        expect(response.status).toBe(400);
    });

    it('deve retornar 400 se a chave Pix não corresponder ao padrão do tipo de chave Pix', async () => {

        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ chavepix: 'invalid_key', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true });

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid chavepix');
    });

    it('deve retornar 400 se a chave Pix já existir', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true });

        // Assert
        expect(response.status).toBe(400);
    });
});

describe('PUT /pixkey/:id', () => {

    var PIX;
    beforeAll(async () => {
        const [pixkey, created] = await PIXKEY.findOrCreate({
            where: { chavepix: '873.078.680-08' },
            defaults: { chavepix: '873.078.680-08', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: true }
        });
        PIX = pixkey;
    });

    var bankId;
    beforeAll(async () => {
        const [bank, created] = await Banco.findOrCreate({
            where: { nome: 'Banco do Brasil' },
            defaults: { nome: 'Banco do Brasil', agencia: 1, CC: 1 }
        });
        bankId = bank.id;
    });

    var accountId;
    beforeAll(async () => {
        const [account, created] = await Conta.findOrCreate({
            where: { cpf_cnpj: '873.078.680-08' },
            defaults: { cpf_cnpj: '873.078.680-08', nome: 'Geraldo' }
        });
        accountId = account.id;
    });

    it('deve atualizar uma chave Pix existente', async () => {

        // Act
        const response = await request(app)
            .put(`/pixkey/${PIX.id}`)
            .send({ chavepix: '931.946.870-26', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: false });

        // Assert
        expect(response.status).toBe(200);
    });

    it('deve retornar 404 se o banco ou a conta não for encontrado', async () => {

        // Act
        const response = await request(app)
            .put('/pixkey/1')
            .send({ chavepix: '931.946.870-26', banco_id: 999, conta_id: 999, tipochave: 'CPF', validado: false });

        // Assert
        expect(response.status).toBe(404);
    });

    it('deve retornar 404 se a chave Pix não for encontrada', async () => {
        // Act
        const response = await request(app)
            .put('/pixkey/99999')
            .send({ chavepix: '684.495.170-10', banco_id: 1, conta_id: 1, tipochave: 'CPF', validado: false });

        // Assert
        expect(response.status).toBe(404);
    });
});

describe('DELETE /pixkey/:id', () => {

    var pixkeyId;
    beforeAll(async () => {
        const [pixkey, created] = await PIXKEY.findOrCreate({
            where: { chavepix: '04430029-5ace-4605-88db-e147ecf7781f' },
            defaults: { chavepix: '04430029-5ace-4605-88db-e147ecf7781f', banco_id: 1, conta_id: 1, tipochave: 'CHAVE_ALEATORIA', validado: true }
        });
        pixkeyId = pixkey.id;
    });

    it('deve excluir uma chave Pix existente', async () => {

        const response = await request(app).delete(`/pixkey/${pixkeyId}`);

        // Assert
        expect(response.status).toBe(200);
    });

    it('deve retornar 404 se a chave Pix não for encontrada', async () => {
        // Act
        const response = await request(app).delete('/pixkey/9999999999999');

        // Assert
        expect(response.status).toBe(404);
    });
});
