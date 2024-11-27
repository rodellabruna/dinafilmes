package com.dinafilmes.backend;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contato")
@CrossOrigin(origins = "*")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    // Registrando um contato
    @PostMapping
    public ResponseEntity<String> registrarContato(@RequestBody ContatoEntity contato) {
        try {
            // Salvar o contato no banco de dados MySQL
            contatoRepository.save(contato);
            return ResponseEntity.ok("Contato registrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao registrar o contato: " + e.getMessage());
        }
    }

    // Método GET para obter todos os contatos
    @GetMapping
    public ResponseEntity<?> obterContatos() {
        try {
            // Buscar todos os contatos no banco de dados
            return ResponseEntity.ok(contatoRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao recuperar os contatos: " + e.getMessage());
        }
    }

    
    // Marcando um contato como "lido"
    @PutMapping("/{codigo}")
    public ResponseEntity<String> alterarContato(@PathVariable Long codigo) {
        Optional<ContatoEntity> contatoOptional = contatoRepository.findById(codigo);
    
        if (contatoOptional.isPresent()) {
            ContatoEntity contato = contatoOptional.get();
            contato.setLido(true);
    
            contatoRepository.save(contato);
    
            return ResponseEntity.ok("Contato atualizado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contato não encontrado.");
        }
    }

}


