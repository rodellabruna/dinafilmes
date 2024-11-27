package com.dinafilmes.backend;

public class ComentarioDTO {
    private String comentario;
    private String nomeUsuario;
    private int codigoComentario;
    private int codigoUsuario;
    private boolean comSpoiler;
    private boolean apagadoOuModerado;

    public ComentarioDTO(int codigoComentario, int codigoUsuario, String comentario, String nomeUsuario, boolean comSpoiler, boolean apagadoOuModerado) {
        this.codigoComentario = codigoComentario;
        this.codigoUsuario = codigoUsuario;
        this.comentario = comentario;
        this.nomeUsuario = nomeUsuario;
        this.comSpoiler = comSpoiler;
        this.apagadoOuModerado = apagadoOuModerado;
    }
    
    public int getCodigoComentario() {
        return codigoComentario;
    }

    public int getCodigoUsuario() {
        return codigoUsuario;
    }
    public String getComentario() {
        return comentario;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public boolean isComSpoiler() {
        return comSpoiler;
    }

    public boolean isApagadoOuModerado() {
        return apagadoOuModerado;
    }

    public void setApagadoOuModerado(boolean apagadoOuModerado) {
        this.apagadoOuModerado = apagadoOuModerado;
    }


    
}

