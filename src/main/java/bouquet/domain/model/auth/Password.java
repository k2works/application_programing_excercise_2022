package bouquet.domain.model.auth;

import java.util.Objects;

/**
 * パスワード
 */
public class Password {
    private String value;

    @Deprecated
    public Password() {
    }

    public Password(String password) {
        this.value = password;
    }

    public String Value() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Password password = (Password) o;

        return Objects.equals(value, password.value);
    }

    @Override
    public int hashCode() {
        return this.value.hashCode();
    }
}
