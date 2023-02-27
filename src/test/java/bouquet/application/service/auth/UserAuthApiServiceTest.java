package bouquet.application.service.auth;

import bouquet.IntegrationTest;
import bouquet.TestDataFactory;
import bouquet.domain.model.auth.User;
import bouquet.infrastructure.security.jwt.payload.response.JwtResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@IntegrationTest
@DisplayName("認証APIサービス")
public class UserAuthApiServiceTest {
    @Autowired
    UserAuthApiService userAuthApiService;

    @Autowired
    TestDataFactory testDataFactory;

    @Nested
    class 認証 {
        @MockBean
        UserAuthApiService userAuthApiServiceMock;

        @BeforeEach
        void setUp() {
            testDataFactory.setUp();
        }

        @Test
        void ユーザーを認証する() {
            User user = testDataFactory.User();
            Mockito.when(userAuthApiServiceMock.authenticateUser(Mockito.any(), Mockito.any()))
                    .thenReturn(new JwtResponse("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVMDAwMDA3IiwiaWF0IjoxNjU2NzMxODc3LCJleHAiOjE2NTY4MTgyNzd9.2JGYfw4c2P4EzCFFuCN7kf5fMihSXEVfLZSRnC5OOOn4vpPy9QewaVXTheUzsv16X8Lk1bpvcAyQYSUuKj0vJA", "U999999", List.of("USER")));
            JwtResponse result = userAuthApiServiceMock.authenticateUser(user.UserId(), user.Password());

            assertEquals("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVMDAwMDA3IiwiaWF0IjoxNjU2NzMxODc3LCJleHAiOjE2NTY4MTgyNzd9.2JGYfw4c2P4EzCFFuCN7kf5fMihSXEVfLZSRnC5OOOn4vpPy9QewaVXTheUzsv16X8Lk1bpvcAyQYSUuKj0vJA", result.getAccessToken());
            assertEquals(user.UserId().Value(), result.getUserId());
            assertEquals(List.of("USER"), result.getRoles());
        }
    }

}
