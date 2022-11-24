ALTER TABLE orders.customer ADD COLUMN IF NOT EXISTS user_id VARCHAR(255) NOT NULL default 'DUMMY';
ALTER TABLE orders.customer ADD FOREIGN KEY (user_id) REFERENCES auth.usr(user_id);
ALTER TABLE orders.product ADD COLUMN IF NOT EXISTS supplier_number INTEGER NOT NULL default 0;
ALTER TABLE orders.product ADD COLUMN IF NOT EXISTS supplier_line_number INTEGER NOT NULL default 0;
ALTER TABLE orders.product ADD FOREIGN KEY (supplier_number, supplier_line_number) REFERENCES inventories.supplier(supplier_number, supplier_line_number);
