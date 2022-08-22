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
        assertEquals(user.getUserId(), actual.getUserId());
        assertEquals(user.getFirstName(), actual.getFirstName());
        assertEquals(user.getLastName(), actual.getLastName());
        assertEquals(user.getPassword(), actual.getPassword());
        assertEquals(user.getRoleName(), actual.getRoleName());
    }

    @Test
    void ユーザーを更新できる() {
        User user = getUser();
        userMapper.insert(user);

        User updateUser = new User(user.getUserId(), "password2", "firstName2", "lastName2", RoleName.ADMIN);
        userMapper.update(updateUser);

        User actual = userMapper.selectByPrimaryKey("userId");
        assertEquals(user.getUserId(), actual.getUserId());
        assertNotEquals(user.getFirstName(), actual.getFirstName());
        assertNotEquals(user.getLastName(), actual.getLastName());
        assertNotEquals(user.getPassword(), actual.getPassword());
        assertNotEquals(user.getRoleName(), actual.getRoleName());
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
