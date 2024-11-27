package com.dinafilmes.backend;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<ContatoEntity, Long> {

    Optional<ContatoEntity> findById(Long id);
    
}
