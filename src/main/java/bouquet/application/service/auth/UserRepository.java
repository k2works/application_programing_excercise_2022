package bouquet.application.service.auth;

import bouquet.domain.model.autogen.auth.Usr;

import java.util.Optional;

/**
 * ユーザーレポジトリ
 */
public interface UserRepository {
    Optional<Usr> findById(String userId);
}
