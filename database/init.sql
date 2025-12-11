create EXTENSION IF NOT EXISTS "uuid-ossp"; -- uuid-ossp vai gerar os ids de pagamentos automaticamente, 
-- IF NOT EXISTS foi criado para evitar erro de verificação a cada execuçao do sql e visualização no pgadmin



-- apagar tabelas caso já existam para evitar erros 
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS customers CASCADE;


create TABLE IF NOT EXISTS customers(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    pix_key VARCHAR(255) NOT NULL,
    pix_type VARCHAR(20) NOT NULL,
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



create TABLE IF NOT EXISTS payments(
    txid VARCHAR(35) PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE ,--se o id da tabela customers for apagado, todos os pagamentos relacionados a esse cliente tb serao
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    total_value NUMERIC(15,2) NOT NULL,
    creat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);

-- índices
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id); --usados para melhorar a consulta, ja que estou usando foreign key










