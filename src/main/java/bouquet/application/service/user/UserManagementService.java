package bouquet.application.service.user;

import bouquet.application.service.auth.UserRepository;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.auth.UserId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagementService {
    final UserRepository userRepository;

    public UserManagementService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void regist(User user) {
        userRepository.save(user);
    }

    public User findOne(UserId userId) {
        return userRepository.findById(userId.Value()).orElse(null);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void update(User user) {
        userRepository.save(user);
    }

    public void destroy(User registUser) {
        userRepository.destroy(registUser);
    }
}
