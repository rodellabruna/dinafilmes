package com.dinafilmes.backend;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;


@Entity
@Table(name = "comentarios")
public class ComentariosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigoComentario;

    @ManyToOne
    @JoinColumn(name="codigoUsuario", nullable=false)
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name="codigoFilme", nullable=false)
    private FilmeEntity filme;

    @Column(length = 500)
    private String comentario;

    private int codigoComentarioRespondido;
    private int quantidadeLikes;
    private boolean comSpoiler;

    @CreationTimestamp
    private LocalDateTime dataCriacao;

    private boolean apagadoOuModerado;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    public int getCodigoComentario() {
        return codigoComentario;
    }

    public void setCodigoComentario(int codigoComentario) {
        this.codigoComentario = codigoComentario;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public FilmeEntity getFilme() {
        return filme;
    }

    public void setFilme(FilmeEntity filme) {
        this.filme = filme;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public int getCodigoComentarioRespondido() {
        return codigoComentarioRespondido;
    }

    public void setCodigoComentarioRespondido(int codigoComentarioRespondido) {
        this.codigoComentarioRespondido = codigoComentarioRespondido;
    }

    public int getQuantidadeLikes() {
        return quantidadeLikes;
    }

    public void setQuantidadeLikes(int quantidadeLikes) {
        this.quantidadeLikes = quantidadeLikes;
    }

    public boolean isComSpoiler() {
        return comSpoiler;
    }

    public void setComSpoiler(boolean comSpoiler) {
        this.comSpoiler = comSpoiler;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public boolean isApagadoOuModerado() {
        return apagadoOuModerado;
    }

    public void setApagadoOuModerado(boolean apagadoOuModerado) {
        this.apagadoOuModerado = apagadoOuModerado;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

}

