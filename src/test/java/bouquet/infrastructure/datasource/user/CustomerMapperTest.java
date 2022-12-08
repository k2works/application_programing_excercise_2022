package bouquet.infrastructure.datasource.user;

import bouquet.TestDataFactoryImpl;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.autogen.orders.Customer;
import bouquet.infrastructure.datasource.auth.UserMapper;
import bouquet.infrastructure.datasource.autogen.orders.CustomerMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@MybatisTest
@DisplayName("得意先エンティティ")
public class CustomerMapperTest {
    @Autowired
    UserMapper userMapper;
    @Autowired
    CustomerMapper customerMapper;

    private static User getUser() {
        return TestDataFactoryImpl.newUser();
    }

    @BeforeEach
    void setUp() {
        userMapper.deleteAll();
    }

    @Test
    void 得意先を登録できる() {
        User user = getUser();
        userMapper.insert(user);
        Customer customer = new Customer();
        customer.setCustomerNumber(1);
        customer.setCustomerCode("customerCode");
        customer.setCreatedBy(user.UserId().Value());
        customer.setCreatedAt(Date.valueOf("2020-01-01"));
        customer.setUserId(user.UserId().Value());
        customer.setFirstName("firstName");
        customer.setLastName("lastName");
        customer.setEmail("email");
        customer.setBirthday(Date.valueOf("2020-01-01"));
        customerMapper.insert(customer);

        Customer actual = customerMapper.selectByPrimaryKey(1);
        assertEquals(customer.getCustomerNumber(), actual.getCustomerNumber());
        assertEquals(customer.getCustomerCode(), actual.getCustomerCode());
        assertEquals(customer.getCreatedBy(), actual.getCreatedBy());
        assertEquals(customer.getCreatedAt(), actual.getCreatedAt());
        assertEquals(customer.getUserId(), actual.getUserId());
        assertEquals(customer.getFirstName(), actual.getFirstName());
        assertEquals(customer.getLastName(), actual.getLastName());
        assertEquals(customer.getEmail(), actual.getEmail());
        assertEquals(customer.getBirthday(), actual.getBirthday());
    }

    @Test
    void 得意先を更新できる() {
        User user = getUser();
        userMapper.insert(user);
        Customer customer = new Customer();
        customer.setCustomerNumber(1);
        customer.setCustomerCode("customerCode");
        customer.setCreatedBy(user.UserId().Value());
        customer.setCreatedAt(Date.valueOf("2020-01-01"));
        customer.setUserId(user.UserId().Value());
        customer.setFirstName("firstName");
        customer.setLastName("lastName");
        customer.setEmail("email");
        customer.setBirthday(Date.valueOf("2020-01-01"));
        customerMapper.insert(customer);

        Customer updateCustomer = new Customer();
        updateCustomer.setCustomerNumber(1);
        updateCustomer.setCustomerCode("customerCode2");
        updateCustomer.setCreatedBy(user.UserId().Value());
        updateCustomer.setCreatedAt(Date.valueOf("2020-01-02"));
        updateCustomer.setUserId(user.UserId().Value());
        updateCustomer.setFirstName("firstName2");
        updateCustomer.setLastName("lastName2");
        updateCustomer.setEmail("email2");
        updateCustomer.setBirthday(Date.valueOf("2020-01-02"));
        customerMapper.updateByPrimaryKey(updateCustomer);

        Customer actual = customerMapper.selectByPrimaryKey(1);
        assertEquals(customer.getCustomerNumber(), actual.getCustomerNumber());
        assertEquals(updateCustomer.getCustomerCode(), actual.getCustomerCode());
        assertEquals(updateCustomer.getCreatedBy(), actual.getCreatedBy());
        assertEquals(updateCustomer.getCreatedAt(), actual.getCreatedAt());
        assertEquals(updateCustomer.getUserId(), actual.getUserId());
        assertEquals(updateCustomer.getFirstName(), actual.getFirstName());
        assertEquals(updateCustomer.getLastName(), actual.getLastName());
        assertEquals(updateCustomer.getEmail(), actual.getEmail());
        assertEquals(updateCustomer.getBirthday(), actual.getBirthday());
    }

    @Test
    void 得意先を削除できる() {
        User user = getUser();
        userMapper.insert(user);
        Customer customer = new Customer();
        customer.setCustomerNumber(1);
        customer.setCustomerCode("customerCode");
        customer.setCreatedBy(user.UserId().Value());
        customer.setCreatedAt(Date.valueOf("2020-01-01"));
        customer.setUserId(user.UserId().Value());
        customer.setFirstName("firstName");
        customer.setLastName("lastName");
        customer.setEmail("email");
        customer.setBirthday(Date.valueOf("2020-01-01"));
        customerMapper.insert(customer);

        customerMapper.deleteByPrimaryKey(1);
        Customer actual = customerMapper.selectByPrimaryKey(1);
        assert actual == null;
    }
}
