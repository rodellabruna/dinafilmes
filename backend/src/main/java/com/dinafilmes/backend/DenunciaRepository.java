package com.dinafilmes.backend;
import com.dinafilmes.backend.ComentarioDTO;
import com.dinafilmes.backend.DenunciaDTO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@Repository
public interface DenunciaRepository extends JpaRepository<DenunciaEntity, Integer>{

    @Query("SELECT new com.dinafilmes.backend.DenunciaDTO(" +
       "d.codigoDenuncia, " +
       "d.tipoDenuncia, " +
       "d.comentario.codigoComentario, " +
       "d.denunciaAcatada, " +
       "d.dataCriacao, " +
       "d.dataResolucao, " +
       "d.usuarioDenunciante, " +
       "d.resolvido, " +
       "d.comentario.usuario.codigoUsuario, " +  // Acesso ao código do usuário relacionado ao comentário
       "d.comentario.filme.codigoFilme) " +      // Acesso ao código do filme relacionado ao comentário
       "FROM DenunciaEntity d " +
       "JOIN d.comentario c")  // Join explícito com a tabela Comentario
List<DenunciaDTO> findDenunciasDTO();


public Optional<DenunciaEntity> findByCodigoDenuncia(int codigoDenuncia);



}
