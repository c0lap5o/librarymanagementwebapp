package io.bootcamp.vimtages.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    /**
     * Renders the home page view
     *
     * @return the view
     */
    @RequestMapping("/")
    public String home() {
        return "/index.html";
    }

    @RequestMapping("/js/test.js")
    public String homeJs() {
        return "/js/test.js";
    }
}
