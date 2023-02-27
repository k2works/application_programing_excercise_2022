package bouquet.application.service.auth;

import bouquet.domain.model.auth.Password;
import bouquet.domain.model.auth.UserDetailsImpl;
import bouquet.domain.model.auth.UserId;
import bouquet.infrastructure.security.jwt.JwtUtils;
import bouquet.infrastructure.security.jwt.payload.response.JwtResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 認証APIサービス
 */
@Service
public class UserAuthApiService {

    final AuthenticationManager authenticationManager;

    final JwtUtils jwtUtils;

    public UserAuthApiService(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    /**
     * ユーザーを認証する
     */
    public JwtResponse authenticateUser(UserId userId, Password password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userId.Value(), password.Value())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        return new JwtResponse(jwt, userDetails.getUsername(), roles);
    }
}
