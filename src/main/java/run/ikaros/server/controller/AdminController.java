package run.ikaros.server.controller;

import java.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author guohao
 * @date 2022/10/23
 */
@Controller
public class AdminController {

    @GetMapping("/admin")
    public void adminPage(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect(req.getContextPath() + "/admin/index.html");
    }

}
