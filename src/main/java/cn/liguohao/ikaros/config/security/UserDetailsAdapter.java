package cn.liguohao.ikaros.config.security;

import cn.liguohao.ikaros.entity.User;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * @author li-guohao
 */
public class UserDetailsAdapter implements UserDetails {

    private final User user;
    private List<GrantedAuthorityAdapter> authorities;

    public UserDetailsAdapter(User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /**
     * @param authorities 权限集合
     * @return this
     */
    public UserDetailsAdapter addAuthorities(Set<GrantedAuthorityAdapter> authorities) {
        if (this.authorities == null) {
            this.authorities = new ArrayList<>(10);
        }
        this.authorities.addAll(authorities);
        return this;
    }

    /**
     * @param grantedAuthority 单个权限实例
     * @return this
     */
    public UserDetailsAdapter addAuthority(GrantedAuthorityAdapter grantedAuthority) {
        if (this.authorities == null) {
            this.authorities = new ArrayList<>(10);
        }
        this.authorities.add(grantedAuthority);
        return this;
    }


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.getNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getEnable();
    }

    public User getUser() {
        return user;
    }
}