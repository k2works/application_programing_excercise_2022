package bouquet.domain.model.user;

/**
 * 郵便番号
 */
public class PostalNumber {
    private String value;

    @Deprecated
    public PostalNumber() {
    }

    public PostalNumber(String value) {
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
        PostalNumber that = (PostalNumber) o;
        return value.equals(that.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
