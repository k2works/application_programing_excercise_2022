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

INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name)
SELECT user_id, first_name, last_name, password, role_name
FROM public.usr;

DROP TABLE IF EXISTS public.usr;
