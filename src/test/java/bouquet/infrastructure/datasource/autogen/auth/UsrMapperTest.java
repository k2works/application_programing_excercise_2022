package bouquet.infrastructure.datasource.autogen.auth;

import bouquet.domain.model.autogen.auth.Usr;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

@MybatisTest
public class UsrMapperTest {
    @Qualifier("usrMapper")
    @Autowired
    private UsrMapper usrMapper;

    @Test
    void ユーザーを登録する() {
        Usr usr = new Usr();
        usr.setUserId("zzzz");
        usr.setFirstName("テスト");
        usr.setLastName("テスト");
        usr.setPassword("テスト");
        usr.setRoleName("テスト");
        usrMapper.insert(usr);

        Usr actual = usrMapper.selectByPrimaryKey("zzzz");
        assert actual.getUserId().equals("zzzz");
    }
}
