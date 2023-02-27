CREATE SCHEMA auth;
DROP TABLE IF EXISTS auth.usr;
CREATE TABLE auth.usr
(
    user_id    VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
COMMENT ON TABLE auth.usr IS 'ユーザー';
COMMENT ON COLUMN auth.usr.user_id IS 'ユーザーID';
COMMENT ON COLUMN auth.usr.first_name IS '姓';
COMMENT ON COLUMN auth.usr.last_name IS '名';
COMMENT ON COLUMN auth.usr.password IS 'パスワード';
COMMENT ON COLUMN auth.usr.role_name IS 'ロール名';

INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name)
SELECT user_id, first_name, last_name, password, role_name
FROM public.usr;

DROP TABLE IF EXISTS public.usr;
