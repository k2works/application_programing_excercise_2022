package bouquet.infrastructure.datasource.auth;

import bouquet.TestDataFactoryImpl;
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
        return TestDataFactoryImpl.newUser();
    }

    @BeforeEach
    void setUp() {
        userMapper.deleteAll();
    }

    @Test
    void ユーザーを登録できる() {
        User user = getUser();
        userMapper.insert(user);

        User actual = userMapper.selectByPrimaryKey(user.UserId().Value());
        assertEquals(user.UserId(), actual.UserId());
        assertEquals(user.Name().FirstName(), actual.Name().FirstName());
        assertEquals(user.Name().LastName(), actual.Name().LastName());
        assertEquals(user.Password(), actual.Password());
        assertEquals(user.RoleName(), actual.RoleName());
    }

    @Test
    void ユーザーを更新できる() {
        User user = getUser();
        userMapper.insert(user);

        User updateUser = new User(user.UserId().Value(), "a234567Z2", "firstName2", "lastName2", RoleName.得意先);
        userMapper.update(updateUser);

        User actual = userMapper.selectByPrimaryKey(user.UserId().Value());
        assertEquals(user.UserId(), actual.UserId());
        assertNotEquals(user.Name().FirstName(), actual.Name().FirstName());
        assertNotEquals(user.Name().LastName(), actual.Name().LastName());
        assertNotEquals(user.Password(), actual.Password());
        assertNotEquals(user.RoleName(), actual.RoleName());
    }

    @Test
    void ユーザーを削除できる() {
        User user = getUser();
        userMapper.insert(user);

        userMapper.deleteByPrimaryKey(user.UserId().Value());
        User actual = userMapper.selectByPrimaryKey(user.UserId().Value());
        assert actual == null;

    }
}
