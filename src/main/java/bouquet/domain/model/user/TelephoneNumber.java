package bouquet.domain.model.user;

import java.util.Objects;

/**
 * 電話番号
 */
public class TelephoneNumber {
    private String value;

    @Deprecated
    public TelephoneNumber() {
    }

    public TelephoneNumber(String value) {
        this.value = value;
    }

    public String Value() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TelephoneNumber that = (TelephoneNumber) o;

        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return value != null ? value.hashCode() : 0;
    }
}
