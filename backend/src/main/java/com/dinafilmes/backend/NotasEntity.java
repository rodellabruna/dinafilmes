package com.dinafilmes.backend;

import org.springframework.stereotype.Component;

@Component
public class NotasEntity {

    private int codigoFilme;
    private int codigoUsuario;
    private int mediaNotas;
    public int getCodigoFilme() {
        return codigoFilme;
    }
    public void setCodigoFilme(int codigoFilme) {
        this.codigoFilme = codigoFilme;
    }
    public int getCodigoUsuario() {
        return codigoUsuario;
    }
    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }
    public int getMediaNotas() {
        return mediaNotas;
    }
    public void setMediaNotas(int mediaNotas) {
        this.mediaNotas = mediaNotas;
    }

    
    
}
