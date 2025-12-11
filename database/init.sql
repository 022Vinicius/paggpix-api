create EXTENSION "uuid-ossp"; -- uuid-ossp vai gerar os ids de pagamentos automaticamente


create table customers(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    pix_key VARCHAR(255) NULL NULL,
    pix_type VARCHAR(20) NOT NULL,
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table payments(
    txid VARCHAR(35) PRIMARY KEY,
    customer_id NOT NULL, FOREIGN KEY, UUID REFERENCES customers(id),
    status VARCHAR(20) NOT NULL, DEFAULT 'pending',
    total_value NUMERIC(15,2) NOT NULL,
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);