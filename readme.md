Este código é uma implementação de rotas para uma API RESTful usando o framework Express.js e o ORM Sequelize para lidar com o banco de dados.

## PIXKEY
GET api/pixkey:
Retorna uma lista de todos os registros na tabela PIXKEY.

GET api/pixkey/:id:
Retorna o registro específico na tabela PIXKEY com o ID especificado.

POST api/pixkey:
Cria um novo registro na tabela PIXKEY com as informações enviadas no corpo da requisição.

PUT api/pixkey/:id:
Atualiza um registro existente na tabela PIXKEY com o ID especificado e as informações enviadas no corpo da requisição.

DELETE api/pixkey/:id:
Deleta um registro existente na tabela PIXKEY com o ID especificado.

## BANCO
GET api/banco:
Retorna uma lista de todos os registros na tabela BANCO.

GET api/banco/:id:
Retorna o registro específico na tabela BANCO com o ID especificado.

POST api/banco:
Cria um novo registro na tabela BANCO com as informações enviadas no corpo da requisição.

PUT api/banco/:id:
Atualiza um registro existente na tabela BANCO com o ID especificado e as informações enviadas no corpo da requisição.

DELETE api/banco/:id:
Deleta um registro existente na tabela BANCO com o ID especificado.

## CONTA
GET api/conta:
Retorna uma lista de todos os registros na tabela CONTA.

GET api/conta/:id:
Retorna o registro específico na tabela CONTA com o ID especificado.

POST api/conta:
Cria um novo registro na tabela CONTA com as informações enviadas no corpo da requisição.

PUT api/conta/:id:
Atualiza um registro existente na tabela CONTA com o ID especificado e as informações enviadas no corpo da requisição.

DELETE api/conta/:id:
Deleta um registro existente na tabela CONTA com o ID especificado.


## Como executar este container Docker

Para rodar este container, você precisará ter o Docker instalado em sua máquina.

Faça o download do arquivo Dockerfile deste repositório.
Abra o terminal e navegue até a pasta onde você baixou o Dockerfile.
Execute o comando docker build -t nome-da-imagem . para criar a imagem a partir do Dockerfile.
Execute o comando 
```docker run -p 3000:3000 nome-da-imagem``` para iniciar o container.
O container será iniciado e a sua aplicação estará disponível em 
```http://localhost:3000```

Caso você queira rodar os testes, é só adicionar o comando npm test no final do comando docker run:

```
docker run -p 3000:3000 nome-da-imagem npm test
```
Obs: Lembre-se de que se você estiver utilizando outra porta, deve-se substituir a porta 3000 pelo número da porta desejada.
