package bouquet.domain.model.user;

/**
 * 住所
 */
public class Address {
    private PostalNumber postalNumber;

    private Prefecture prefecture;

    private String address1;

    private String address2;

    @Deprecated
    public Address() {
    }

    public Address(String postalCode, String prefecture, String address1, String address2) {
        this.postalNumber = new PostalNumber(postalCode);
        this.prefecture = Prefecture.valueOf(prefecture);
        this.address1 = address1;
        this.address2 = address2;
    }

    public PostalNumber Zip() {
        return postalNumber;
    }

    public Prefecture Prefecture() {
        return prefecture;
    }

    public String Address1() {
        return address1;
    }

    public String Address2() {
        return address2;
    }

    @Override
    public String toString() {
        return String.format("%s %s %s %s", postalNumber, prefecture, address1, address2);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Address address = (Address) o;

        if (!postalNumber.equals(address.postalNumber)) return false;
        if (prefecture != address.prefecture) return false;
        if (!address1.equals(address.address1)) return false;
        return address2.equals(address.address2);
    }

    @Override
    public int hashCode() {
        int result = postalNumber.hashCode();
        result = 31 * result + prefecture.hashCode();
        result = 31 * result + address1.hashCode();
        result = 31 * result + address2.hashCode();
        return result;
    }
}
