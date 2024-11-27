package com.dinafilmes.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@SuppressWarnings("unused")
public interface FilmeRepository extends JpaRepository <FilmeEntity, Integer> {
    List<FilmeEntity> findByNomeFilmeContainingIgnoreCase(String search);

    List<FilmeEntity> findByGeneroContainingIgnoreCase(String categoria);

}
