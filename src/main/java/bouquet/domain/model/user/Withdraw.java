package bouquet.domain.model.user;

import java.util.Date;

/**
 * 退会日
 */
public class Withdraw {
    private Date value;

    @Deprecated
    public Withdraw() {
    }

    public Withdraw(Date value) {
        this.value = value;
    }

    public Date Value() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}
