
package com.dinafilmes.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@SuppressWarnings("unused")
@RestController
@CrossOrigin(origins = "*")
public class ListaController {

    @Autowired
    ListaRepository repository;

    @GetMapping("/api/favoritos")
    public ResponseEntity<List<FilmeEntity>> listarFavoritos(@RequestParam int codigoUsuario) {
        List<FilmeEntity> favoritos = repository.carregarListaFavoritos(codigoUsuario);
        if (favoritos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.ok(favoritos);
        }
    }

    @PutMapping("/api/lista/favoritar")
    public ResponseEntity<?> adicionarFavorito(@RequestBody ListaEntity listaEntity) {
        try {
            // Busca o codigoLista com base no codigoUsuario e codigoFilme
            Optional<Integer> codigoListaOpt = repository.verificarCodigoLista(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());
    
            if (codigoListaOpt.isPresent()) {
                // Atualiza a entrada existente
                int codigoLista = codigoListaOpt.get();
                ListaEntity favorito = repository.findById(codigoLista).orElseThrow();
                favorito.setFilmeFavorito(true); // Atualiza o campo filmeFavorito
    
                // Salva a atualização
                repository.save(favorito); 
                return ResponseEntity.ok(favorito); // Retorna o objeto atualizado
            } else {
                // Se não existe, cria uma nova entrada
                listaEntity.setFilmeFavorito(true);
                ListaEntity savedEntity = repository.save(listaEntity);
                return ResponseEntity.ok(savedEntity); // Retorna a nova entrada
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }
    

    @GetMapping("/api/lista/favorito")
    public ResponseEntity<Boolean> verificarSeFavorito(
    @RequestParam int codigoUsuario, @RequestParam int codigoFilme) {
    
    Optional<ListaEntity> favorito = repository.verificarFilmeFavorito(codigoUsuario, codigoFilme);
    return ResponseEntity.ok(favorito.isPresent()); // Retorna true se o filme for favoritado, false caso contrário
}


@PutMapping("/api/lista/desfavoritar")
public ResponseEntity<ListaEntity> desfavoritarFilme(@RequestBody ListaEntity listaEntity) {
    Optional<ListaEntity> favoritoExistente = repository.verificarFilmeFavorito(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());
    
    if (favoritoExistente.isPresent()) {
        ListaEntity favorito = favoritoExistente.get();
        favorito.setFilmeFavorito(false); // Desfavoritar o filme
        repository.save(favorito); // Salva a atualização
        return ResponseEntity.ok(favorito); // Retorna o objeto atualizado
    } else {
        return ResponseEntity.notFound().build();
}
}


@GetMapping("/api/assistidos")
public ResponseEntity<List<FilmeEntity>> listarAssistidos(@RequestParam int codigoUsuario) {
    List<FilmeEntity> assistidos = repository.carregarListaAssistidos(codigoUsuario);
    if (assistidos.isEmpty()) {
        return ResponseEntity.noContent().build(); // 204 No Content
    } else {
        return ResponseEntity.ok(assistidos);
    }
}

@PutMapping("/api/lista/assistir")
public ResponseEntity<?> adicionarAssistir(@RequestBody ListaEntity listaEntity) {
    try {
        // Busca o codigoLista com base no codigoUsuario e codigoFilme
        Optional<Integer> codigoListaOpt = repository.verificarCodigoLista(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());

        if (codigoListaOpt.isPresent()) {
            // Atualiza a entrada existente
            int codigoLista = codigoListaOpt.get();
            ListaEntity assistido = repository.findById(codigoLista).orElseThrow();
            assistido.setFilmeAssistido(true); // Atualiza o campo filmeAssisito

            // Salva a atualização
            repository.save(assistido); 
            return ResponseEntity.ok(assistido); // Retorna o objeto atualizado
        } else {
            // Se não existe, cria uma nova entrada
            listaEntity.setFilmeAssistido(true);
            ListaEntity savedEntity = repository.save(listaEntity);
            return ResponseEntity.ok(savedEntity); // Retorna a nova entrada
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
    }
}


@GetMapping("/api/lista/assistido")
public ResponseEntity<Boolean> verificarSeAssistido(
@RequestParam int codigoUsuario, @RequestParam int codigoFilme) {

Optional<ListaEntity> assistido = repository.verificarFilmeAssistido(codigoUsuario, codigoFilme);
return ResponseEntity.ok(assistido.isPresent()); // Retorna true se o filme for assistido, false caso contrário
}


@PutMapping("/api/lista/desassistir")
public ResponseEntity<ListaEntity> desassistirFilme(@RequestBody ListaEntity listaEntity) {
Optional<ListaEntity> assistidoExistente = repository.verificarFilmeAssistido(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());

if (assistidoExistente.isPresent()) {
    ListaEntity assistido = assistidoExistente.get();
    assistido.setFilmeAssistido(false); // Desassistir o filme
    repository.save(assistido); // Salva a atualização
    return ResponseEntity.ok(assistido); // Retorna o objeto atualizado
} else {
    return ResponseEntity.notFound().build();
}
}

@GetMapping("/api/aassistir")
    public ResponseEntity<List<FilmeEntity>> listarAAssistir(@RequestParam int codigoUsuario) {
        List<FilmeEntity> aassistir = repository.carregarListaAAssistir(codigoUsuario);
        if (aassistir.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.ok(aassistir);
        }
    }

    @PutMapping("/api/lista/aassistir")
    public ResponseEntity<?> adicionarAAssisitr(@RequestBody ListaEntity listaEntity) {
        try {
            // Busca o codigoLista com base no codigoUsuario e codigoFilme
            Optional<Integer> codigoListaOpt = repository.verificarCodigoLista(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());
    
            if (codigoListaOpt.isPresent()) {
                // Atualiza a entrada existente
                int codigoLista = codigoListaOpt.get();
                ListaEntity aassistir = repository.findById(codigoLista).orElseThrow();
                aassistir.setFilmeAAssistir(true); // Atualiza o campo filmeAAssistir
    
                // Salva a atualização
                repository.save(aassistir); 
                return ResponseEntity.ok(aassistir); // Retorna o objeto atualizado
            } else {
                // Se não existe, cria uma nova entrada
                listaEntity.setFilmeAAssistir(true);
                ListaEntity savedEntity = repository.save(listaEntity);
                return ResponseEntity.ok(savedEntity); // Retorna a nova entrada
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }
    

    @GetMapping("/api/lista/aassistir")
    public ResponseEntity<Boolean> verificarSeAAssisitir(
    @RequestParam int codigoUsuario, @RequestParam int codigoFilme) {
    
    Optional<ListaEntity> aassistir = repository.verificarFilmeAAssistir(codigoUsuario, codigoFilme);
    return ResponseEntity.ok(aassistir.isPresent()); // Retorna true se o filme for favoritado, false caso contrário
}


@PutMapping("/api/lista/desaassistir")
public ResponseEntity<ListaEntity> desaassistirFilme(@RequestBody ListaEntity listaEntity) {
    Optional<ListaEntity> aassistirExistente = repository.verificarFilmeAAssistir(listaEntity.getCodigoUsuario(), listaEntity.getCodigoFilme());
    
    if (aassistirExistente.isPresent()) {
        ListaEntity aassistir = aassistirExistente.get();
        aassistir.setFilmeAAssistir(false); // Desaassistir o filme
        repository.save(aassistir); // Salva a atualização
        return ResponseEntity.ok(aassistir); // Retorna o objeto atualizado
    } else {
        return ResponseEntity.notFound().build();
}
}


}