package bouquet;

import bouquet.domain.model.auth.User;
import bouquet.infrastructure.datasource.auth.UserMapper;

public interface TestDataFactory {
    void setUp();

    UserMapper getUserMapper();

    User User();
}
