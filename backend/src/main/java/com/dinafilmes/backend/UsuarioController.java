package com.dinafilmes.backend;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import java.util.UUID;
import java.util.Map;

@SuppressWarnings("unused")
@RestController
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    UsuarioRepository repository;

    
    @Autowired
    private EmailService emailService;

    @PostMapping("/api/usuario")
    public ResponseEntity<Map<String, String>> inserir(@RequestBody UsuarioEntity obj) {
        try {
            obj.setSenha(obj.getSenhaNova());

            String token = UUID.randomUUID().toString();
            obj.setEmailValidationToken(token);
            obj.setEmailValidated(false);
            repository.save(obj);
    
            String validationUrl = "http://localhost:4200/validar-email?token=" + token;
            String mensagem = "<a clicktracking=off href=\"" + validationUrl  + "\">Clique aqui para validar sua conta</a>";
            emailService.sendEmail(obj.getEmail(), "Validação de Email - Dina Filmes", mensagem);
    
            Map<String, String> response = Map.of("mensagem", "Cadastro realizado com sucesso! Verifique seu email para validar sua conta.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("erro", "Erro ao cadastrar usuário: " + e.getMessage()));
        }
    }
    

    @PostMapping("/api/usuario/login")
    public ResponseEntity<?> fazerLogin(@RequestBody UsuarioEntity obj) {
        Optional<UsuarioEntity> retorno = repository.buscarEmail(obj.getEmail());
        if (retorno.isPresent()) {
            UsuarioEntity usuario = retorno.get();
            if (!usuario.isEmailValidated()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                    .body(Map.of("erro", "Email não validado. Por favor, valide seu email."));
            }

            if (!usuario.checarSenha(obj.getSenhaAtual())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                     .body(Map.of("erro", "Email ou senha inválidos."));
            }

            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("erro", "Email ou senha inválidos."));
        }
}
      


    @GetMapping("/api/usuarios")
    public ResponseEntity<List<UsuarioEntity>> listar(){
    List<UsuarioEntity> usuarios;
        usuarios = repository.findAll();
    return ResponseEntity.ok(usuarios);
    }



@GetMapping("/api/usuario/verificar-email")
public ResponseEntity<Boolean> verificarEmail(@RequestParam String email) {
    boolean exists = repository.existsByEmail(email);
    return ResponseEntity.ok(exists);
}

@PutMapping("/api/usuario/{codigoUsuario}/aviso1")
public ResponseEntity<UsuarioEntity> aviso1(@PathVariable int codigoUsuario) {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigoUsuario);

    if (usuarioOptional.isPresent()) {
        UsuarioEntity usuario = usuarioOptional.get();
        usuario.setAviso1(true);
        
//     // Envia o e-mail de aviso para o usuário
    String email = usuario.getEmail(); 
    String subject = "Aviso de Violação de Regras";
    String body = "Você violou uma regra de uso da Plataforma Dina Filmes. Entre as regras dos comentários temos: Proibido racismo, homofobia, qualquer tipo de preconceito ou discurso de ódio. Não são Permitidos SPAM. Comentário assim não são bem vindos na nossa plataforma e usuários que insistirem em postá-los podem ser banidos da plataforma. Comentários que possuem Spoiler devem ser sinalizados no momento da postagem. Por favor, fique atento aos seus próximos comentários. A equipe Dina Filmes agradece a colaboração.";
    emailService.sendEmail(email, subject, body); // Envia o e-mail

        repository.save(usuario);
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping("/api/usuario/{codigoUsuario}/aviso2")
public ResponseEntity<UsuarioEntity> aviso2(@PathVariable int codigoUsuario) {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigoUsuario);

    if (usuarioOptional.isPresent()) {
        UsuarioEntity usuario = usuarioOptional.get();
        usuario.setAviso2(true);
        
//     // Envia o e-mail de aviso para o usuário
    String email = usuario.getEmail(); 
    String subject = "Aviso de Violação de Regras";
    String body = "Você violou uma regra de uso da Plataforma Dina Filmes pela segunda vez. Entre as regras dos comentários temos: Proibido racismo, homofobia, qualquer tipo de preconceito ou discurso de ódio. Não são Permitidos SPAM. Comentário assim não são bem vindos na nossa plataforma e usuários que insistirem em postá-los podem ser banidos da plataforma. Comentários que possuem Spoiler devem ser sinalizados no momento da postagem. Por favor, fique atento aos seus próximos comentários. A equipe Dina Filmes agradece a colaboração.";
    emailService.sendEmail(email, subject, body); // Envia o e-mail

        repository.save(usuario);
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping("/api/usuario/{codigoUsuario}/inativar")
public ResponseEntity<UsuarioEntity> inativar(@PathVariable int codigoUsuario) {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigoUsuario);

    if (usuarioOptional.isPresent()) {
        UsuarioEntity usuario = usuarioOptional.get();
        usuario.setAtivo(false);
        
//     // Envia o e-mail de aviso para o usuário
    String email = usuario.getEmail(); 
    String subject = "Aviso de Violação de Regras e Banimento da Plataforma";
    String body = "Infelizmente você violou as regras de uso da Plataforma Dina Filmes mais de uma vez. Consideramos que você não respeitou as regras para um bom convívio na plataforma e não poderá mais acessá-la. A equipe Dina Filmes fica a disposição para dúvidas.";
    emailService.sendEmail(email, subject, body); // Envia o e-mail

        repository.save(usuario);
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping("/api/usuario/{codigoUsuario}/reativar")
public ResponseEntity<UsuarioEntity> reativar(@PathVariable int codigoUsuario) {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigoUsuario);

    if (usuarioOptional.isPresent()) {
        UsuarioEntity usuario = usuarioOptional.get();
        usuario.setAtivo(true);
        usuario.setAviso1(false);
        usuario.setAviso2(false);
        
//     // Envia o e-mail de aviso para o usuário
    String email = usuario.getEmail(); 
    String subject = "Bem vindo novamente à Plataforma Dina Filmes!";
    String body = "O seu acesso à Dina Filmes foi reestabelecido! A plataforma foi desenvolvida para proporcionar uma ferramenta de organização dos seus filmes e também momentos de discussão ao comentar filmes. Bem vindo de volta e até a próxima seção!";
    emailService.sendEmail(email, subject, body); // Envia o e-mail

        repository.save(usuario);
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping("/api/usuario")
public ResponseEntity<String> alterar(@RequestBody UsuarioEntity obj) {
    try {
        Optional<UsuarioEntity> usuarioOptional = repository.findById(obj.getCodigoUsuario());
        
        if (usuarioOptional.isPresent()) {
            UsuarioEntity usuarioExistente = usuarioOptional.get();
            // Exemplo de lógica com senhaAntiga
            
            if (obj.getSenhaAtual() != null || obj.getSenhaNova() != null){
                if (obj.getSenhaAtual() == null || obj.getSenhaAtual().isEmpty() || obj.getSenhaNova() == null || obj.getSenhaNova().isEmpty()) {
                    return ResponseEntity.unprocessableEntity().body("A senha deve ser informada.");
                }
    
                if (!usuarioExistente.checarSenha(obj.getSenhaAtual())) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha antiga está incorreta. Tente outra");
                }
                usuarioExistente.setSenha(obj.getSenhaNova());
            }

            usuarioExistente.setNomeUsuario(obj.getNomeUsuario());
            usuarioExistente.setDataAtualizacao(LocalDateTime.now());
            usuarioExistente.setAtivo(obj.isAtivo());
            repository.save(usuarioExistente);
            return ResponseEntity.ok(("Cadastro atualizado com sucesso"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o cadastro");
    }
}

@DeleteMapping("/api/usuario")
public ResponseEntity<String> ocultarUsuario(@RequestBody UsuarioEntity obj) {
    try {
        Optional<UsuarioEntity> usuarioOptional = repository.findById(obj.getCodigoUsuario());
        
        if (usuarioOptional.isPresent()) {
            UsuarioEntity usuarioExistente = usuarioOptional.get();
            // Exemplo de lógica com senhaAntiga
            
            
            if (obj.getSenhaAtual() == null || obj.getSenhaAtual().isEmpty()) {
                return ResponseEntity.unprocessableEntity().body("A senha deve ser informada.");
            }

            if (!usuarioExistente.checarSenha(obj.getSenhaAtual())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha está incorreta. Tente outra");
            }

            usuarioExistente.setDataAtualizacao(LocalDateTime.now());
            usuarioExistente.setAtivo(false);
            repository.save(usuarioExistente);
            return ResponseEntity.ok(("Apagado com sucesso"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o cadastro");
    }
}

@GetMapping("/api/usuario/{codigo}")
public ResponseEntity<UsuarioEntity> 
    carregar(@PathVariable int codigo){
    Optional<UsuarioEntity> obj = repository.findById(codigo);
    if(obj.isPresent())    
        return ResponseEntity.ok(obj.get());
    else
        return ResponseEntity.ok(new UsuarioEntity());
}

@PostMapping("/api/usuario/{codigo}/foto")
public ResponseEntity<String> uploadFotoUsuario(@PathVariable int codigo, @RequestParam("fotoUsuario") MultipartFile file) {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigo);
    
    if (!file.isEmpty() && usuarioOptional.isPresent()) {
        try {
            // Converte MultipartFile para Byte[] manualmente
            byte[] bytes = file.getBytes();
            Byte[] byteObjects = new Byte[bytes.length];
            
            for (int i = 0; i < bytes.length; i++) {
                byteObjects[i] = bytes[i];
            }

            // Inferir o MIME type a partir da extensão do arquivo
            String fotoUsuarioMimeType = file.getContentType();

            // Salva a foto e o MIME type no usuário
            UsuarioEntity usuario = usuarioOptional.get();
            usuario.setFotoUsuario(byteObjects);
            usuario.setFotoUsuarioMimeType(fotoUsuarioMimeType); // Armazena o MIME type
            repository.save(usuario);
            
            return ResponseEntity.ok("Foto enviada com sucesso!");
        } catch (IOException e) {
            e.printStackTrace();  // Log detalhado para depuração
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a foto.");
        }
    } else if (file.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Arquivo de foto vazio.");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
    }
}


@GetMapping("/api/usuario/{codigo}/foto")
public void renderFotoUsuario(@PathVariable int codigo, HttpServletResponse response) throws IOException {
    Optional<UsuarioEntity> usuarioOptional = repository.findById(codigo);
    
    if (usuarioOptional.isPresent() && usuarioOptional.get().getFotoUsuario() != null) {
        // Converte Byte[] para byte[] manualmente
        Byte[] fotoUsuario = usuarioOptional.get().getFotoUsuario();
        byte[] byteArray = new byte[fotoUsuario.length];
        
        for (int i = 0; i < fotoUsuario.length; i++) {
            byteArray[i] = fotoUsuario[i];
        }

        String fotoUsuarioMimeType = usuarioOptional.get().getFotoUsuarioMimeType();
        response.setContentType(fotoUsuarioMimeType);
        InputStream is = new ByteArrayInputStream(byteArray);
        IOUtils.copy(is, response.getOutputStream());
    } else {
        response.setStatus(HttpStatus.NOT_FOUND.value());

}

}

    
    @PostMapping("/api/usuario/recuperar-senha")
    public String solicitarRecuperacaoSenha(@RequestParam String email) {
        UsuarioEntity usuario = repository.findByEmail(email);

        if (usuario == null) {
            return "Usuário não encontrado";
        }

        // Gerar um token único
        String token = UUID.randomUUID().toString();
        usuario.setResetPasswordToken(token);
        usuario.setTokenExpirationDate(LocalDateTime.now().plusHours(1)); // Expira em 1 hora
        repository.save(usuario);

        // Enviar e-mail com o link de recuperação de senha
        String resetUrl = "http://localhost:4200/nova-senha?token=" + token;
        // String resetUrl = "http://localhost:4200 .com /recuperar-senha?token=" + token; original, antes de modificar
        String mensagem = "Clique no link para redefinir sua senha: " + resetUrl;

        emailService.sendEmail(usuario.getEmail(), "Recuperação de Senha", mensagem);

        return "Instruções de recuperação de senha enviadas para o e-mail.";
    }


@PostMapping("/api/usuario/resetar-senha")
public ResponseEntity<String> redefinirSenha(@RequestBody ResetSenhaRequest request) {
    String token = request.getToken();
    String novaSenha = request.getNovaSenha();

    UsuarioEntity usuario = repository.findByResetPasswordToken(token);

    if (usuario == null || usuario.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido ou expirado");
    }

    // Atualizar a senha do usuário
    usuario.setSenha(novaSenha);
    usuario.setResetPasswordToken(null);
    usuario.setTokenExpirationDate(null);
    repository.save(usuario);

    return ResponseEntity.ok("Senha redefinida com sucesso");
}


@GetMapping("/api/usuario/validar-email")
public ResponseEntity<String> validarEmail(@RequestParam String token) {
    Optional<UsuarioEntity> usuario = repository.findByEmailValidationToken(token);
    if (usuario.isPresent()) {
        UsuarioEntity user = usuario.get();
        if (!user.isEmailValidated()) {
            user.setEmailValidated(true);
            user.setAtivo(true);
            repository.save(user);
            return ResponseEntity.ok("Email validado com sucesso! Click em Entrar para fazer login e aproveitar todos os nossos recursos!!!");
        } else {
            return ResponseEntity.badRequest().body("Email já validado.");
        }


    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token inválido ou expirado.");
}



}