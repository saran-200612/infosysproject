package edu.infosys.inventoryApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.InventoryUser;
import edu.infosys.inventoryApplication.dao.InventoryUserRepository;

@Service
public class InventoryUserService implements UserDetailsService {

    @Autowired
    private InventoryUserRepository repository;

    public void saveUser(InventoryUser user) {
        repository.save(user);
    }

    public String getRole() {
        return getAuthenticatedUser().getRole();
    }

    public InventoryUser getUser() {
        return getAuthenticatedUser();
    }

    public String getEmail() {
        return getAuthenticatedUser().getEmail();
    }

    public String getUserId() {
        return getAuthenticatedUser().getUsername();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    private InventoryUser getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return repository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public List<String> getUsersByRole(String role) {
        return repository.getUsersByRole(role);
    }
}