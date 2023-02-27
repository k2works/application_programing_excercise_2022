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

    private UserType userType;

    @Deprecated
    public User() {
    }

    public User(String userId, String password, String firstName, String lastName, RoleName roleName) {
        if (userId == null || userId.isEmpty()) throw new UserException("ユーザーIDが未入力です。");
        if (firstName == null || firstName.isEmpty()) throw new UserException("名前が未入力です。");
        if (lastName == null || lastName.isEmpty()) throw new UserException("名前が未入力です。");
        if (roleName == null) throw new UserException("役割が未入力です。");

        this.userId = new UserId(userId);
        this.password = new Password(password);
        this.name = new Name(firstName, lastName);
        this.roleName = roleName;
        this.registType = RegistType.有効;
        this.userType = UserType.スタッフ;
    }

    public User(User user, RegistType registType) {
        this.userId = user.UserId();
        this.password = user.Password();
        this.name = user.Name();
        this.roleName = user.RoleName();
        if (registType == null) {
            this.registType = RegistType.有効;
        } else {
            this.registType = registType;
        }
        this.userType = user.UserType();
    }

    public User(User user, UserType userType) {
        this.userId = user.UserId();
        this.password = user.Password();
        this.name = user.Name();
        this.roleName = user.RoleName();
        this.registType = user.RegistType();
        if (userType == null) {
            this.userType = UserType.スタッフ;
        } else {
            this.userType = userType;
        }
    }

    public RoleName RoleName() {
        return roleName;
    }

    public RegistType RegistType() {
        return registType;
    }

    public UserType UserType() {
        return userType;
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
        return userId.equals(user.userId) &&
                name.equals(user.name) &&
                password.equals(user.password) &&
                roleName == user.roleName &&
                registType == user.registType &&
                userType == user.userType;
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
