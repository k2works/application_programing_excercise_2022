package mrs.domain.model.user;

import mrs.domain.model.reservation.reservation.Reservation;

import java.util.List;

/**
 * 会員
 */
public class User {
    private String userId;

    private String password;

    private String firstName;

    private String lastName;

    private RoleName roleName;

    private List<Reservation> reservations;

    public User(String userId, String firstName, String lastName, String password, RoleName roleName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roleName = roleName;
    }

    @Deprecated
    public User() {
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

    public RoleName getRoleName() {
        return roleName;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }
}

