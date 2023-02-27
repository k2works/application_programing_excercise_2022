package bouquet.application.service.auth;

import bouquet.domain.model.auth.User;

import java.util.List;
import java.util.Optional;

/**
 * ユーザーレポジトリ
 */
public interface UserRepository {
    Optional<User> findById(String userId);

    void save(User newUser);

    List<User> findAll();

    void destroy(User registUser);
}
