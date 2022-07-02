package mrs.presentation.api.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import mrs.application.service.auth.ApiAuthService;
import mrs.domain.model.auth.user.*;
import mrs.infrastructure.security.jwt.payload.request.LoginRequest;
import mrs.infrastructure.security.jwt.payload.request.SignupRequest;
import mrs.infrastructure.security.jwt.payload.response.JwtResponse;
import mrs.infrastructure.security.jwt.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 認証API
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@Tag(name = "JWTAuth", description = "JWT認証")
public class AuthController {
    final ApiAuthService apiAuthService;

    public AuthController(ApiAuthService apiAuthService) {
        this.apiAuthService = apiAuthService;
    }

    @Operation(summary = "ユーザー認証", description = "データベースに登録されているユーザーを認証する")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = apiAuthService.findByUserId(new UserId(loginRequest.getUserId()));
            if (user == null) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: User is not exist"));
            }

            JwtResponse jwtResponse = apiAuthService.authenticateUser(new UserId(loginRequest.getUserId()), new Password(loginRequest.getPassword()));
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @Operation(summary = "ユーザー登録", description = "ユーザーを新規登録する")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            User user = apiAuthService.findByUserId(new UserId(signupRequest.getUserId()));
            if (user != null) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: UserId is already taken"));
            }

            UserId userId = new UserId(signupRequest.getUserId());
            Password password = new Password(signupRequest.getPassword());
            UserName userName = new UserName(signupRequest.getFirstName(), signupRequest.getLastName());
            RoleName role = signupRequest.getRole() == null ? RoleName.一般 : RoleName.valueOf(signupRequest.getRole());
            apiAuthService.registerUser(userId, password, userName, role);

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}
