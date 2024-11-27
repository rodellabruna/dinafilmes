package com.dinafilmes.backend;
import com.dinafilmes.backend.ComentarioDTO;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface ComentariosRepository extends JpaRepository<ComentariosEntity, Integer>{

    @Query("SELECT new com.dinafilmes.backend.ComentarioDTO(c.codigoComentario, c.usuario.codigoUsuario, c.comentario, c.usuario.nomeUsuario, c.comSpoiler, c.apagadoOuModerado) " +
    "FROM ComentariosEntity c WHERE c.filme.codigoFilme = ?1 AND c.apagadoOuModerado != true")
    List<ComentarioDTO> carregarListaComentarios(int codigoFilme);

    @Query("SELECT COUNT(c) FROM ComentariosEntity c WHERE c.filme.codigoFilme = ?1 AND c.apagadoOuModerado != true")
    long contarComentariosPorFilme(int codigoFilme);

    @Query("SELECT new com.dinafilmes.backend.ComentarioDTO(c.codigoComentario, c.usuario.codigoUsuario, c.comentario, c.usuario.nomeUsuario, c.comSpoiler, c.apagadoOuModerado) " +
    "FROM ComentariosEntity c")
    List<ComentarioDTO> carregarTodosComentarios();

    Optional<ComentariosEntity> findByCodigoComentario(int codigoComentario);

}