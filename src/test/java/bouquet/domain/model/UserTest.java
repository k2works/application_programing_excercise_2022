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
            User user = new User();
            user.setUserId("userId");
            user.setFirstName("firstName");
            user.setLastName("lastName");
            user.setPassword("password");
            user.setRoleName(RoleName.USER);
            assertEquals("userId", user.getUserId());
            assertEquals("firstName", user.getFirstName());
            assertEquals("lastName", user.getLastName());
            assertEquals("password", user.getPassword());
            assertEquals(RoleName.USER, user.getRoleName());
        }
    }
}
