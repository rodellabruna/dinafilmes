package com.dinafilmes.backend;

import java.time.LocalDateTime;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;


@Entity
@Table(name = "usuario")
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int codigoUsuario;
    private String nomeUsuario;
    private String email;
    private String telefone;
    private String senha;
    @Transient
    private String senhaAtual;
    @Transient
    private String senhaNova;
    private boolean ativo;
    private boolean aviso1;
    private boolean aviso2;
    private boolean admin;
    private String emailValidationToken;
    private boolean emailValidated = false;

    @CreationTimestamp
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    @Lob
    @Column(name = "foto_usuario", columnDefinition = "LONGBLOB")
    private Byte[] fotoUsuario;

    private String fotoUsuarioMimeType;

    private String resetPasswordToken;
    private LocalDateTime tokenExpirationDate;
    
    @Column(name = "reset_password_token")

    public String getFotoUsuarioMimeType() {
        return fotoUsuarioMimeType;
    }
    public void setFotoUsuarioMimeType(String fotoUsuarioMimeType) {
        this.fotoUsuarioMimeType = fotoUsuarioMimeType;
    }
    public Byte[] getFotoUsuario() {
        return fotoUsuario;
    }
    public void setFotoUsuario(Byte[] fotoUsuario) {
        this.fotoUsuario = fotoUsuario;
    }

    public boolean isAtivo() {
        return ativo;
    }
    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
    public boolean isAviso1() {
        return aviso1;
    }
    public void setAviso1(boolean aviso1) {
        this.aviso1 = aviso1;
    }
    public boolean isAviso2() {
        return aviso2;
    }
    public void setAviso2(boolean aviso2) {
        this.aviso2 = aviso2;
    }

    public int getCodigoUsuario() {
        return codigoUsuario;
    }
    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }
    public String getNomeUsuario() {
        return nomeUsuario;
    }
    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String senhaCriptografada = encoder.encode(senha);
        this.senha = senhaCriptografada;
    }
    public void setSenhaJaCriptografada(String senhaCriptografada) {
        this.senha = senhaCriptografada;
    }
    public boolean checarSenha(String senhaAtual) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(senhaAtual, this.senha);
    }

    // Getters e Setters
    public String getSenhaNova() {
        return senhaNova;
    }

    public void setSenhaNova(String senhaNova) {
        this.senhaNova = senhaNova;
    }

    // Getters e Setters
    public String getSenhaAtual() {
        return senhaAtual;
    }

    public void setSenhaAtual(String senhaAtual) {
        this.senhaAtual = senhaAtual;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
}

public String getResetPasswordToken() {
            return resetPasswordToken;
        }
        public void setResetPasswordToken(String resetPasswordToken) {
            this.resetPasswordToken = resetPasswordToken;
        }
    
        public LocalDateTime getTokenExpirationDate() {
            return tokenExpirationDate;
        }
        public void setTokenExpirationDate(LocalDateTime tokenExpirationDate) {
            this.tokenExpirationDate = tokenExpirationDate;
    }
        public boolean isAdmin() {
            return admin;
        }
        public void setAdmin(boolean admin) {
            this.admin = admin;
        }

        public String getEmailValidationToken() {
            return emailValidationToken;
        }
        
        public void setEmailValidationToken(String emailValidationToken) {
            this.emailValidationToken = emailValidationToken;
        }
        
        public boolean isEmailValidated() {
            return emailValidated;
        }
        
        public void setEmailValidated(boolean emailValidated) {
            this.emailValidated = emailValidated;
        }

}