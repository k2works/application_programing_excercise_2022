package bouquet.infrastructure.datasource.auth;

import bouquet.application.service.auth.UserRepository;
import bouquet.domain.model.autogen.auth.Usr;
import bouquet.infrastructure.datasource.autogen.auth.UsrMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDataSource implements UserRepository {
    final UsrMapper userMapper;

    public UserDataSource(UsrMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public Optional<Usr> findById(String userId) {
        return Optional.ofNullable(userMapper.selectByPrimaryKey(userId));
    }
}
