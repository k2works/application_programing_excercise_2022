package bouquet.domain.model;

import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("認証・認可ドメイン")
public class UserTest {
    @Nested
    class ユーザー {
        @Test
        void ユーザーを生成できる() {
            User user = new User("userId", "password", "firstName", "lastName", RoleName.USER);
            assertEquals("userId", user.UserId());
            assertEquals("firstName", user.FirstName());
            assertEquals("lastName", user.LastName());
            assertEquals("password", user.Password());
            assertEquals(RoleName.USER, user.RoleName());
        }
    }
}
