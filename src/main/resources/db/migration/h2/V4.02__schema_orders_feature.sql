ALTER TABLE orders.customer
    DROP COLUMN IF EXISTS customer_name;
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS first_name VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS last_name VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS email VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS birthday DATE;
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS gender VARCHAR(1);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS zip VARCHAR(8);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS prefecture VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS address_1 VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS address_2 VARCHAR(40);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS telephone_number VARCHAR(12);
ALTER TABLE orders.customer
    ADD COLUMN IF NOT EXISTS withdraw DATE;
COMMENT ON COLUMN orders.customer.first_name IS '姓';
COMMENT ON COLUMN orders.customer.last_name IS '名';
COMMENT ON COLUMN orders.customer.email IS 'メールアドレス';
COMMENT ON COLUMN orders.customer.birthday IS '生年月日';
COMMENT ON COLUMN orders.customer.gender IS '性別';
COMMENT ON COLUMN orders.customer.zip IS '郵便番号';
COMMENT ON COLUMN orders.customer.prefecture IS '都道府県';
COMMENT ON COLUMN orders.customer.address_1 IS '住所1';
COMMENT ON COLUMN orders.customer.address_2 IS '住所2';
COMMENT ON COLUMN orders.customer.telephone_number IS '電話番号';
COMMENT ON COLUMN orders.customer.withdraw IS '退会日';
