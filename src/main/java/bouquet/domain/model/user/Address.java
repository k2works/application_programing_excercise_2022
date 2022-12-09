package bouquet.domain.model.user;

/**
 * 住所
 */
public class Address {
    private String zip;

    private String prefecture;

    private String address1;

    private String address2;

    @Deprecated
    public Address() {
    }

    public Address(String zip, String prefecture, String address1, String address2) {
        this.zip = zip;
        this.prefecture = prefecture;
        this.address1 = address1;
        this.address2 = address2;
    }

    public String Zip() {
        return zip;
    }

    public String Prefecture() {
        return prefecture;
    }

    public String Address1() {
        return address1;
    }

    public String Address2() {
        return address2;
    }
}
