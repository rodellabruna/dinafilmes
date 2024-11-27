package com.dinafilmes.backend;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@SuppressWarnings("unused")
@Entity
@Table(name = "filme")
public class FilmeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigoFilme;
    private String nomeFilme;
    private String genero;
    private String diretor;
    private String distribuidor;
    private String avaliacaoIMDB;
    private int anoLancamento;
    private String elenco;
    private String classificacaoIndicativa;
    private String ondeAssistir;
    private String foto;
    private String trailerUrl;
    private String paisDeOrigem;
    private String tempoFilme;
    
    public String getTempoFilme() {
        return tempoFilme;
    }
    public void setTempoFilme(String tempoFilme) {
        this.tempoFilme = tempoFilme;
    }
    public String getPaisDeOrigem() {
        return paisDeOrigem;
    }
    public void setPaisDeOrigem(String paisDeOrigem) {
        this.paisDeOrigem = paisDeOrigem;
    }
    @Column(length = 2550)
    private String sinopse;
    

    public String getClassificacaoIndicativa() {
        return classificacaoIndicativa;
    }
    public void setClassificacaoIndicativa(String classificacaoIndicativa) {
        this.classificacaoIndicativa = classificacaoIndicativa;
    }
      
    public String getSinopse() {
        return sinopse;
    }
    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }
    public String getNomeFilme() {
        return nomeFilme;
    }
    public void setNomeFilme(String nomeFilme) {
        this.nomeFilme = nomeFilme;
    }
    public String getDistribuidor() {
        return distribuidor;
    }
    public void setDistribuidor(String distribuidor) {
        this.distribuidor = distribuidor;
    }
    public String getAvaliacaoIMDB() {
        return avaliacaoIMDB;
    }
    public void setAvaliacaoIMDB(String avaliacaoIMDB) {
        this.avaliacaoIMDB = avaliacaoIMDB;
    }
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public int getCodigoFilme() {
        return codigoFilme;
    }
    public void setCodigoFilme(int codigoFilme) {
        this.codigoFilme = codigoFilme;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getDiretor() {
        return diretor;
    }
    public void setDiretor(String diretor) {
        this.diretor = diretor;
    }

    public int getAnoLancamento() {
        return anoLancamento;
    }
    public void setAnoLancamento(int anoLancamento) {
        this.anoLancamento = anoLancamento;
    }
    public String getElenco() {
        return elenco;
    }
    public void setElenco(String elenco) {
        this.elenco = elenco;
    }

    public String getOndeAssistir() {
        return ondeAssistir;
    }
    public void setOndeAssistir(String ondeAssistir) {
        this.ondeAssistir = ondeAssistir;
    }
    public String getTrailerUrl() {
        return trailerUrl;
    }
    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }
            
}
