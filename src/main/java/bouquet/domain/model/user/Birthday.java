package bouquet.domain.model.user;

import java.time.LocalDate;

/**
 * 生年月日
 */
public class Birthday {
    private LocalDate value;

    @Deprecated
    public Birthday() {
    }

    public Birthday(LocalDate value) {
        this.value = value;
    }

    public LocalDate Value() {
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
