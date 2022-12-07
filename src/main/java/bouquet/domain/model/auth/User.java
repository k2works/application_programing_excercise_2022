package bouquet.domain.model.auth;

/**
 * ユーザー
 */
public class User {
    private UserId userId;

    private Name name;

    private Password password;

    private RoleName roleName;

    private RegistType registType;

    @Deprecated
    public User() {
    }

    public User(String userId, String password, String firstName, String lastName, RoleName user) {
        if (userId == null || userId.isEmpty()) throw new UserException("ユーザーIDが未入力です。");
        if (firstName == null || firstName.isEmpty()) throw new UserException("名前が未入力です。");
        if (lastName == null || lastName.isEmpty()) throw new UserException("名前が未入力です。");
        if (user == null) throw new UserException("役割が未入力です。");

        this.userId = new UserId(userId);
        this.password = new Password(password);
        this.name = new Name(firstName, lastName);
        this.roleName = user;
        this.registType = RegistType.有効;
    }

    public User(String userId, String password, String firstName, String lastName, RoleName user, RegistType registType) {
        this.userId = new UserId(userId);
        this.password = new Password(password);
        this.name = new Name(firstName, lastName);
        this.roleName = user;
        if (registType == null) {
            this.registType = RegistType.有効;
        } else {
            this.registType = registType;
        }
    }

    public RoleName RoleName() {
        return roleName;
    }

    public RegistType RegistType() {
        return registType;
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
