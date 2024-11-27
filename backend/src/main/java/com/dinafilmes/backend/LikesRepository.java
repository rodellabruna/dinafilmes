package com.dinafilmes.backend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<LikesEntity, Integer> {
    
    Optional<LikesEntity> findByCodigoComentarioAndCodigoUsuario(int codigoComentario, int codigoUsuario);

    Long countByCodigoComentario(int codigoComentario);


}