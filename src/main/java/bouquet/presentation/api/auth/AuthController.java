package bouquet.presentation.api.auth;

import bouquet.application.service.auth.UserAuthApiService;
import bouquet.application.service.auth.UserRepository;
import bouquet.domain.model.auth.*;
import bouquet.infrastructure.security.jwt.JwtUtils;
import bouquet.infrastructure.security.jwt.payload.request.LoginRequest;
import bouquet.infrastructure.security.jwt.payload.request.SignupRequest;
import bouquet.infrastructure.security.jwt.payload.response.JwtResponse;
import bouquet.infrastructure.security.jwt.payload.response.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@Tag(name = "JWTAuth", description = "JWT認証")
public class AuthController {
    @Autowired
    UserAuthApiService userAuthApiService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Operation(summary = "ユーザー認証", description = "データベースに登録されているユーザーを認証する")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> user = userRepository.findById(loginRequest.getUserId());
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: User is not exist"));
            }

            JwtResponse results = userAuthApiService.authenticateUser(
                    new UserId(loginRequest.getUserId()),
                    new Password(loginRequest.getPassword())
            );

            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @Operation(summary = "ユーザー登録", description = "ユーザーを新規登録する")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            Optional<User> user = userRepository.findById(signupRequest.getUserId());
            if (user.isPresent()) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: UserId is already taken"));
            }

            UserId userId = new UserId(signupRequest.getUserId());
            String password = passwordEncoder.encode(signupRequest.getPassword());
            Name userName = new Name(signupRequest.getFirstName(), signupRequest.getLastName());
            String role = signupRequest.getRole();
            RoleName roleName;
            if (role == null) {
                roleName = RoleName.一般;
            } else {
                roleName = RoleName.valueOf(role);
            }
            User newUser = new User(userId.Value(), password, userName.FirstName(), userName.LastName(), roleName);
            userRepository.save(newUser);

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
