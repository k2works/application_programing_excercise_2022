package bouquet;

import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import bouquet.infrastructure.datasource.auth.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestDataFactoryImpl implements TestDataFactory {
    @Autowired
    UserMapper userMapper;

    @Override
    public void setUp() {
        delete();
        create();
    }

    public void create() {
        createUser();
    }

    public void delete() {
        userMapper.deleteAll();
    }

    @Override
    public UserMapper getUserMapper() {
        return userMapper;
    }

    private User newUser() {
        return new User("U999999", "テスト", "太郎", "a234567Z", RoleName.USER);
    }

    void createUser() {
        User user = newUser();
        userMapper.insert(user);
    }

    @Override
    public User User() {
        return newUser();
    }
}
