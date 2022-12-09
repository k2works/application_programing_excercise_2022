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
}
