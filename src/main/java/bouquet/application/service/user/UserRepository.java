package bouquet.application.service.user;

import bouquet.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 利用者リポジトリ
 */
public interface UserRepository extends JpaRepository<User, String> {
}
