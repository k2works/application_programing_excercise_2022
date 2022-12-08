package bouquet.domain.model.user;

import bouquet.domain.model.auth.User;

import java.time.LocalDate;

/**
 * 顧客ドメイン
 */
public class Customer {
    private Integer customerNumber;
    private String customerCode;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthday;
    private String gender;
    private String zip;
    private String prefecture;
    private String address1;
    private String address2;
    private String telephoneNumber;
    private LocalDate withdraw;

    @Deprecated
    public Customer(User user, String customerCode, String email, LocalDate birthday, String gender, String zip, String prefecture, String address1, String address2, String telephoneNumber, LocalDate withdraw) {
        this.customerCode = customerCode;
        this.userId = user.UserId().Value();
        this.firstName = user.Name().FirstName();
        this.lastName = user.Name().LastName();
        this.email = email;
        this.birthday = birthday;
        this.gender = gender;
        this.zip = zip;
        this.prefecture = prefecture;
        this.address1 = address1;
        this.address2 = address2;
        this.telephoneNumber = telephoneNumber;
        this.withdraw = withdraw;
    }

    public Integer CustomerNumber() {
        return customerNumber;
    }

    public String CustomerCode() {
        return customerCode;
    }

    public String UserId() {
        return userId;
    }

    public String FirstName() {
        return firstName;
    }

    public String LastName() {
        return lastName;
    }

    public String Email() {
        return email;
    }

    public LocalDate Birthday() {
        return birthday;
    }

    public String Gender() {
        return gender;
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

    public String TelephoneNumber() {
        return telephoneNumber;
    }

    public LocalDate Withdraw() {
        return withdraw;
    }
}
