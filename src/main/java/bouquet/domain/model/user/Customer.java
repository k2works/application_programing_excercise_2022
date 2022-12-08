package bouquet.domain.model.user;

import bouquet.domain.model.auth.User;

import java.util.Date;

public class Customer {
    private Integer customerNumber;

    private String customerCode;

    private String createdBy;

    private Date createdAt;

    private String userId;

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
        this.createdBy = user.UserId().Value();
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Integer CustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(Integer customerNumber) {
        this.customerNumber = customerNumber;
    }

    public String CustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String CreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date CreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String UserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String FirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String LastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String Email() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date Birthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String Gender() {
        return gender;
    }

    public void Gender(String gender) {
        this.gender = gender;
    }

    public String Zip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String Prefecture() {
        return prefecture;
    }

    public void setPrefecture(String prefecture) {
        this.prefecture = prefecture;
    }

    public String Address1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String Address2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String TelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public Date Withdraw() {
        return withdraw;
    }

    public void setWithdraw(Date withdraw) {
        this.withdraw = withdraw;
    }
}
