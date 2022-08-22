package bouquet.infrastructure.datasource.auth;

import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

@MybatisTest
@DisplayName("ユーザーエンティティ")
public class UserMapperTest {
    @Autowired
    UserMapper userMapper;

    private static User getUser() {
        User user = new User();
        user.setUserId("userId");
        user.setFirstName("firstName");
        user.setLastName("lastName");
        user.setPassword("password");
        user.setRoleName(RoleName.USER);
        return user;
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

        user.setFirstName("firstName2");
        user.setLastName("lastName2");
        user.setPassword("password2");
        user.setRoleName(RoleName.ADMIN);
        userMapper.update(user);

        User actual = userMapper.selectByPrimaryKey("userId");
        assertEquals(user.getUserId(), actual.getUserId());
        assertEquals(user.getFirstName(), actual.getFirstName());
        assertEquals(user.getLastName(), actual.getLastName());
        assertEquals(user.getPassword(), actual.getPassword());
        assertEquals(user.getRoleName(), actual.getRoleName());
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
