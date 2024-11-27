import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../home/home.model';


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {}

 public carregarComentarios(codigoFilme: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`http://localhost:8081/api/comentarios?codigoFilme=${codigoFilme}`);
  }

  public carregarComentario(codigoComentario: number): Observable<Comentario> {
    return this.http.get<Comentario>(`http://localhost:8081/api/comentario/${codigoComentario}`);
}

  public inserir(comentario: {
    usuario: { codigoUsuario: number };
    filme: { codigoFilme: number };
    comentario: string;
  }): Observable<string> {
    return this.http.post<string>('http://localhost:8081/api/comentario', comentario, { responseType: 'text' as 'json'});
  }

  public contar(codigoFilme: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8081/api/comentarios/contar?codigoFilme=${codigoFilme}`);
  }

  public remover(codigo: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}comentario/${codigo}`, { responseType: 'text' as 'json' });
  }

  public ocultar(codigo: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}comentario/${codigo}`, null, { responseType: 'text' as 'json' });
  }


}


