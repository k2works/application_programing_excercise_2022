package bouquet.infrastructure.datasource.auth;

import bouquet.application.service.auth.UserRepository;
import bouquet.domain.model.auth.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDataSource implements UserRepository {
    final UserMapper userMapper;

    public UserDataSource(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public Optional<User> findById(String userId) {
        return Optional.ofNullable(userMapper.selectByPrimaryKey(userId));
    }
}
