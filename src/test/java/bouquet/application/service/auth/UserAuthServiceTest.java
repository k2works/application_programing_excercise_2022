package bouquet.application.service.auth;

import bouquet.IntegrationTest;
import bouquet.TestDataFactory;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.auth.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;

@IntegrationTest
@DisplayName("認証サービス")
public class UserAuthServiceTest {
    @Autowired
    UserAuthService userAuthService;

    @Autowired
    TestDataFactory testDataFactory;

    @Nested
    class 認証 {
        @MockBean
        UserAuthService userAuthServiceMock;

        @BeforeEach
        void setUp() {
            testDataFactory.setUp();
        }

        @Test
        void ユーザーを認証する() {
            User user = testDataFactory.User();
            Mockito.when(userAuthServiceMock.loadUserByUsername(Mockito.anyString()))
                    .thenReturn(new UserDetailsImpl(user));

            UserDetails result = userAuthServiceMock.loadUserByUsername(user.Name().toString());
            assertEquals(user.UserId().Value(), result.getUsername());
        }
    }
}
