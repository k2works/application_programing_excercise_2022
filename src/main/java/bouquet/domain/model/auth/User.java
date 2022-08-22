package bouquet.domain.model.auth;

/**
 * ユーザー
 */
public class User {
    private String userId;

    private Name name;

    private Password password;

    private RoleName roleName;

    @Deprecated
    public User() {
    }

    public User(String userId, String password, String firstName, String lastName, RoleName user) {
        this.userId = userId;
        this.password = new Password(password);
        this.name = new Name(firstName, lastName);
        this.roleName = user;
    }

    public RoleName RoleName() {
        return roleName;
    }

    public String UserId() {
        return userId;
    }

    public Password Password() {
        return password;
    }

    public Name Name() {
        return name;
    }
}
