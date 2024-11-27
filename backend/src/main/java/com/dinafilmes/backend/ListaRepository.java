package com.dinafilmes.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
public interface ListaRepository extends JpaRepository<ListaEntity, Integer> {
    
    @Query("SELECT f FROM FilmeEntity f JOIN ListaEntity l ON f.codigoFilme = l.codigoFilme WHERE l.codigoUsuario = ?1 AND l.filmeFavorito = true")
    List<FilmeEntity> carregarListaFavoritos(int codigoUsuario);


    @Query("SELECT l FROM ListaEntity l WHERE l.codigoUsuario = :codigoUsuario AND l.codigoFilme = :codigoFilme AND l.filmeFavorito = true")
Optional<ListaEntity> verificarFilmeFavorito(@Param("codigoUsuario") int codigoUsuario, @Param("codigoFilme") int codigoFilme);


@Query("SELECT f FROM FilmeEntity f JOIN ListaEntity l ON f.codigoFilme = l.codigoFilme WHERE l.codigoUsuario = ?1 AND l.filmeAssistido = true")
List<FilmeEntity> carregarListaAssistidos(int codigoUsuario);


@Query("SELECT l FROM ListaEntity l WHERE l.codigoUsuario = :codigoUsuario AND l.codigoFilme = :codigoFilme AND l.filmeAssistido = true")
Optional<ListaEntity> verificarFilmeAssistido(@Param("codigoUsuario") int codigoUsuario, @Param("codigoFilme") int codigoFilme);


@Query("SELECT f FROM FilmeEntity f JOIN ListaEntity l ON f.codigoFilme = l.codigoFilme WHERE l.codigoUsuario = ?1 AND l.filmeAAssistir = true")
List<FilmeEntity> carregarListaAAssistir(int codigoUsuario);


@Query("SELECT l FROM ListaEntity l WHERE l.codigoUsuario = :codigoUsuario AND l.codigoFilme = :codigoFilme AND l.filmeAAssistir = true")
Optional<ListaEntity> verificarFilmeAAssistir(@Param("codigoUsuario") int codigoUsuario, @Param("codigoFilme") int codigoFilme);



@Query("SELECT l.codigoLista FROM ListaEntity l WHERE l.codigoUsuario = :codigoUsuario AND l.codigoFilme = :codigoFilme")
Optional<Integer> verificarCodigoLista(@Param("codigoUsuario") int codigoUsuario, @Param("codigoFilme") int codigoFilme);

    
}

