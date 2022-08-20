package bouquet.application.service.auth;

import bouquet.domain.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 利用者リポジトリ
 */
public interface UserRepository extends JpaRepository<User, String> {
}
