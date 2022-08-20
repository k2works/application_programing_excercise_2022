DROP TABLE IF EXISTS usr CASCADE;

CREATE TABLE usr
(
    user_id    VARCHAR(255) NOT NULL comment 'ユーザーID',
    first_name VARCHAR(255) NOT NULL comment '姓',
    last_name  VARCHAR(255) NOT NULL comment '名',
    password   VARCHAR(255) NOT NULL comment 'パスワード',
    role_name  VARCHAR(255) NOT NULL comment '役割',
    PRIMARY KEY (user_id)
) comment ='ユーザー';
