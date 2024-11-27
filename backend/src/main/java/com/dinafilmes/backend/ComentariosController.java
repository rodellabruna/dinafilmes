package com.dinafilmes.backend;
import com.dinafilmes.backend.ComentarioDTO;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.util.ArrayUtils;





import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@SuppressWarnings("unused")
@RestController
@CrossOrigin(origins = "*")
public class ComentariosController {

    @Autowired
    ComentariosRepository repository; 

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private DenunciaRepository denunciaRepository;

    
    @PostMapping("/api/comentario")
    public ResponseEntity<?> inserir(@RequestBody ComentariosEntity obj) {
        // Verifica se o objeto é válido (você pode adicionar mais validações)
        if (obj.getUsuario() == null || obj.getFilme() == null) {
            return ResponseEntity.badRequest().body("Usuário e filme devem ser informados.");
        }
    
        repository.save(obj);
        return ResponseEntity.ok("Comentário gravado com sucesso!");
    }


    @PutMapping("/api/comentario")
    public ResponseEntity<String> alterar (@RequestBody ComentariosEntity obj){
        String mensagem = "comentário alterado com sucesso ! " + obj.getComentario();
        return ResponseEntity.ok(mensagem);
    }

//carrega os comentarios filtrados por filme
    @GetMapping("/api/comentarios")
public ResponseEntity<List<ComentarioDTO>> carregarComentarios(@RequestParam int codigoFilme) {
    List<ComentarioDTO> comentarios = repository.carregarListaComentarios(codigoFilme);
    if (comentarios.isEmpty()) {
        return ResponseEntity.noContent().build(); // 204 No Content
    } else {
        return ResponseEntity.ok(comentarios);
    }
}
//carrega os comentarios todos, sem filtro
@GetMapping("/api/comentario")
public ResponseEntity<List<ComentarioDTO>> carregarComentarios() {
    List<ComentarioDTO> comentarios = repository.carregarTodosComentarios(); 
    if (comentarios.isEmpty()) {
        return ResponseEntity.noContent().build(); // 204 No Content
    } else {
        return ResponseEntity.ok(comentarios);
    }
}


@GetMapping("/api/comentario/{codigoComentario}")
public ResponseEntity<?> carregar(@PathVariable int codigoComentario) {
    Optional<ComentariosEntity> obj = repository.findById(codigoComentario);
    
    if (obj.isPresent()) {
        return ResponseEntity.ok(obj.get()); 
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado."); 
    }
}



    @DeleteMapping("/api/comentario/{codigo}")
    public ResponseEntity<String> remover (@PathVariable int codigo){
        if (!repository.existsById(codigo)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
        }
        repository.deleteById(codigo);
        String mensagem = "comentário removido com sucesso ! " + codigo;
        return ResponseEntity.ok(mensagem);
    }

    @PutMapping("/api/comentario/{codigo}")
    public ResponseEntity<String> ocultarComentario (@PathVariable int codigo) {
        Optional<ComentariosEntity> comentarioOptional = repository.findById(codigo);

        if (comentarioOptional.isPresent()) {
            ComentariosEntity comentario = comentarioOptional.get();
            comentario.setApagadoOuModerado(true);
            comentario.setDataAtualizacao(LocalDateTime.now()); 
    
            repository.save(comentario);
    
            return ResponseEntity.ok("Comentário atualizado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
        }
    }






//     @PutMapping("/api/comentario/{codigo}/moderacao")
// public ResponseEntity<String> moderarComentario(@PathVariable int codigo, @RequestBody ComentarioDTO comentarioDTO) {
//     Optional<ComentariosEntity> comentarioOptional = repository.findById(codigo);

//     if (comentarioOptional.isPresent()) {
//         ComentariosEntity comentario = comentarioOptional.get();
//         comentario.setApagadoOuModerado(comentarioDTO.isApagadoOuModerado());
//         comentario.setDataAtualizacao(LocalDateTime.now()); 

//         repository.save(comentario);

//         return ResponseEntity.ok("Comentário atualizado com sucesso!");
//     } else {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
//     }
// }


@PutMapping("/api/comentario/{codigo}/spoiler")
public ResponseEntity<String> sinalizarSpoiler(@PathVariable int codigo, @RequestBody ComentarioDTO comentarioDTO) {
    Optional<ComentariosEntity> comentarioOptional = repository.findById(codigo);

    if (comentarioOptional.isPresent()) {
        ComentariosEntity comentario = comentarioOptional.get();
        comentario.setComSpoiler(comentarioDTO.isComSpoiler());
        comentario.setDataAtualizacao(LocalDateTime.now()); 

        repository.save(comentario);

        return ResponseEntity.ok("Comentário atualizado com sucesso!");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
    }
}

@GetMapping("/api/comentarios/contar")
public ResponseEntity<Long> contarComentarios(@RequestParam int codigoFilme) {
    long quantidade = repository.contarComentariosPorFilme(codigoFilme);
    return ResponseEntity.ok(quantidade);
}

// @PutMapping("/api/comentario/{codigoComentario}/moderar")
// public ResponseEntity<String> moderarComentario(@PathVariable int codigoComentario) {
//     // Busca o comentário pelo codigoComentario
//     Optional<ComentariosEntity> comentarioOptional = repository.findById(codigoComentario);

//     if (!comentarioOptional.isPresent()) {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
//     }

//     ComentariosEntity comentario = comentarioOptional.get();
//     int codigoUsuario = comentario.getUsuario().getCodigoUsuario(); // Obtém o código do usuário associado ao comentário

//     // Atualiza o campo "aviso1" do usuário para true
//     Optional<UsuarioEntity> usuarioOptional = usuarioRepository.findById(codigoUsuario);

//     if (!usuarioOptional.isPresent()) {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
//     }

//     UsuarioEntity usuario = usuarioOptional.get();
//     usuario.setAviso1(true); // Define o aviso1 como true
//     usuarioRepository.save(usuario); // Salva as alterações no banco de dados

//     // Atualiza o comentário
//     comentario.setApagadoOuModerado(true); // Marca o comentário como moderado
//     comentario.setDataAtualizacao(LocalDateTime.now()); // Define a data da última atualização
//     repository.save(comentario); // Salva a alteração no comentário

//     // Envia o e-mail de aviso para o usuário
//     String email = usuario.getEmail(); // Supondo que você tenha um campo 'email' no seu Usuário
//     String subject = "Aviso de Violação de Regras";
//     String body = "Você violou uma regra de uso da Plataforma Dina Filmes. Por favor, fique atento aos seus próximos comentários.";
//     emailService.sendEmail(email, subject, body); // Envia o e-mail

//     // Resposta de sucesso
//     return ResponseEntity.ok("Comentário moderado com sucesso. Usuário avisado.");
// }

@PutMapping("/api/comentario/{codigo}/moderacao")
public ResponseEntity<String> moderarComentario(@PathVariable int codigo, @RequestBody DenunciaDTO denunciaDTO) {

    // 1. Buscar a denúncia relacionada ao comentário
    Optional<DenunciaEntity> denunciaOpt = denunciaRepository.findByCodigoDenuncia(codigo);
    
    if (!denunciaOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Denúncia não encontrada.");
    }

    DenunciaEntity denuncia = denunciaOpt.get();
    
    // 2. Buscar o comentário relacionado à denúncia
    Optional<ComentariosEntity> comentarioOpt = repository.findByCodigoComentario(denunciaDTO.getCodigoComentario());
    
    if (!comentarioOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
    }

    ComentariosEntity comentario = comentarioOpt.get();

    // 3. Verificar o tipo da denúncia
    if (denuncia.getTipoDenuncia().equals("SPOILER")) {
        // Se for do tipo "SPOILER", alteramos a coluna comSpoiler
        comentario.setComSpoiler(true);
    } else {
        // Caso contrário, alteramos a coluna apagadoOuModerado
        comentario.setApagadoOuModerado(true);
    }

    // 4. Atualizar a data de atualização
    comentario.setDataAtualizacao(LocalDateTime.now());

    // 5. Salvar as alterações no comentário
    repository.save(comentario);

    // 6. Retornar uma resposta de sucesso
    return ResponseEntity.ok("Comentário moderado com sucesso.");
}
}


