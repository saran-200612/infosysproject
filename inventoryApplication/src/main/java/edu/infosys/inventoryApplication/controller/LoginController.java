package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.InventoryUser;
import edu.infosys.inventoryApplication.config.EncoderConfig;
import edu.infosys.inventoryApplication.service.InventoryUserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class LoginController {

    @Autowired
    private InventoryUserService service;

    @Autowired
    private EncoderConfig econfig;

    @Autowired
    private AuthenticationManager authenticationManager;

    // 🔹 Register new user
    @PostMapping("/login")
    public void registerNewUser(@RequestBody InventoryUser user) {
        PasswordEncoder bCrypt = econfig.passwordEncoder();
        String encodedPassword = bCrypt.encode(user.getPassword());
        user.setPassword(encodedPassword);
        service.saveUser(user);
    }

    // 🔹 Login validation
    @GetMapping("/login/{userId}/{password}")
    public String validateUser(@PathVariable String userId,
                               @PathVariable String password,
                               HttpServletRequest request) {
        try {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userId, password)
            );

            // Set authentication in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 🔥 STORE authentication in HTTP Session (FIXES 403)
            request.getSession(true)
                   .setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                           SecurityContextHolder.getContext());

            return service.getRole();

        } catch (Exception ex) {
            System.out.println("Login failed: " + ex.getMessage());
            return "false";
        }
    }

    // 🔹 Get logged user details
    @GetMapping("/login")
    public InventoryUser getUserDetails() {
        return service.getUser();
    }

    // 🔹 Get role
    @GetMapping("/role")
    public String getRole() {
        return service.getRole();
    }
    
    @GetMapping("/role/{role}")
    List<String> getUsersByRole(@PathVariable String role){
	return service.getUsersByRole(role);
}

    // 🔹 Get user ID
    @GetMapping("/user")
    public String getUserId() {
        return service.getUserId();
    }

    // 🔹 Logout
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request,
                                         HttpServletResponse response) {

        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful");
    }
}