package bouquet.domain.model.user;

/**
 * 顧客コード
 */
public class CustomerCode {
    private String value;

    @Deprecated
    public CustomerCode() {
    }

    public CustomerCode(String value) {
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
        CustomerCode rhs = (CustomerCode) obj;
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
