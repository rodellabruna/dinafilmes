import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../home/home.model'; 

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  

  private apiUrl = 'http://localhost:8081/api/lista';

  constructor(private http: HttpClient) {}

    favoritarFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeFavorito: true
      };
      return this.http.put<any>(this.apiUrl + '/favoritar', listaEntity);
    }  

    verificarFilmeFavorito(codigoFilme: number, codigoUsuario: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/favorito?codigoUsuario=${codigoUsuario}&codigoFilme=${codigoFilme}`);
    }

    carregarFavoritos(codigoUsuario: number): Observable<Filme[]> {
      return this.http.get<Filme[]>(`http://localhost:8081/api/favoritos?codigoUsuario=${codigoUsuario}`);
    }

    desfavoritarFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      // Criar uma entidade temporária com as informações necessárias
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeFavorito: false // Apenas indicando que estamos desfavoritando
      };
      
      // Supondo que o endpoint para desfavoritar é o mesmo, mas você deve adaptar se necessário
      return this.http.put<any>(`${this.apiUrl}/desfavoritar`, listaEntity);
    }

    




    assistirFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeAssistido: true
      };
      return this.http.put<any>(this.apiUrl + '/assistir', listaEntity);
    }  

    verificarFilmeAssistido(codigoFilme: number, codigoUsuario: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/assistido?codigoUsuario=${codigoUsuario}&codigoFilme=${codigoFilme}`);
    }

    carregarAssistidos(codigoUsuario: number): Observable<Filme[]> {
      return this.http.get<Filme[]>(`http://localhost:8081/api/assistidos?codigoUsuario=${codigoUsuario}`);
    }

    desassistirFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      // Criar uma entidade temporária com as informações necessárias
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeAssistido: false // Apenas indicando que estamos desassistindo um filme
      };
      
      // Supondo que o endpoint para desassistir é o mesmo, mas você deve adaptar se necessário
      return this.http.put<any>(`${this.apiUrl}/desassistir`, listaEntity);
    }








    
    aassistirFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeAAssistir: true
      };
      return this.http.put<any>(this.apiUrl + '/aassistir', listaEntity);
    }  

    verificarFilmeAAssistir(codigoFilme: number, codigoUsuario: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/aassistir?codigoUsuario=${codigoUsuario}&codigoFilme=${codigoFilme}`);
    }

    carregarAAssistir(codigoUsuario: number): Observable<Filme[]> {
      return this.http.get<Filme[]>(`http://localhost:8081/api/aassistir?codigoUsuario=${codigoUsuario}`);
    }

    desaassistirFilme(codigoFilme: number, codigoUsuario: number): Observable<any> {
      // Criar uma entidade temporária com as informações necessárias
      const listaEntity = {
        codigoFilme: codigoFilme,
        codigoUsuario: codigoUsuario,
        filmeAAssistir: false // Apenas indicando que estamos desaassistindo um filme
      };
      
      // Supondo que o endpoint para desassistir é o mesmo, mas você deve adaptar se necessário
      return this.http.put<any>(`${this.apiUrl}/desaassistir`, listaEntity);
    }

    
   

    
    
    
}
