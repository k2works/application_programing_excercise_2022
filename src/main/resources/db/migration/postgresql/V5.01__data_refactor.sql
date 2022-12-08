DELETE
FROM auth.usr;
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000001', 'Aaa', 'Aaa', '$2y$10$aYjdzuGAep5SXGVBxxGrMOnh1b1mL62sJLx5Sj.r4dM4BTICiemCG', '一般', '有効',
        '得意先');
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000002', 'Bbb', 'Bbb', '$2y$10$aYjdzuGAep5SXGVBxxGrMOnh1b1mL62sJLx5Sj.r4dM4BTICiemCG', '一般', '有効',
        '得意先');
INSERT INTO auth.usr (user_id, first_name, last_name, password, role_name, regist_type, user_type)
VALUES ('U000003', 'Ccc', 'Ccc', '$2y$10$aYjdzuGAep5SXGVBxxGrMOnh1b1mL62sJLx5Sj.r4dM4BTICiemCG', '管理', '有効',
        'スタッフ');
