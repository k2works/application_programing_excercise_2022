package bouquet.domain.model.user;

import bouquet.domain.model.auth.User;
import bouquet.domain.model.auth.UserId;

import java.util.Date;

public class Customer {
    private Integer customerNumber;

    private CustomerCode customerCode;

    private String createdBy;

    private Date createdAt;

    private UserId userId;

    private String firstName;

    private String lastName;

    private String email;

    private Date birthday;

    private String gender;

    private String zip;

    private String prefecture;

    private String address1;

    private String address2;

    private String telephoneNumber;

    private Date withdraw;

    @Deprecated
    public Customer() {
    }

    public Customer(User user, Integer customerNumber, String customerCode, String email, Date birthday, String gender, String zip, String prefecture, String address1, String address2, String telephoneNumber, Date withdraw) {
        this.customerNumber = customerNumber;
        this.customerCode = new CustomerCode(customerCode);
        this.userId = user.UserId();
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
        this.createdBy = user.UserId().Value();
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Integer CustomerNumber() {
        return customerNumber;
    }

    public CustomerCode CustomerCode() {
        return customerCode;
    }

    public String CreatedBy() {
        return createdBy;
    }

    public Date CreatedAt() {
        return createdAt;
    }

    public UserId UserId() {
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

    public Date Birthday() {
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

    public Date Withdraw() {
        return withdraw;
    }
}
