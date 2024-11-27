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
@Table(name = "Likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"codigoFilme", "codigoUsuario", "codigoComentario"})
})

public class LikesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigoLike;
    private int codigoComentario;
    private int codigoUsuario;

    public int getCodigoLike() {
        return codigoLike;
    }
    public void setCodigoLike(int codigoLike) {
        this.codigoLike = codigoLike;
    }
    public int getCodigoComentario() {
        return codigoComentario;
    }
    public void setCodigoComentario(int codigoComentario) {
        this.codigoComentario = codigoComentario;
    }
    public int getCodigoUsuario() {
        return codigoUsuario;
    }
    public void setCodigoUsuario(int codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }


    
}
