package com.dinafilmes.backend;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;


@SuppressWarnings("unused")
@RestController
@CrossOrigin("*")
public class DenunciaController {

    @Autowired
    DenunciaRepository repository;


    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private ComentariosRepository comentariosRepository;

    @PostMapping("/api/denuncia")
    public ResponseEntity<String> inserir(@RequestBody DenunciaEntity obj) {
        if (obj.getComentario() == null) {
            return ResponseEntity.badRequest().body("Código Comentario deve ser informado.");
        }

        repository.save(obj);
        return ResponseEntity.status(HttpStatus.CREATED).body("Denúncia gravada com sucesso!");
    }

    @GetMapping("/api/denuncias")
    public ResponseEntity<List<DenunciaDTO>> listarDenuncias() {
        List<DenunciaDTO> denuncias = repository.findDenunciasDTO();
        return ResponseEntity.ok(denuncias);

    }

    @PutMapping("/api/denuncia/{codigo}")
    public ResponseEntity<String> alterarResolvido(@PathVariable int codigo) {

        Optional<DenunciaEntity> denunciaOpt = repository.findByCodigoDenuncia(codigo);

        if (!denunciaOpt.isPresent()) {
            // Se não encontrar a denúncia, retorna erro 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Denúncia não encontrada.");
        }
        DenunciaEntity denuncia = denunciaOpt.get();

        // Atualiza o campo 'resolvido' para true
        denuncia.setResolvido(true);
        denuncia.setDataResolucao(LocalDateTime.now()); // Marca a data de resolução com a data atual

        // Salva a entidade atualizada
        repository.save(denuncia);

        // Retorna resposta de sucesso
        return ResponseEntity.ok("Denúncia resolvida com sucesso.");

    }

    @PutMapping("/api/denuncia/{codigoDenuncia}/moderacao")
public ResponseEntity<String> moderarComentario(@PathVariable int codigoDenuncia) {

    // 1. Buscar a denúncia pela 'codigoDenuncia'
    Optional<DenunciaEntity> denunciaOpt = repository.findByCodigoDenuncia(codigoDenuncia);
    
    if (!denunciaOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Denúncia não encontrada.");
    }

    DenunciaEntity denuncia = denunciaOpt.get();

    System.out.println("Tipo da denúncia: " + denuncia.getTipoDenuncia());
    

    // 2. Buscar o comentário relacionado à denúncia
    ComentariosEntity comentario = denuncia.getComentario(); 
    
    if (comentario == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentário não encontrado.");
    }
    String tipo = "SPOILER";
    if (denuncia.getTipoDenuncia() == TipoDenuncia.SPOILER) {
        // Se for do tipo "SPOILER", alteramos a coluna comSpoiler
        comentario.setComSpoiler(true);
    } else {
        // Caso contrário, alteramos a coluna apagadoOuModerado
        comentario.setApagadoOuModerado(true);
    }

    // 4. Atualizar a data de atualização
    denuncia.setResolvido(true);
    denuncia.setDenunciaAcatada(true);
    comentario.setDataAtualizacao(LocalDateTime.now());

    // 5. Salvar as alterações no comentário
    comentariosRepository.save(comentario);
    repository.save(denuncia);


    // 6. Retornar uma resposta de sucesso
    return ResponseEntity.ok("Comentário moderado com sucesso.");
}


}
