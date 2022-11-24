CREATE SCHEMA orders;
DROP TABLE IF EXISTS orders.product;
CREATE SEQUENCE orders.product_number;
CREATE TABLE orders.product
(
    product_number     INTEGER       NOT NULL,
    product_code       VARCHAR(6)    NOT NULL,
    product_name       VARCHAR(40)   NOT NULL,
    product_name_short VARCHAR(40)   NOT NULL,
    product_type       VARCHAR(5)    NOT NULL,
    sales_price        DECIMAL(8, 0) NOT NULL,
    cost_price         DECIMAL(8, 0) NOT NULL,
    tax_type           VARCHAR(5)    NOT NULL,
    created_by         VARCHAR(40)   NOT NULL,
    created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_number)
);
COMMENT ON TABLE orders.product IS '商品';
COMMENT ON COLUMN orders.product.product_number IS '商品番号';
COMMENT ON COLUMN orders.product.product_code IS '商品コード';
COMMENT ON COLUMN orders.product.product_name IS '商品名称';
COMMENT ON COLUMN orders.product.product_name_short IS '商品略称';
COMMENT ON COLUMN orders.product.product_type IS '商品区分';
COMMENT ON COLUMN orders.product.sales_price IS '販売単価';
COMMENT ON COLUMN orders.product.cost_price IS '仕入単価';
COMMENT ON COLUMN orders.product.tax_type IS '税区分';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.customer;
CREATE SEQUENCE orders.customer_number;
CREATE TABLE orders.customer
(
    customer_number INTEGER     NOT NULL,
    customer_code   VARCHAR(40) NOT NULL,
    customer_name   VARCHAR(40) NOT NULL,
    created_by      VARCHAR(40) NOT NULL,
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (customer_number)
);
COMMENT ON TABLE orders.customer IS '顧客';
COMMENT ON COLUMN orders.customer.customer_number IS '顧客番号';
COMMENT ON COLUMN orders.customer.customer_code IS '顧客コード';
COMMENT ON COLUMN orders.customer.customer_name IS '顧客名称';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.received_order;
CREATE SEQUENCE orders.order_number;
CREATE TABLE orders.received_order
(
    order_number               INTEGER        NOT NULL,
    order_date                 DATE           NOT NULL,
    customer_number            INTEGER        NOT NULL,
    order_delivery_date_desire TIMESTAMP,
    order_total_price_amount   DECIMAL(10, 0) NOT NULL,
    order_total_tax_amount     DECIMAL(10, 0) NOT NULL,
    created_by                 VARCHAR(40)    NOT NULL,
    created_at                 TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_number),
    FOREIGN KEY (customer_number) REFERENCES orders.customer (customer_number)
);
COMMENT ON TABLE orders.received_order IS '受注';
COMMENT ON COLUMN orders.received_order.order_number IS '受注番号';
COMMENT ON COLUMN orders.received_order.order_date IS '受注日';
COMMENT ON COLUMN orders.received_order.customer_number IS '顧客コード';
COMMENT ON COLUMN orders.received_order.order_delivery_date_desire IS '希望届け日';
COMMENT ON COLUMN orders.received_order.order_total_price_amount IS '受注金額合計';
COMMENT ON COLUMN orders.received_order.order_total_tax_amount IS '消費税合計';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.received_order_line;
CREATE TABLE orders.received_order_line
(
    order_number                  INTEGER       NOT NULL,
    order_line_number             INTEGER       NOT NULL,
    product_number                INTEGER       NOT NULL,
    product_name                  VARCHAR(40)   NOT NULL,
    sales_price                   DECIMAL(8, 0) NOT NULL,
    order_line_delivery_date      DATE,
    order_line_quantity           INTEGER       NOT NULL,
    order_line_tax                DECIMAL(3, 0) NOT NULL,
    order_line_discount           DECIMAL(4, 0) NOT NULL,
    reserve_quantity              INTEGER       NOT NULL,
    shipping_instructing_quantity INTEGER       NOT NULL,
    shipping_quantity             INTEGER       NOT NULL,
    complete                      INTEGER       NOT NULL,
    created_by                    VARCHAR(40)   NOT NULL,
    created_at                    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_number, order_line_number),
    FOREIGN KEY (order_number) REFERENCES orders.received_order (order_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number)
);
COMMENT ON TABLE orders.received_order_line IS '受注明細';
COMMENT ON COLUMN orders.received_order_line.order_number IS '受注番号';
COMMENT ON COLUMN orders.received_order_line.order_line_number IS '明細番号';
COMMENT ON COLUMN orders.received_order_line.product_number IS '商品番号';
COMMENT ON COLUMN orders.received_order_line.product_name IS '商品名称';
COMMENT ON COLUMN orders.received_order_line.sales_price IS '販売単価';
COMMENT ON COLUMN orders.received_order_line.order_line_delivery_date IS '届け日';
COMMENT ON COLUMN orders.received_order_line.order_line_quantity IS '数量';
COMMENT ON COLUMN orders.received_order_line.order_line_tax IS '消費税率';
COMMENT ON COLUMN orders.received_order_line.order_line_discount IS '値引金額';
COMMENT ON COLUMN orders.received_order_line.reserve_quantity IS '引当数量';
COMMENT ON COLUMN orders.received_order_line.shipping_instructing_quantity IS '出荷指示数量';
COMMENT ON COLUMN orders.received_order_line.shipping_quantity IS '出荷済数量';
COMMENT ON COLUMN orders.received_order_line.complete IS '完了フラグ';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.shipped_order;
CREATE SEQUENCE orders.shipping_number;
CREATE TABLE orders.shipped_order
(
    shipping_number INTEGER     NOT NULL,
    shipping_date   DATE        NOT NULL,
    customer_number INTEGER     NOT NULL,
    created_by      VARCHAR(40) NOT NULL,
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (shipping_number),
    FOREIGN KEY (customer_number) REFERENCES orders.customer (customer_number)
);
COMMENT ON TABLE orders.shipped_order IS '出荷';
COMMENT ON COLUMN orders.shipped_order.shipping_number IS '出荷番号';
COMMENT ON COLUMN orders.shipped_order.shipping_date IS '出荷日';
COMMENT ON COLUMN orders.shipped_order.customer_number IS '顧客番号';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.shipped_order_line;
CREATE TABLE orders.shipped_order_line
(
    shipping_number      INTEGER     NOT NULL,
    shipping_line_number INTEGER     NOT NULL,
    product_number       INTEGER     NOT NULL,
    product_name         VARCHAR(40) NOT NULL,
    order_number         INTEGER     NOT NULL,
    order_line_number    INTEGER     NOT NULL,
    quantity             INTEGER     NOT NULL,
    created_by           VARCHAR(40) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (shipping_number, shipping_line_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number),
    FOREIGN KEY (order_number, order_line_number) REFERENCES orders.received_order_line (order_number, order_line_number)
);
COMMENT ON TABLE orders.shipped_order_line IS '出荷明細';
COMMENT ON COLUMN orders.shipped_order_line.shipping_number IS '出荷番号';
COMMENT ON COLUMN orders.shipped_order_line.shipping_line_number IS '明細番号';
COMMENT ON COLUMN orders.shipped_order_line.product_number IS '商品番号';
COMMENT ON COLUMN orders.shipped_order_line.product_name IS '商品名';
COMMENT ON COLUMN orders.shipped_order_line.order_number IS '受注番号';
COMMENT ON COLUMN orders.shipped_order_line.order_line_number IS '受注明細番号';
COMMENT ON COLUMN orders.shipped_order_line.quantity IS '数量';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.sales;
CREATE TABLE orders.sales
(
    sales_number           INTEGER       NOT NULL,
    shipping_number        INTEGER       NOT NULL,
    sales_date             DATE          NOT NULL,
    total_sales_amount     DECIMAL(8, 0) NOT NULL,
    total_sales_tax_amount DECIMAL(3, 0) NOT NULL,
    created_by             VARCHAR(40)   NOT NULL,
    created_at             TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sales_number),
    FOREIGN KEY (shipping_number) REFERENCES orders.shipped_order (shipping_number)
);
COMMENT ON TABLE orders.sales IS '売上';
COMMENT ON COLUMN orders.sales.sales_number IS '売上番号';
COMMENT ON COLUMN orders.sales.shipping_number IS '出荷番号';
COMMENT ON COLUMN orders.sales.sales_date IS '売上日';
COMMENT ON COLUMN orders.sales.total_sales_amount IS '売上金額合計';
COMMENT ON COLUMN orders.sales.total_sales_tax_amount IS '消費税合計';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

DROP TABLE IF EXISTS orders.sales_line;
CREATE TABLE orders.sales_line
(
    sales_number      INTEGER       NOT NULL,
    sales_line_number INTEGER       NOT NULL,
    product_number    INTEGER       NOT NULL,
    product_name      VARCHAR(40)   NOT NULL,
    sales_price       DECIMAL(8, 0) NOT NULL,
    quantity          INTEGER       NOT NULL,
    discount          DECIMAL(8, 0) NOT NULL,
    created_by        VARCHAR(40)   NOT NULL,
    created_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sales_number, sales_line_number),
    FOREIGN KEY (sales_number) REFERENCES orders.sales (sales_number),
    FOREIGN KEY (product_number) REFERENCES orders.product (product_number)
);
COMMENT ON TABLE orders.sales_line IS '売上明細';
COMMENT ON COLUMN orders.sales_line.sales_number IS '売上番号';
COMMENT ON COLUMN orders.sales_line.sales_line_number IS '明細番号';
COMMENT ON COLUMN orders.sales_line.product_number IS '商品番号';
COMMENT ON COLUMN orders.sales_line.product_name IS '商品名';
COMMENT ON COLUMN orders.sales_line.sales_price IS '販売単価';
COMMENT ON COLUMN orders.sales_line.quantity IS '数量';
COMMENT ON COLUMN orders.sales_line.discount IS '値引金額';
COMMENT ON COLUMN orders.product.created_by IS '作成者';
COMMENT ON COLUMN orders.product.created_at IS '作成日時';

