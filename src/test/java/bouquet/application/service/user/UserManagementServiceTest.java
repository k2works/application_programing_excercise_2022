package bouquet.application.service.user;


import bouquet.IntegrationTest;
import bouquet.TestDataFactory;
import bouquet.domain.model.auth.RegistType;
import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@IntegrationTest
@DisplayName("ユーザーサービス")
public class UserManagementServiceTest {
    @Autowired
    UserManagementService userManagementService;

    @Autowired
    TestDataFactory testDataFactory;

    @Nested
    class ユーザー {
        @BeforeEach
        void setUp() {
            testDataFactory.setUp();
        }

        @Nested
        class ユーザーを登録する {
            @Test
            void 新規登録する() {
                User user = new User("1", "password", "山田", "太郎", RoleName.USER);
                userManagementService.regist(user);
                User result = userManagementService.findOne(user.UserId());
                assertEquals(user, result);
            }
        }

        @Nested
        class ユーザーを確認する {
            @Test
            @WithMockUser
            void 登録したユーザーを検索する() {
                List<User> result = userManagementService.findAll();
                assertEquals(1, result.size());
            }
        }

        @Nested
        @WithMockUser
        class ユーザー情報を更新する {
            @Test
            void 登録したユーザーを更新する() {
                User user = new User("2", "password", "山田", "太郎", RoleName.USER);
                userManagementService.regist(user);
                User registUser = userManagementService.findOne(user.UserId());
                User updateUser = new User(registUser.UserId().Value(), "password", "山田", "花子", RoleName.USER);
                userManagementService.update(updateUser);

                User result = userManagementService.findOne(user.UserId());
                assertEquals(updateUser, result);
            }
        }

        @Nested
        @WithMockUser
        class ユーザー情報を解除する {
            @Test
            void 登録したユーザーの登録区分を無効にする() {
                User user = new User("2", "password", "山田", "太郎", RoleName.USER);
                userManagementService.regist(user);
                User registUser = userManagementService.findOne(user.UserId());
                User updateUser = new User(registUser.UserId().Value(), registUser.Password().Value(), registUser.Name().FirstName(), registUser.Name().LastName(), registUser.RoleName(), RegistType.無効);
                userManagementService.update(updateUser);

                User result = userManagementService.findOne(user.UserId());
                assertEquals(RegistType.無効, result.RegistType());
            }

        }

        @Nested
        @WithMockUser
        class ユーザー情報を復活する {
            @Test
            void 無効にしたユーザーの登録区分を有効にする() {
                User user = new User("2", "password", "山田", "太郎", RoleName.USER);
                userManagementService.regist(user);
                User registUser = userManagementService.findOne(user.UserId());
                User unregistUser = new User(registUser.UserId().Value(), registUser.Password().Value(), registUser.Name().FirstName(), registUser.Name().LastName(), registUser.RoleName(), RegistType.無効);
                userManagementService.update(unregistUser);
                User reregistUser = userManagementService.findOne(unregistUser.UserId());
                User updateReregistUser = new User(reregistUser.UserId().Value(), reregistUser.Password().Value(), reregistUser.Name().FirstName(), reregistUser.Name().LastName(), reregistUser.RoleName(), RegistType.有効);
                userManagementService.update(updateReregistUser);

                User result = userManagementService.findOne(user.UserId());
                assertEquals(RegistType.有効, result.RegistType());
            }

        }

        @Nested
        class ユーザー情報を抹消する {

        }
    }
}
