package com.dinafilmes.backend;

import org.springframework.stereotype.Component;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.IdClass;


@SuppressWarnings("unused")
@Entity
@Table(name = "lista", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"codigoFilme", "codigoUsuario"})
})
public class ListaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigoLista;
    private int codigoFilme;
    private int codigoUsuario;
    private boolean filmeFavorito;
    private boolean filmeAssistido;
    private boolean filmeAAssistir;
    
    public int getCodigoLista() {
        return codigoLista;
    }
    public int getCodigoFilme() {
        return codigoFilme;
    }
    public int getCodigoUsuario() {
        return codigoUsuario;
    }
    public boolean isFilmeFavorito() {
        return filmeFavorito;
    }
    public boolean isFilmeAssistido() {
        return filmeAssistido;
    }
    public boolean isFilmeAAssistir() {
        return filmeAAssistir;
    }
    public void setCodigoLista(int codigoLista) {
        this.codigoLista = codigoLista;
    }
    public void setCodigoFilme(int codigoFilme) {
        this.codigoFilme = codigoFilme;
    }
    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }
    public void setFilmeFavorito(boolean filmeFavorito) {
        this.filmeFavorito = filmeFavorito;
    }
    public void setFilmeAssistido(boolean filmeAssistido) {
        this.filmeAssistido = filmeAssistido;
    }
    public void setFilmeAAssistir(boolean filmeAAssistir) {
        this.filmeAAssistir = filmeAAssistir;
    }

   

       
}
