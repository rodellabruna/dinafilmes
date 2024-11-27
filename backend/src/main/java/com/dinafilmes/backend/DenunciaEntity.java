package com.dinafilmes.backend;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import java.time.LocalDateTime;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;

@Entity
@Table(name = "denuncia")
public class DenunciaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigoDenuncia;

    @Enumerated(EnumType.STRING) 
    private TipoDenuncia tipoDenuncia;

    @ManyToOne
    @JoinColumn(name="codigoComentario", nullable=false)
    private ComentariosEntity comentario;

    @CreationTimestamp
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataResolucao;

    private boolean denunciaAcatada;

    private boolean resolvido;

    private int usuarioDenunciante;


    public int getUsuarioDenunciante() {
        return usuarioDenunciante;
    }
    public void setUsuarioDenunciante(int usuarioDenunciante) {
        this.usuarioDenunciante = usuarioDenunciante;
    }
    public boolean isDenunciaAcatada() {
        return denunciaAcatada;
    }
    public void setDenunciaAcatada(boolean denunciaAcatada) {
        this.denunciaAcatada = denunciaAcatada;
    }
    public int getCodigoDenuncia() {
        return codigoDenuncia;
    }
    public void setCodigoDenuncia(int codigoDenuncia) {
        this.codigoDenuncia = codigoDenuncia;
    }

    public ComentariosEntity getComentario() {
        return comentario;
    }
    public void setComentario(ComentariosEntity comentario) {
        this.comentario = comentario;
    }
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    public LocalDateTime getDataResolucao() {
        return dataResolucao;
    }
    public void setDataResolucao(LocalDateTime dataResolucao) {
        this.dataResolucao = dataResolucao;
    }
    public TipoDenuncia getTipoDenuncia() {
        return tipoDenuncia;
    }
    public void setTipoDenuncia(TipoDenuncia tipoDenuncia) {
        this.tipoDenuncia = tipoDenuncia;
    }
    public boolean isResolvido() {
        return resolvido;
    }
    public void setResolvido(boolean resolvido) {
        this.resolvido = resolvido;
    }

    
      
    
}
