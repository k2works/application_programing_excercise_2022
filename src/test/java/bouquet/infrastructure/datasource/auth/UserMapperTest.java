package bouquet.infrastructure.datasource.auth;

import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@MybatisTest
@DisplayName("ユーザーエンティティ")
public class UserMapperTest {
    @Autowired
    UserMapper userMapper;

    private static User getUser() {
        return new User("userId", "password", "firstName", "lastName", RoleName.USER);
    }

    @BeforeEach
    void setUp() {
        userMapper.deleteAll();
    }

    @Test
    void ユーザーを登録できる() {
        User user = getUser();
        userMapper.insert(user);

        User actual = userMapper.selectByPrimaryKey("userId");
        assertEquals(user.UserId(), actual.UserId());
        assertEquals(user.FirstName(), actual.FirstName());
        assertEquals(user.LastName(), actual.LastName());
        assertEquals(user.Password(), actual.Password());
        assertEquals(user.RoleName(), actual.RoleName());
    }

    @Test
    void ユーザーを更新できる() {
        User user = getUser();
        userMapper.insert(user);

        User updateUser = new User(user.UserId(), "password2", "firstName2", "lastName2", RoleName.ADMIN);
        userMapper.update(updateUser);

        User actual = userMapper.selectByPrimaryKey("userId");
        assertEquals(user.UserId(), actual.UserId());
        assertNotEquals(user.FirstName(), actual.FirstName());
        assertNotEquals(user.LastName(), actual.LastName());
        assertNotEquals(user.Password(), actual.Password());
        assertNotEquals(user.RoleName(), actual.RoleName());
    }

    @Test
    void ユーザーを削除できる() {
        User user = getUser();
        userMapper.insert(user);

        userMapper.deleteByPrimaryKey("userId");
        User actual = userMapper.selectByPrimaryKey("userId");
        assert actual == null;

    }
}
