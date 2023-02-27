package bouquet.domain.model.user;

import java.time.LocalDate;

/**
 * 退会日
 */
public class Withdraw {
    private LocalDate value;

    @Deprecated
    public Withdraw() {
    }

    public Withdraw(LocalDate value) {
        this.value = value;
    }

    public LocalDate Value() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Withdraw withdraw = (Withdraw) o;

        return value.equals(withdraw.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
