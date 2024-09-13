package io.bootcamp.vimtages.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    /**
     * Renders the home page view and it's resources
     *
     * @return the view
     */
    @RequestMapping("/")
    public String home() {
        return "/index.html";
    }

    @RequestMapping("/js/index.js")
    public String homeJs() {
        return "/js/index.js";
    }

    @RequestMapping("/css/index.css")
    public String indexCss() {
        return "/css/index.css";
    }


}
