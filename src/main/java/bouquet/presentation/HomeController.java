package bouquet.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ホーム画面
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping
    public String index() {
        return "index";
    }
}
