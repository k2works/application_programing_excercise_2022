package bouquet.domain.model.user;

import java.util.Date;

/**
 * 生年月日
 */
public class Birthday {
    private Date value;

    @Deprecated
    public Birthday() {
    }

    public Birthday(Date value) {
        this.value = value;
    }

    public Date Value() {
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
        Birthday rhs = (Birthday) obj;
        return this.value.equals(rhs.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}
