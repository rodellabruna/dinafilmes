package com.dinafilmes.backend;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer>, JpaSpecificationExecutor<UsuarioEntity> {
    
    @Query(value = "select * from usuario where email=?1", nativeQuery = true)
    Optional<UsuarioEntity> buscarEmail(String email);

    Optional<UsuarioEntity> findByEmailValidationToken(String emailValidationToken);


    boolean existsByEmail(String email);
    
    UsuarioEntity findByEmail(String email);
    
    UsuarioEntity findByResetPasswordToken(String resetPasswordToken);

    Optional<UsuarioEntity> findById(int codigoUsuario);

}