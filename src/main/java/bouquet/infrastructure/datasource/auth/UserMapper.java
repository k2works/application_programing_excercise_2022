package bouquet.infrastructure.datasource.auth;

import bouquet.domain.model.auth.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User selectByPrimaryKey(String userId);

    List<User> selectAll();

    void insert(User user);

    void update(User user);

    void deleteByPrimaryKey(String userId);

    void deleteAll();
}
