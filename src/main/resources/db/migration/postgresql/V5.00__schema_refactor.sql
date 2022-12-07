ALTER TABLE auth.usr
    ADD COLUMN IF NOT EXISTS regist_type VARCHAR(255) NOT NULL DEFAULT '有効';
COMMENT ON COLUMN auth.usr.regist_type IS '登録区分';
