create EXTENSION 'uuid-ossp'; -- uuid-ossp vai gerar os ids de pagamentos automaticamente

create table customers(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    pix_key VARCHAR(255) NULL NULL,
    pix_type VARCHAR(20) NOT NULL.
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);