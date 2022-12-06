package bouquet.application.service.user;

import bouquet.application.service.auth.UserRepository;
import bouquet.domain.model.auth.User;
import bouquet.domain.model.auth.UserId;
import org.springframework.stereotype.Service;

@Service
public class UserManagementService {
    final UserRepository userRepository;

    public UserManagementService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public User findOne(UserId userId) {
        return userRepository.findById(userId.Value()).orElse(null);
    }
}
