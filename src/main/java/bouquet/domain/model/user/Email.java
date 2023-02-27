package bouquet.domain.model.user;

/**
 * メールアドレス
 */
public class Email {
    private String value;

    @Deprecated
    public Email() {
    }

    public Email(String value) {
        this.value = value;
    }

    public String Value() {
        return value;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (obj == this) {
            return true;
        }
        if (obj.getClass() != getClass()) {
            return false;
        }
        Email rhs = (Email) obj;
        return this.value.equals(rhs.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }

    @Override
    public String toString() {
        return value;
    }
}
