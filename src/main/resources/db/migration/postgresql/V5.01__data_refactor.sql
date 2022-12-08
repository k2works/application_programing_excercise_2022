DELETE
FROM auth.usr;
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000001', 'Aaa', 'Aaa', '$2a$12$H/GaZH/VsfYVmQCikTj9ee8nQYJCVf0XvCk6FAf4qariGbpLnKmAy', '一般', '有効',
        '得意先');
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000002', 'Bbb', 'Bbb', '$2a$12$H/GaZH/VsfYVmQCikTj9ee8nQYJCVf0XvCk6FAf4qariGbpLnKmAy', '一般', '有効',
        '得意先');
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000003', 'Ccc', 'Ccc', '$2a$12$H/GaZH/VsfYVmQCikTj9ee8nQYJCVf0XvCk6FAf4qariGbpLnKmAy', '管理', '有効',
        'スタッフ');
