package bouquet.domain.model.auth;

/**
 * ユーザー
 */
public class User {
    private String userId;

    private String password;

    private String firstName;

    private String lastName;

    private RoleName roleName;

    @Deprecated
    public User() {
    }

    public User(String userId, String password, String firstName, String lastName, RoleName user) {
        this.userId = userId;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleName = user;
    }

    public RoleName getRoleName() {
        return roleName;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
