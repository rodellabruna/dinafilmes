package com.dinafilmes.backend;

import java.time.LocalDateTime;

public class DenunciaDTO {
    private int codigoDenuncia;
    private TipoDenuncia tipoDenuncia;
    private int codigoComentario;
    private boolean denunciaAcatada;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataResolucao;
    private int usuarioDenunciante;
    private boolean resolvido;
    private int codigoUsuario;  // Dados de Comentario
    private int codigoFilme;    // Dados de Comentario
    
    public DenunciaDTO(int codigoDenuncia, TipoDenuncia tipoDenuncia, int codigoComentario, boolean denunciaAcatada, LocalDateTime dataCriacao, LocalDateTime dataResolucao, int usuarioDenunciante, boolean resolvido, int codigoUsuario, int codigoFilme) {
        this.codigoDenuncia = codigoDenuncia;
        this.tipoDenuncia = tipoDenuncia;
        this.codigoComentario = codigoComentario;
        this.denunciaAcatada = denunciaAcatada;
        this.dataCriacao = dataCriacao;
        this.dataResolucao = dataResolucao;
        this.usuarioDenunciante = usuarioDenunciante;
        this.resolvido = resolvido;
        this.codigoUsuario = codigoUsuario;
        this.codigoFilme = codigoFilme;
    }

    public int getCodigoDenuncia() {
        return codigoDenuncia;
    }

    public TipoDenuncia getTipoDenuncia() {
        return tipoDenuncia;
    }

    public int getCodigoComentario() {
        return codigoComentario;
    }

    public boolean isDenunciaAcatada() {
        return denunciaAcatada;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public LocalDateTime getDataResolucao() {
        return dataResolucao;
    }

    public int getUsuarioDenunciante() {
        return usuarioDenunciante;
    }

    public void setCodigoDenuncia(int codigoDenuncia) {
        this.codigoDenuncia = codigoDenuncia;
    }

    public void setTipoDenuncia(TipoDenuncia tipoDenuncia) {
        this.tipoDenuncia = tipoDenuncia;
    }

    public void setCodigoComentario(int codigoComentario) {
        this.codigoComentario = codigoComentario;
    }

    public void setDenunciaAcatada(boolean denunciaAcatada) {
        this.denunciaAcatada = denunciaAcatada;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setDataResolucao(LocalDateTime dataResolucao) {
        this.dataResolucao = dataResolucao;
    }

    public void setUsuarioDenunciante(int usuarioDenunciante) {
        this.usuarioDenunciante = usuarioDenunciante;
    }

    public int getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(Integer codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public int getCodigoFilme() {
        return codigoFilme;
    }

    public void setCodigoFilme(Integer codigoFilme) {
        this.codigoFilme = codigoFilme;
    }

    public boolean isResolvido() {
        return resolvido;
    }

    public void setResolvido(boolean resolvido) {
        this.resolvido = resolvido;
    }

    
    


}


