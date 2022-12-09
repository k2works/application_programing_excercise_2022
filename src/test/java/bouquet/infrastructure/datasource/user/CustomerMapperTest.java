package bouquet.infrastructure.datasource.user;

import bouquet.TestDataFactoryImpl;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.user.Customer;
import bouquet.infrastructure.datasource.auth.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
        Customer customer = new Customer(
                user,
                customerNumber,
                "C000001",
                "mail@hoge.com",
                Date.valueOf(LocalDate.of(2020, 1, 1)),
                "M",
                "000-0000",
                "東京都",
                "千代田区",
                "千代田1-1-1",
                "00000000000",
                null
        );
        customerMapper.insert(customer);

        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assertEquals(customer.CustomerNumber(), actual.CustomerNumber());
        assertEquals(customer.CustomerCode(), actual.CustomerCode());
        assertEquals(customer.CreatedBy(), actual.CreatedBy());
        assertEquals(customer.CreatedAt(), actual.CreatedAt());
        assertEquals(customer.UserId(), actual.UserId());
        assertEquals(customer.Name().FirstName(), actual.Name().FirstName());
        assertEquals(customer.Name().LastName(), actual.Name().LastName());
        assertEquals(customer.Email(), actual.Email());
        assertEquals(customer.Birthday(), actual.Birthday());
        assertEquals(customer.Gender(), actual.Gender());
    }

    @Test
    void 得意先を更新できる() {
        Integer customerNumber = customerMapper.newCustomerNumber();
        Customer customer = new Customer(
                user,
                customerNumber,
                "C000001",
                "mail@hoge.com",
                Date.valueOf(LocalDate.of(2020, 1, 1)),
                "M",
                "000-0000",
                "東京都",
                "千代田区",
                "千代田1-1-1",
                "00000000000",
                null
        );
        customerMapper.insert(customer);

        Customer updateCustomer = new Customer(
                user,
                customerNumber,
                "C000002",
                "mail2@hoge.com",
                Date.valueOf(LocalDate.of(2020, 1, 1)),
                "F",
                "000-0001",
                "東京都2",
                "千代田区2",
                "千代田1-1-2",
                "00000000001",
                null
        );
        customerMapper.update(updateCustomer);

        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assertEquals(customer.CustomerNumber(), actual.CustomerNumber());
        assertEquals(updateCustomer.CustomerCode(), actual.CustomerCode());
        assertEquals(updateCustomer.CreatedBy(), actual.CreatedBy());
        assertEquals(updateCustomer.CreatedAt(), actual.CreatedAt());
        assertEquals(updateCustomer.UserId(), actual.UserId());
        assertEquals(updateCustomer.Name().FirstName(), actual.Name().FirstName());
        assertEquals(updateCustomer.Name().LastName(), actual.Name().LastName());
        assertEquals(updateCustomer.Email(), actual.Email());
        assertEquals(updateCustomer.Birthday(), actual.Birthday());
        assertEquals(updateCustomer.Gender(), actual.Gender());
    }

    @Test
    void 得意先を削除できる() {
        Integer customerNumber = customerMapper.newCustomerNumber();
        Customer customer = new Customer(
                user,
                customerNumber,
                "C000001",
                "mail@hoge.com",
                Date.valueOf(LocalDate.of(2020, 1, 1)),
                "M",
                "000-0000",
                "東京都",
                "千代田区",
                "千代田1-1-1",
                "00000000000",
                null
        );
        customerMapper.insert(customer);

        customerMapper.deleteByPrimaryKey(customerNumber);
        Customer actual = customerMapper.selectByPrimaryKey(customerNumber);
        assert actual == null;
    }
}
