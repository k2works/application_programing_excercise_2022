CREATE SCHEMA auth;
DROP TABLE IF EXISTS auth.usr;
CREATE TABLE auth.usr
(
    user_id    VARCHAR(255) NOT NULL comment 'ユーザーID',
    first_name VARCHAR(255) NOT NULL comment '姓',
    last_name  VARCHAR(255) NOT NULL comment '名',
    password   VARCHAR(255) NOT NULL comment 'パスワード',
    role_name  VARCHAR(255) NOT NULL comment '役割',
    PRIMARY KEY (user_id)
) comment ='ユーザー';

INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name)
SELECT user_id, first_name, last_name, password, role_name
FROM appdb.usr;

DROP TABLE IF EXISTS appdb.usr;
