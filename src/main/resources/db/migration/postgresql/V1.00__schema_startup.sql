DROP TABLE IF EXISTS usr CASCADE;

CREATE TABLE public.usr
(
    user_id    VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
comment
on table public.usr is 'ユーザー';
comment
on column public.usr.user_id is 'ユーザーID';
comment
on column public.usr.first_name is '姓';
comment
on column public.usr.last_name is '名';
comment
on column public.usr.password is 'パスワード';
comment
on column public.usr.role_name is '役割';

