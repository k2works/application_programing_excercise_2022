package bouquet.domain.model.auth;

/**
 * ユーザーID
 */
public class UserId {
    private String value;

    @Deprecated
    public UserId() {
    }

    public UserId(String value) {
        if (value.charAt(0) != 'U') throw new UserIdException("ユーザーIDの先頭はUから始まります");
        if (value.length() != 7) throw new UserIdException("ユーザーIDの長さは7文字です");
        StringBuilder sb = new StringBuilder(value);
        String result = sb.substring(1, 7);
        if (!result.matches("\\d+")) throw new UserIdException("ユーザーIDは数字です");

        this.value = value;
    }

    public String Value() {
        return value;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof UserId other)) {
            return false;
        }
        return value.equals(other.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
