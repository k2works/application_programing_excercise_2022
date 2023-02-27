package bouquet.presentation.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ログイン画面
 */
@Controller
public class LoginController {
    @RequestMapping("loginForm")
    String loginForm() {
        return "auth/loginForm";
    }
}
