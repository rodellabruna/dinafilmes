import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private apiUrl = 'http://localhost:8081/api/like';
  constructor(private http: HttpClient) {}

  public adicionarLike(codigoComentario: number, codigoUsuario: number): Observable<string> {
    const likeData = { codigoComentario, codigoUsuario }; 
    return this.http.post<string>(this.apiUrl, likeData, { responseType: 'text' as 'json' }); 
  }

  public removerLike(codigoComentario: number, codigoUsuario: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}`,{ body: { codigoComentario, codigoUsuario }, responseType: 'text' as 'json' });    
  }

  public contar(codigoComentario: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8081/api/like/contar?codigoComentario=${codigoComentario}`);
  }

  verificarCurtida(codigoComentario: number, codigoUsuario: number) {
    return this.http.get<boolean>(`http://localhost:8081/api/like/verificar?codigoComentario=${codigoComentario}&codigoUsuario=${codigoUsuario}`);

  }

}
