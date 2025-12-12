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

### 3. ⚙️ Como Executar

#### 3.1. Clone o Repositório:

```bash
git clone [https://github.com/022Vinicius/paggpix-api/edit/main/README.md]
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

```bash
npm run start:dev
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

---

### 🟢 Status do Projeto

Projeto **Concluído** ✅