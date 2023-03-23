const request = require('supertest');
const router = require('../routes/routes');
const { Bank } = require('../models/bank');
const { Account } = require('../models/account');
const { PIXKEY } = require('../models/pixkey');
const { generate } = require('gerador-validador-cpf');

const express = require('express');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(router);

var pixkeyId,accountId,bankId,cpfMock;

const createMockData = async () => {

    cpfMock = generate({ format: true });

    // Cria um registro PIXKEY
    const [pixkey] = await PIXKEY.findOrCreate({
      where: { pixkey: cpfMock},
      defaults: {
        pixKey: cpfMock,
        bank_id: 1,
        account_id: 1,
        typeOfKey: 'CPF',
        valid: true,
        email: 'EMAILLEGAL@BEMLEGALZAO.COM',
      },
    });
  
    // Cria um registro Banco
    const [bank] = await Bank.findOrCreate({
      where: { name: 'Banco do Brasil' },
      defaults: { name: 'Banco do Brasil', agency: '1', accountNumber: '1' },
    });
  
    // Cria um registro Conta
    const [account] = await Account.findOrCreate({
      where: { federalDocument: cpfMock },
      defaults: { federalDocument: cpfMock, name: 'Geraldo' },
    });
  
    pixkeyId = pixkey;
    accountId = account;
    bankId = bank;

    console.log("CPF MOCK" + cpfMock)
  };
  

beforeAll(() => createMockData());


describe('GET /pixkey', () => {

    it('deve retornar todas as chaves Pix', async () => {
        var res = await request(app).get('/pixkey');
        expect(res.status).toBe(200);
    });
});

describe('GET /pixkey/:id', () => {

    it('deve retornar uma chave Pix específica', async () => {
        // Act
        const response = await request(app).get(`/pixkey/${pixkeyId.id}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pixKey', cpfMock);
    });

    it('deve retornar 404 se a chave Pix não for encontrada', async () => {
        // Act
        const response = await request(app).get('/pixkey/999999999');
        // Assert
        expect(response.status).toBe(404);
    });
});


describe('POST /pixkey', () => {

    it('deve criar uma nova chave Pix', async () => {
        // Act
        const response = await request(app).post('/pixkey').send({
          pixKey: uuidv4(),
          bank_id: bankId.id,
          account_id: accountId.id,
          typeOfKey: 'CHAVE_ALEATORIA',
          valid: false,
          email: 'EMAILLEGAL@BEMLEGALZAO.COM',
        });
        // Assert
        if (response.status !== 200) {
          console.log(response.body);
        }
        expect(response.status).toBe(200);
      });
      

    it('deve retornar 404 se o banco ou a conta não for encontrado', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ pixKey: cpfMock, bank_id: 9999, account_id: 99999, typeOfKey: 'CPF', valid: true , email:"EMAILLEGAL@BEMLEGALZAO.COM"});


        // Assert
        expect(response.status).toBe(404);
    });

    it('deve retornar 400 se o tipo de chave Pix for inválido', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ pixKey: cpfMock, bank_id: 1, account_id: 1, typeOfKey: 'invalid_key_type', valid: true , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(400);
    });

    it('deve retornar 400 se a chave Pix não corresponder ao padrão do tipo de chave Pix', async () => {

        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ pixKey: 'invalid_key', bank_id: 1, account_id: 1, typeOfKey: 'CPF', valid: true , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(400);
    });

    it('deve retornar 400 se a chave Pix já existir', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ pixKey: cpfMock, bank_id: 1, account_id: 1, typeOfKey: 'CPF', valid: true , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(400);
    });

    it('deve retornar 400 se o email não for válido', async () => {
        // Act
        const response = await request(app)
            .post('/pixkey')
            .send({ pixKey: cpfMock, bank_id: 1, account_id: 1, typeOfKey: 'CPF', valid: true , email:"email invalido 777 raffa moreira mano"});

        // Assert
        expect(response.status).toBe(400);
    });
});

describe('PUT /pixkey/:id', () => {

    it('deve atualizar uma chave Pix existente', async () => {

        // Act
        const response = await request(app)
            .put(`/pixkey/${pixkeyId.id}`)
            .send({ pixKey: '931.946.870-26', bank_id: 1, account_id: 1, typeOfKey: 'CPF', valid: false , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(200);
    });

    it('deve retornar 404 se o banco ou a conta não for encontrado', async () => {

        // Act
        const response = await request(app)
            .put('/pixkey/1')
            .send({ pixKey: '931.946.870-26', bank_id: 999, account_id: 999, typeOfKey: 'CPF', valid: false , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(404);
    });

    it('deve retornar 404 se a chave Pix não for encontrada', async () => {
        // Act
        const response = await request(app)
            .put('/pixkey/99999')
            .send({ pixKey: '684.495.170-10', bank_id: 1, account_id: 1, typeOfKey: 'CPF', valid: false , email:"EMAILLEGAL@BEMLEGALZAO.COM"});

        // Assert
        expect(response.status).toBe(404);
    });
});

describe('DELETE /pixkey/:id', () => {

    it('deve excluir uma chave Pix existente', async () => {

        const response = await request(app).delete(`/pixkey/${pixkeyId.id}`);

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
