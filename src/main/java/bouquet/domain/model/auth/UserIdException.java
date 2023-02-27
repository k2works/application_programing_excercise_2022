package bouquet.domain.model.auth;

/**
 * ユーザーID例外
 */
public class UserIdException extends RuntimeException {
    public UserIdException(String message) {
        super(message);
    }
}
