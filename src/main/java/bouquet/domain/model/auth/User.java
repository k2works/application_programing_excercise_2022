package bouquet.domain.model.auth;

/**
 * ユーザー
 */
public class User {
    private UserId userId;

    private Name name;

    private Password password;

    private RoleName roleName;

    @Deprecated
    public User() {
    }

    public User(String userId, String password, String firstName, String lastName, RoleName user) {
        this.userId = new UserId(userId);
        this.password = new Password(password);
        this.name = new Name(firstName, lastName);
        this.roleName = user;
    }

    public RoleName RoleName() {
        return roleName;
    }

    public UserId UserId() {
        return userId;
    }

    public Password Password() {
        return password;
    }

    public Name Name() {
        return name;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        User user = (User) other;
        return userId.equals(user.userId);
    }

    @Override
    public int hashCode() {
        return userId.hashCode();
    }

    @Override
    public String toString() {
        return "User [userId=" + userId + ", password=" + password + ", name=" + name + ", roleName=" + roleName + "]";
    }
}
