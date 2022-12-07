package bouquet.domain.model;

import bouquet.domain.model.auth.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("認証ドメイン")
public class UserTest {
    @Nested
    class ユーザー {
        @Test
        void ユーザーを生成できる() {
            User user = new User("U999999", "a234567Z", "firstName", "lastName", RoleName.スタッフ);
            assertEquals(new UserId("U999999"), user.UserId());
            assertEquals("firstName", user.Name().FirstName());
            assertEquals("lastName", user.Name().LastName());
            assertEquals(new Password("a234567Z"), user.Password());
            assertEquals(RoleName.スタッフ, user.RoleName());
            assertEquals(RegistType.有効, user.RegistType());
        }

        @Test
        public void ユーザーIDが未入力の場合は生成できない() {
            assertThrows(UserException.class, () -> new User(null, "password", "テスト", "太郎", RoleName.スタッフ));
        }

        @Test
        public void 名前が未入力の場合は生成できない() {
            assertThrows(UserException.class, () -> new User("U999999", "password", null, "太郎", RoleName.スタッフ));
            assertThrows(UserException.class, () -> new User("U999999", "password", "テスト", null, RoleName.スタッフ));
        }

        @Test
        public void 役割が未入力の場合は生成できない() {
            assertThrows(UserException.class, () -> new User("U999999", "password", "テスト", "太郎", null));
        }

        @Test
        public void パスワードが未入力の場合は空の値を設定する() {
            User user = new User("U999999", null, "テスト", "太郎", RoleName.スタッフ);
            assertTrue(user.Password().Value().isEmpty());
        }

        @Test
        public void パスワードは少なくとも8文字以上であること() {
            assertThrows(PasswordException.class, () -> new User("U999999", "pass", "テスト", "太郎", RoleName.スタッフ));
        }

        @Test
        public void パスワードは小文字大文字数字を含むこと() {
            assertThrows(PasswordException.class, () -> new User("U999999", "12345678", "テスト", "太郎", RoleName.スタッフ));
            assertThrows(PasswordException.class, () -> new User("U999999", "a2345678", "テスト", "太郎", RoleName.スタッフ));
            assertThrows(PasswordException.class, () -> new User("U999999", "A2345678", "テスト", "太郎", RoleName.スタッフ));
        }

        @Test
        public void 利用者番号は先頭の一文字目がUで始まる6桁の数字である() {
            assertThrows(UserIdException.class, () -> new User("1", "password", "テスト", "太郎", RoleName.スタッフ));
            assertThrows(UserIdException.class, () -> new User("X123456", "password", "テスト", "太郎", RoleName.スタッフ));
            assertThrows(UserIdException.class, () -> new User("U12345", "password", "テスト", "太郎", RoleName.スタッフ));
            assertThrows(UserIdException.class, () -> new User("Uabcdef", "password", "テスト", "太郎", RoleName.スタッフ));
        }
    }
}
