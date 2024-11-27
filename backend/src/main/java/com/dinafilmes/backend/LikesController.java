package com.dinafilmes.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")

public class LikesController {

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    ComentariosRepository comentariosRepository;

    @PostMapping("/api/like")
    public ResponseEntity<String> adicionarLike(@RequestBody LikesEntity like) {
        Optional<LikesEntity> existingLike = likesRepository.findByCodigoComentarioAndCodigoUsuario(
                like.getCodigoComentario(), like.getCodigoUsuario());
    
        if (existingLike.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Você já deu like neste comentário.");
        }
    
        // Adiciona o like
        likesRepository.save(like);
    
        // Atualiza a quantidade de likes no comentário
        ComentariosEntity comentario = comentariosRepository.findById(like.getCodigoComentario()).orElse(null);
        if (comentario != null) {
            comentario.setQuantidadeLikes(comentario.getQuantidadeLikes() + 1);
            comentariosRepository.save(comentario);
        }
    
        return ResponseEntity.ok("Like adicionado com sucesso!");
    }
    
    @DeleteMapping("/api/like")
    public ResponseEntity<String> removerLike(@RequestBody LikesEntity like) {
        Optional<LikesEntity> existingLike = likesRepository.findByCodigoComentarioAndCodigoUsuario(
                like.getCodigoComentario(), like.getCodigoUsuario());
    
        if (existingLike.isPresent()) {
            likesRepository.delete(existingLike.get());
    
            // Atualiza a quantidade de likes no comentário
            ComentariosEntity comentario = comentariosRepository.findById(like.getCodigoComentario()).orElse(null);
            if (comentario != null) {
                comentario.setQuantidadeLikes(comentario.getQuantidadeLikes() - 1);
                comentariosRepository.save(comentario);
            }
    
            return ResponseEntity.ok("Like removido com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Like não encontrado.");
        }
    }


    @GetMapping("/api/like/contar")
    public ResponseEntity<Long> contarLikes(@RequestParam int codigoComentario) {
        long quantidadeLikes = likesRepository.countByCodigoComentario(codigoComentario);
        return ResponseEntity.ok(quantidadeLikes);
    }

    @GetMapping("/api/like/verificar")
    public ResponseEntity<Boolean> verificarLike(@RequestParam int codigoComentario, @RequestParam int codigoUsuario) {
        Optional<LikesEntity> existingLike = likesRepository.findByCodigoComentarioAndCodigoUsuario(codigoComentario, codigoUsuario);
        
        // Se o like existir, retorna true, caso contrário, false.
        if (existingLike.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

}
