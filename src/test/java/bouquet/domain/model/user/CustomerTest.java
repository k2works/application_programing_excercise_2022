package bouquet.domain.model.user;

import bouquet.domain.model.auth.RoleName;
import bouquet.domain.model.auth.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("ユーザードメイン")
public class CustomerTest {
    @Nested
    class 得意先 {
        @Test
        void 得意先を生成できる() {
            User user = new User("U999999", "a234567Z", "テスト", "太郎", RoleName.一般);
            Customer customer = new Customer(
                    user,
                    "C000001",
                    "mail@hoge.com",
                    LocalDate.of(2020, 01, 01),
                    "M",
                    "000-0000",
                    "東京都",
                    "千代田区",
                    "千代田1-1-1",
                    "000-0000-0000",
                    null
            );

            assertNull(customer.CustomerNumber());
            assertEquals("C000001", customer.CustomerCode());
            assertEquals("U999999", customer.UserId());
            assertEquals("テスト", customer.FirstName());
            assertEquals("太郎", customer.LastName());
            assertEquals("mail@hoge.com", customer.Email());
            assertEquals(LocalDate.of(2020, 01, 01), customer.Birthday());
            assertEquals("M", customer.Gender());
            assertEquals("000-0000", customer.Zip());
            assertEquals("東京都", customer.Prefecture());
            assertEquals("千代田区", customer.Address1());
            assertEquals("千代田1-1-1", customer.Address2());
            assertEquals("000-0000-0000", customer.TelephoneNumber());
            assertNull(customer.Withdraw());
        }
    }
}
