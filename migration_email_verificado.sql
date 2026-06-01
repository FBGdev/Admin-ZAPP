-- Adiciona coluna email_verificado na tabela usuarios
ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS email_verificado BOOLEAN DEFAULT false;

-- Opcional: marcar como true para usuarios existentes que ja acessam
UPDATE usuarios SET email_verificado = true WHERE isAdmin = true;
