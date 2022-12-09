package bouquet.domain.model.user;

import bouquet.domain.model.auth.Name;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.auth.UserId;

import java.util.Date;

public class Customer {
    private Integer customerNumber;

    private CustomerCode customerCode;

    private String createdBy;

    private Date createdAt;

    private UserId userId;

    private Name name;

    private Email email;

    private Birthday birthday;

    private Gender gender;

    private Address address;

    private TelephoneNumber telephoneNumber;

    private Withdraw withdraw;

    @Deprecated
    public Customer() {
    }

    public Customer(User user, Integer customerNumber, String customerCode, String email, Date birthday, String gender, String zip, String prefecture, String address1, String address2, String telephoneNumber, Date withdraw) {
        this.customerNumber = customerNumber;
        this.customerCode = new CustomerCode(customerCode);
        this.userId = user.UserId();
        this.name = user.Name();
        this.email = new Email(email);
        this.birthday = new Birthday(birthday);
        this.gender = Gender.valueOf(gender);
        this.address = new Address(zip, prefecture, address1, address2);
        this.telephoneNumber = new TelephoneNumber(telephoneNumber);
        this.withdraw = new Withdraw(withdraw);
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

    public Name Name() {
        return name;
    }

    public Email Email() {
        return email;
    }

    public Birthday Birthday() {
        return birthday;
    }

    public Gender Gender() {
        return gender;
    }

    public Address Address() {
        return address;
    }

    public TelephoneNumber TelephoneNumber() {
        return telephoneNumber;
    }

    public Withdraw Withdraw() {
        return withdraw;
    }
}
