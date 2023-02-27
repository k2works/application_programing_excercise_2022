CREATE SCHEMA inventories;
DROP TABLE IF EXISTS inventories.item;
CREATE SEQUENCE inventories.item_number;
CREATE TABLE inventories.item
(
    product_number INTEGER     NOT NULL,
    item_number    INTEGER     NOT NULL,
    item_code      VARCHAR(40) NOT NULL UNIQUE,
    quantity       INTEGER     NOT NULL,
    created_by     VARCHAR(40) NOT NULL,
    created_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number),
    FOREIGN KEY (item_number) REFERENCES inventories.item (product_number)
);
COMMENT
ON TABLE inventories.item IS '単品';
COMMENT
ON COLUMN inventories.item.product_number IS '商品番号';
COMMENT
ON COLUMN inventories.item.item_number IS '単品番号';
COMMENT
ON COLUMN inventories.item.item_code IS '単品コード';
COMMENT
ON COLUMN inventories.item.quantity IS '数量';
COMMENT
ON COLUMN inventories.item.created_by IS '作成者';
COMMENT
ON COLUMN inventories.item.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.supplier;
CREATE SEQUENCE inventories.supplier_number;
CREATE TABLE inventories.supplier
(
    supplier_number      INTEGER,
    supplier_line_number INTEGER,
    supplier_code        VARCHAR(40) NOT NULL UNIQUE,
    supplier_name        VARCHAR(40) NOT NULL,
    created_by           VARCHAR(40) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (supplier_number, supplier_line_number)
);
COMMENT
ON TABLE inventories.supplier IS '仕入先';
COMMENT
ON COLUMN inventories.supplier.supplier_number IS '仕入先番号';
COMMENT
ON COLUMN inventories.supplier.supplier_line_number IS '仕入先枝番';
COMMENT
ON COLUMN inventories.supplier.supplier_code IS '仕入先コード';
COMMENT
ON COLUMN inventories.supplier.supplier_name IS '仕入先名';
COMMENT
ON COLUMN inventories.supplier.created_by IS '作成者';
COMMENT
ON COLUMN inventories.supplier.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.placement_order;
CREATE SEQUENCE inventories.placement_order_number;
CREATE TABLE inventories.placement_order
(
    placement_order_number             INTEGER        NOT NULL,
    placement_order_date               DATE           NOT NULL,
    supplier_number                    INTEGER        NOT NULL,
    supplier_line_number               INTEGER        NOT NULL,
    delivery_date                      DATE           NOT NULL,
    placement_order_total_price_amount DECIMAL(10, 0) NOT NULL,
    placement_order_total_tax_amount   DECIMAL(10, 0) NOT NULL,
    created_by                         VARCHAR(40)    NOT NULL,
    created_at                         TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (placement_order_number),
    FOREIGN KEY (supplier_number, supplier_line_number) REFERENCES inventories.supplier (supplier_number, supplier_line_number)
);
COMMENT
ON TABLE inventories.placement_order IS '発注';
COMMENT
ON COLUMN inventories.placement_order.placement_order_number IS '発注番号';
COMMENT
ON COLUMN inventories.placement_order.placement_order_date IS '発注日';
COMMENT
ON COLUMN inventories.placement_order.supplier_number IS '仕入先番号';
COMMENT
ON COLUMN inventories.placement_order.supplier_line_number IS '仕入先枝番';
COMMENT
ON COLUMN inventories.placement_order.delivery_date IS '納期';
COMMENT
ON COLUMN inventories.placement_order.placement_order_total_price_amount IS '発注合計金額';
COMMENT
ON COLUMN inventories.placement_order.placement_order_total_tax_amount IS '消費税金額';
COMMENT
ON COLUMN inventories.placement_order.created_by IS '作成者';
COMMENT
ON COLUMN inventories.placement_order.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.placement_order_line;
CREATE SEQUENCE inventories.placement_order_line_number;
CREATE TABLE inventories.placement_order_line
(
    placement_order_number        INTEGER       NOT NULL,
    placement_order_line_number   INTEGER       NOT NULL,
    product_number                INTEGER       NOT NULL,
    product_name                  VARCHAR(40)   NOT NULL,
    cost_price                    DECIMAL(8, 0) NOT NULL,
    placement_order_line_quantity INTEGER       NOT NULL,
    arrived_quantity              INTEGER       NOT NULL,
    complete                      INTEGER       NOT NULL,
    created_by                    VARCHAR(40)   NOT NULL,
    created_at                    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (placement_order_number, placement_order_line_number),
    FOREIGN KEY (placement_order_number) REFERENCES inventories.placement_order (placement_order_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number)
);
COMMENT
ON TABLE inventories.placement_order_line IS '発注明細';
COMMENT
ON COLUMN inventories.placement_order_line.placement_order_number IS '発注番号';
COMMENT
ON COLUMN inventories.placement_order_line.placement_order_line_number IS '発注明細番号';
COMMENT
ON COLUMN inventories.placement_order_line.product_number IS '商品番号';
COMMENT
ON COLUMN inventories.placement_order_line.product_name IS '商品名';
COMMENT
ON COLUMN inventories.placement_order_line.cost_price IS '仕入単価';
COMMENT
ON COLUMN inventories.placement_order_line.placement_order_line_quantity IS '発注数量';
COMMENT
ON COLUMN inventories.placement_order_line.arrived_quantity IS '入荷数量';
COMMENT
ON COLUMN inventories.placement_order_line.complete IS '完了';
COMMENT
ON COLUMN inventories.placement_order_line.created_by IS '作成者';
COMMENT
ON COLUMN inventories.placement_order_line.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.inventory;
CREATE TABLE inventories.inventory
(
    product_number     INTEGER     NOT NULL,
    lot_number         INTEGER     NOT NULL,
    inventory_type     VARCHAR(40) NOT NULL,
    inventory_quantity INTEGER     NOT NULL,
    created_by         VARCHAR(40) NOT NULL,
    created_at         TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_number, lot_number, inventory_type),
    FOREIGN KEY (product_number) REFERENCES inventories.item (product_number)
);
COMMENT
ON TABLE inventories.inventory IS '在庫';
COMMENT
ON COLUMN inventories.inventory.product_number IS '商品番号';
COMMENT
ON COLUMN inventories.inventory.lot_number IS 'ロット番号';
COMMENT
ON COLUMN inventories.inventory.inventory_type IS '在庫種別';
COMMENT
ON COLUMN inventories.inventory.inventory_quantity IS '在庫数量';
COMMENT
ON COLUMN inventories.inventory.created_by IS '作成者';
COMMENT
ON COLUMN inventories.inventory.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.arrival;
CREATE SEQUENCE inventories.arrival_number;
CREATE TABLE inventories.arrival
(
    arrival_number INTEGER     NOT NULL,
    arrival_date   DATE        NOT NULL,
    created_by     VARCHAR(40) NOT NULL,
    created_at     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (arrival_number)
);
COMMENT
ON TABLE inventories.arrival IS '入荷';
COMMENT
ON COLUMN inventories.arrival.arrival_number IS '入荷番号';
COMMENT
ON COLUMN inventories.arrival.arrival_date IS '入荷日';
COMMENT
ON COLUMN inventories.arrival.created_by IS '作成者';
COMMENT
ON COLUMN inventories.arrival.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.arrival_line;
CREATE SEQUENCE inventories.arrival_line_number;
CREATE TABLE inventories.arrival_line
(
    arrival_number       INTEGER     NOT NULL,
    arrival_line_number  INTEGER,
    product_number       INTEGER     NOT NULL,
    product_name         VARCHAR(40) NOT NULL,
    supplier_number      INTEGER,
    supplier_line_number INTEGER,
    quantity             INTEGER     NOT NULL,
    created_by           VARCHAR(40) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (arrival_number, arrival_line_number),
    FOREIGN KEY (arrival_number) REFERENCES inventories.arrival (arrival_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number),
    FOREIGN KEY (supplier_number, supplier_line_number) REFERENCES inventories.supplier (supplier_number, supplier_line_number)
);
COMMENT
ON TABLE inventories.arrival_line IS '入荷明細';
COMMENT
ON COLUMN inventories.arrival_line.arrival_number IS '入荷番号';
COMMENT
ON COLUMN inventories.arrival_line.arrival_line_number IS '入荷明細番号';
COMMENT
ON COLUMN inventories.arrival_line.product_number IS '商品番号';
COMMENT
ON COLUMN inventories.arrival_line.product_name IS '商品名';
COMMENT
ON COLUMN inventories.arrival_line.supplier_number IS '仕入先番号';
COMMENT
ON COLUMN inventories.arrival_line.supplier_line_number IS '仕入先枝番';
COMMENT
ON COLUMN inventories.arrival_line.quantity IS '数量';
COMMENT
ON COLUMN inventories.arrival_line.created_by IS '作成者';
COMMENT
ON COLUMN inventories.arrival_line.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.purchase;
CREATE SEQUENCE inventories.purchase_number;
CREATE TABLE inventories.purchase
(
    purchase_number           INTEGER        NOT NULL,
    purchase_date             DATE           NOT NULL,
    supplier_number           INTEGER        NOT NULL,
    supplier_line_number      INTEGER        NOT NULL,
    total_purchase_amount     DECIMAL(10, 0) NOT NULL,
    total_purchase_tax_amount DECIMAL(10, 0) NOT NULL,
    created_by                VARCHAR(40)    NOT NULL,
    created_at                TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (purchase_number),
    FOREIGN KEY (supplier_number, supplier_line_number) REFERENCES inventories.supplier (supplier_number, supplier_line_number)
);
COMMENT
ON TABLE inventories.purchase IS '仕入';
COMMENT
ON COLUMN inventories.purchase.purchase_number IS '仕入番号';
COMMENT
ON COLUMN inventories.purchase.purchase_date IS '仕入日';
COMMENT
ON COLUMN inventories.purchase.supplier_number IS '仕入先番号';
COMMENT
ON COLUMN inventories.purchase.supplier_line_number IS '仕入先枝番';
COMMENT
ON COLUMN inventories.purchase.total_purchase_amount IS '仕入金額';
COMMENT
ON COLUMN inventories.purchase.total_purchase_tax_amount IS '仕入消費税額';
COMMENT
ON COLUMN inventories.purchase.created_by IS '作成者';
COMMENT
ON COLUMN inventories.purchase.created_at IS '作成日時';

DROP TABLE IF EXISTS inventories.purchase_line;
CREATE SEQUENCE inventories.purchase_line_number;
CREATE TABLE inventories.purchase_line
(
    purchase_number      INTEGER       NOT NULL,
    purchase_line_number INTEGER       NOT NULL,
    product_number       INTEGER       NOT NULL,
    product_name         VARCHAR(40)   NOT NULL,
    purchase_price       DECIMAL(8, 0) NOT NULL,
    purchase_quantity    INTEGER       NOT NULL,
    created_by           VARCHAR(40)   NOT NULL,
    created_at           TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (purchase_number, purchase_line_number),
    FOREIGN KEY (purchase_number) REFERENCES inventories.purchase (purchase_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number)
);
COMMENT
ON TABLE inventories.purchase_line IS '仕入明細';
COMMENT
ON COLUMN inventories.purchase_line.purchase_number IS '仕入番号';
COMMENT
ON COLUMN inventories.purchase_line.purchase_line_number IS '仕入明細番号';
COMMENT
ON COLUMN inventories.purchase_line.product_number IS '商品番号';
COMMENT
ON COLUMN inventories.purchase_line.product_name IS '商品名';
COMMENT
ON COLUMN inventories.purchase_line.purchase_price IS '仕入単価';
COMMENT
ON COLUMN inventories.purchase_line.purchase_quantity IS '仕入数量';
COMMENT
ON COLUMN inventories.purchase_line.created_by IS '作成者';
COMMENT
ON COLUMN inventories.purchase_line.created_at IS '作成日時';


