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

    public Address(String zip, String prefecture, String address1, String address2) {
        this.postalNumber = new PostalNumber(zip);
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
}
