package bouquet.domain.model.auth;

/**
 * パスワード例外
 */
public class PasswordException extends RuntimeException {
    public PasswordException(String message) {
        super(message);
    }
}
