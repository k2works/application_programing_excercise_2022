package bouquet.domain.model.auth;

/**
 * ユーザーID
 */
public class UserId {
    private String value;

    @Deprecated
    public UserId() {
    }

    public UserId(String value) {
        this.value = value;
    }

    public String Value() {
        return value;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof UserId other)) {
            return false;
        }
        return value.equals(other.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
