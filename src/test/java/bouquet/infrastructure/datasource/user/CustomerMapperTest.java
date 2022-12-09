package bouquet.infrastructure.datasource.user;

import bouquet.TestDataFactoryImpl;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.user.*;
import bouquet.infrastructure.datasource.auth.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@MybatisTest
@DisplayName("得意先エンティティ")
public class CustomerMapperTest {
    @Autowired
    UserMapper userMapper;
    @Autowired
    CustomerMapper customerMapper;

    private User user;

    private static User getUser() {
        return TestDataFactoryImpl.newUser();
    }

    @BeforeEach
    void setUp() {
        userMapper.deleteAll();
        user = getUser();
        userMapper.insert(user);
    }

    @Test
    void 得意先を登録できる() {
        Integer customerNumber = customerMapper.newCustomerNumber();
        CustomerCode customerCode = new CustomerCode("C000001");
        Email email = new Email("mail@hoge.com");
        Birthday birthday = new Birthday(LocalDate.of(2020, 1, 1));
        Address address = new Address("000-0000", "東京都", "千代田区", "千代田1-1-1");
        TelephoneNumber phoneNumber = new TelephoneNumber("00000000000");
        Withdraw withdraw = new Withdraw(null);
        Customer customer = new Customer(
                user,
                customerNumber,
                customerCode,
                email,
                birthday,
                Gender.M,
                address,
                phoneNumber,
                withdraw
        );

        customerMapper.insert(customer);

        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assertEquals(customer.CustomerNumber(), actual.CustomerNumber());
        assertEquals(customer.CustomerCode(), actual.CustomerCode());
        assertEquals(customer.CreatedBy(), actual.CreatedBy());
        assertEquals(customer.CreatedAt(), actual.CreatedAt());
        assertEquals(customer.UserId(), actual.UserId());
        assertEquals(customer.Name(), actual.Name());
        assertEquals(customer.Email(), actual.Email());
        assertEquals(customer.Birthday(), actual.Birthday());
        assertEquals(customer.Gender(), actual.Gender());
        assertEquals(customer.Address(), actual.Address());
        assertEquals(customer.TelephoneNumber(), actual.TelephoneNumber());
        assertNull(actual.Withdraw());
    }

    @Test
    void 得意先を更新できる() {
        Integer customerNumber = customerMapper.newCustomerNumber();
        CustomerCode customerCode = new CustomerCode("C000001");
        Email email = new Email("mail@hoge.com");
        Birthday birthday = new Birthday(LocalDate.of(2020, 1, 1));
        Address address = new Address("000-0000", "東京都", "千代田区", "千代田1-1-1");
        TelephoneNumber phoneNumber = new TelephoneNumber("00000000000");
        Withdraw withdraw = new Withdraw(null);
        Customer customer = new Customer(
                user,
                customerNumber,
                customerCode,
                email,
                birthday,
                Gender.M,
                address,
                phoneNumber,
                withdraw
        );

        customerMapper.insert(customer);

        CustomerCode updateCustomerCode = new CustomerCode("C000002");
        Email updateEmail = new Email("mail@hoge.com");
        Birthday updateBirthday = new Birthday(LocalDate.of(2021, 1, 1));
        Address updateAddress = new Address("000-0001", "京都府", "千代田区2", "千代田1-1-2");
        TelephoneNumber updatePhoneNumber = new TelephoneNumber("00000000001");
        Withdraw updateWithdraw = new Withdraw(LocalDate.of(2021, 1, 1));
        Customer updateCustomer = new Customer(
                user,
                customerNumber,
                updateCustomerCode,
                updateEmail,
                updateBirthday,
                Gender.F,
                updateAddress,
                updatePhoneNumber,
                updateWithdraw
        );

        customerMapper.update(updateCustomer);

        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assertEquals(customer.CustomerNumber(), actual.CustomerNumber());
        assertEquals(updateCustomer.CustomerNumber(), actual.CustomerNumber());
        assertEquals(updateCustomer.CustomerCode(), actual.CustomerCode());
        assertEquals(updateCustomer.CreatedBy(), actual.CreatedBy());
        assertEquals(updateCustomer.CreatedAt(), actual.CreatedAt());
        assertEquals(updateCustomer.UserId(), actual.UserId());
        assertEquals(updateCustomer.Name(), actual.Name());
        assertEquals(updateCustomer.Email(), actual.Email());
        assertEquals(updateCustomer.Birthday(), actual.Birthday());
        assertEquals(updateCustomer.Gender(), actual.Gender());
        assertEquals(updateCustomer.Address(), actual.Address());
        assertEquals(updateCustomer.TelephoneNumber(), actual.TelephoneNumber());
        assertEquals(updateCustomer.Withdraw(), actual.Withdraw());
    }

    @Test
    void 得意先を削除できる() {
        Integer customerNumber = customerMapper.newCustomerNumber();
        CustomerCode customerCode = new CustomerCode("C000001");
        Email email = new Email("mail@hoge.com");
        Birthday birthday = new Birthday(LocalDate.of(2020, 1, 1));
        Address address = new Address("000-0000", "東京都", "千代田区", "千代田1-1-1");
        TelephoneNumber phoneNumber = new TelephoneNumber("00000000000");
        Withdraw withdraw = new Withdraw(null);
        Customer customer = new Customer(
                user,
                customerNumber,
                customerCode,
                email,
                birthday,
                Gender.M,
                address,
                phoneNumber,
                withdraw
        );

        customerMapper.insert(customer);
        customerMapper.deleteByPrimaryKey(customerNumber);

        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assert actual == null;
    }
}
