#  README.md - Paggpix Payments API

### Descrição do Projeto

essa API é uma solução de _backend_ desenvolvida em NestJS para o Teste Técnico Paggpix. Ela é responsável por gerenciar a criação, listagem, busca e atualização de pagamentos, além de implementar uma camada de autenticação baseada em _token_ (`client_id_token`).

---

## Sumário

1. [Tecnologias Utilizadas](#1-tecnologias-utilizadas)
2. [Requisitos](#2-requisitos)
3. [Como Executar](#3-como-executar)
4. [Endpoints da API](#4-endpoints-da-api)

---

### 1.  Tecnologias Utilizadas

* **NestJS:** Framework Node.js para construção de aplicações _backend_ escaláveis.
* **TypeScript:** Linguagem para tipagem estática.
* **TypeORM:** ORM para manipulação do banco de dados.
* **PostgreSQL:** Banco de dados relacional (rodando em container Docker).
* **Docker & Docker Compose:** Gerenciamento de ambiente.

### 2.  Requisitos

Para executar a API, você precisa ter instalado:

* **Docker e Docker Compose**
* **Git**
* **nodejs**

### 3.  Como Executar
#### com o docker rodando em sua máquina

#### 3.1. Clone o Repositório:

```bash
git clone https://github.com/022Vinicius/paggpix-api
cd paggpix-api
```

#### 3.2. Configure as Variáveis de Ambiente:

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Token de autenticação
CLIENT_TOKEN=vinicius123 
PORT=3000

# Configurações do PostgreSQL
DB_HOST=paggpix-db
DB_USER=paggpix
DB_PASS=paggpix_password
DB_NAME=paggpix_payments
```

#### 3.3. Instale as Dependências:

```bash
npm install
```

#### 3.4. Execute a Aplicação:

```bash
docker compose up -d --build
```

#### 3.5. Inicie o NestJS:

 Instalar o Nest CLI globalmente:
```bash
npm install -g @nestjs/cli
```


#### 3.6. Acesse a API:

A API estará disponível em: **http://localhost:3000**

---

### 5. 🔗 Endpoints da API

Todos os endpoints requerem o header de autenticação:
```
client_id_token: vinicius123
```

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/payments` | Cria um novo pagamento |
| GET | `/payments` | Lista todos os pagamentos |
| GET | `/payments/:txid` | Busca um pagamento por ID |
| PATCH | `/payments/:txid/status` | Atualiza o status do pagamento |

---

### 4.  Exemplos de Testes e Comandos Úteis

#### 4.1. Executar um script SQL dentro do container:

```bash
# Copiar arquivo SQL para o container
docker cp .\database\tests.sql paggpix-db:/tests.sql

# Executar o script SQL dentro do container
docker exec -it paggpix-db bash -c "psql -U paggpix -d paggpix_payments -f /tests.sql"
```

#### 4.2. Exemplo de curl no terminal:

```bash
curl -X POST http://localhost:3000/payments \
-H "Content-Type: application/json" \
-H "client_id_token: vinicius123" \
-d '{"cnpj":"12345678000190","value":150}'
```

---

###  Persistência de Dados

Os dados são salvos em um Volume Docker (`paggpix_data`).

Para resetar o banco de dados:

```bash
docker compose down -v
docker compose up -d --build
```

### 5.  Testando a API com Postman

Para facilitar os testes da Paggpix Payments API, você pode usar o **Postman**


#### 5.1. Importando a Coleção

1. Abra o Postman.
2. Clique em **Import** → **Upload Files**.
3. Selecione o arquivo `paggpix_desafio.postman_collection.json` fornecido(se enocontra no github).
4. A coleção será adicionada à sua barra lateral no Postman.

---

#### 5.2. Configurando o Token de Autenticação

Todos os endpoints da API exigem o header `client_id_token`. Para configurar:

    1. Na coleção importada, clique com o botão direito → **Edit** → **Authorization**.
    2. Selecione **Type: API Key** ou **Header**.
    3. Configure:
    - **Key:** `client_id_token`
    - **Value:** `vinicius123`
    - **Add to:** `Header`
    4. Salve a configuração.  
>

---

#### 5.3. Testando Endpoints

Exemplos de endpoints e como testá-los no Postman:

| Método | Endpoint                 | Exemplo de Body (JSON)                  |
|--------|-------------------------|----------------------------------------|
| POST   | /payments               | `{"cnpj":"12345678000199","value":150}` |
| GET    | /payments               | —                                      |
| GET    | /payments/:txid         | —                                      |
| PATCH  | /payments/:txid/status  | `{"status":"DONE"}`                     |



 Seguindo esses passos, qualquer pessoa pode testar a api
