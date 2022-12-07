package bouquet.domain.model.auth;

/**
 * ユーザー例外
 */
public class UserException extends RuntimeException {
    public UserException(String message) {
        super(message);
    }
}
