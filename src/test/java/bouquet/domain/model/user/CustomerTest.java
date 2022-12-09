package bouquet.domain.model.user;

import bouquet.TestDataFactoryImpl;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.sql.Date;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("ユーザードメイン")
public class CustomerTest {

    private static User getUser() {
        return TestDataFactoryImpl.newUser();
    }

    @Nested
    class 得意先 {
        @Test
        void 得意先を生成できる() {
            User user = getUser();
            Customer customer = new Customer(
                    user,
                    1,
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

            assertEquals(1, customer.CustomerNumber());
            assertEquals(new CustomerCode("C000001"), customer.CustomerCode());
            assertEquals(user.UserId(), customer.UserId());
            assertEquals("テスト", customer.Name().FirstName());
            assertEquals("太郎", customer.Name().LastName());
            assertEquals(new Email("mail@hoge.com"), customer.Email());
            assertEquals(new Birthday(Date.valueOf(LocalDate.of(2020, 1, 1))), customer.Birthday());
            assertEquals(Gender.M, customer.Gender());
            assertEquals(new PostalNumber("000-0000"), customer.Address().Zip());
            assertEquals(Prefecture.東京都, customer.Address().Prefecture());
            assertEquals("千代田区", customer.Address().Address1());
            assertEquals("千代田1-1-1", customer.Address().Address2());
            assertEquals(new TelephoneNumber("00000000000"), customer.TelephoneNumber());
            assertNull(customer.Withdraw().Value());
        }
    }
}
