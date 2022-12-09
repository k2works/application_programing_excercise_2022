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

    public Customer(User user, Integer customerNumber, CustomerCode customerCode, Email email, Birthday birthday, Gender gender, Address address, TelephoneNumber phoneNumber, Withdraw withdraw) {
        this.userId = user.UserId();
        this.customerNumber = customerNumber;
        this.name = user.Name();
        this.customerCode = customerCode;
        this.email = email;
        this.birthday = birthday;
        this.gender = gender;
        this.address = address;
        this.telephoneNumber = phoneNumber;
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
