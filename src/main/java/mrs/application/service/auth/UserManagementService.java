package mrs.application.service.auth;

import mrs.domain.model.auth.user.User;
import mrs.domain.model.auth.user.UserId;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * 利用者の管理
 */
@Service
public class UserManagementService {
    private final UserRepository userRepository;

    private final MessageSource messagesource;

    private final PasswordEncoder encoder;

    public UserManagementService(UserRepository userRepository, MessageSource messagesource, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.messagesource = messagesource;
        this.encoder = encoder;
    }

    /**
     * 利用者を確認する
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * 利用者を登録する
     */
    public void regist(User user) {
        Optional<User> result = userRepository.findByUserId(user.UserId());
        if (result.isPresent())
            throw new IllegalArgumentException(messagesource.getMessage("user_already_regist", new String[]{}, Locale.JAPAN));
        if (user.Password() == null || user.Password().isEmpty())
            throw new IllegalArgumentException(messagesource.getMessage("user_no_password", new String[]{}, Locale.JAPAN));

        User registUser = new User(user.UserId().Value(), user.Name().FirstName(), user.Name().LastName(), encoder.encode(user.Password()), user.RoleName());
        userRepository.save(registUser);
    }

    /**
     * 利用者を更新する
     */
    public void update(User user) {
        User existUser = userRepository.findByUserId(user.UserId()).orElseThrow(() -> new IllegalArgumentException(messagesource.getMessage("user_not_exist_id", new String[]{}, Locale.JAPAN)));
        if (user.Password() != null && !user.Password().isEmpty()) {
            User updateUser = new User(user.UserId().Value(), user.Name().FirstName(), user.Name().LastName(), encoder.encode(user.Password()), user.RoleName());
            userRepository.save(updateUser);
        } else {
            User updateUser = new User(user.UserId().Value(), user.Name().FirstName(), user.Name().LastName(), existUser.Password(), user.RoleName());
            userRepository.save(updateUser);
        }
    }

    /**
     * 利用者を削除する
     */
    public void delete(UserId userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException(messagesource.getMessage("user_not_exist_id", new String[]{}, Locale.JAPAN)));
        userRepository.delete(user);
    }

    /**
     * 利用者を検索する
     */
    public User findOne(UserId userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }
}
