package bouquet.domain.model;

import bouquet.domain.model.auth.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("認証ドメイン")
public class UserTest {
    @Nested
    class ユーザー {
        @Test
        void ユーザーを生成できる() {
            User user = new User("userId", "password", "firstName", "lastName", RoleName.スタッフ);
            assertEquals(new UserId("userId"), user.UserId());
            assertEquals("firstName", user.Name().FirstName());
            assertEquals("lastName", user.Name().LastName());
            assertEquals(new Password("password"), user.Password());
            assertEquals(RoleName.スタッフ, user.RoleName());
            assertEquals(RegistType.有効, user.RegistType());
        }
    }
}
