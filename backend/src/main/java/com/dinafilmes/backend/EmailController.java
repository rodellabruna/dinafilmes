package com.dinafilmes.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/recuperar-senha")
    public ResponseEntity<String> sendEmail(@RequestParam String toEmail) {
        try {
            emailService.sendEmail(toEmail, "Recuperação de Senha", "Este é um email da Dina Filmes para você recuperar seu acesso.");
            return ResponseEntity.ok("Email enviado com sucesso para " + toEmail);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao enviar o email: " + e.getMessage());
}
}
}