import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Denuncia } from '../home/home.model';

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {
  private apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {}

 public carregarDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(`http://localhost:8081/api/denuncias`);
  }

  public inserir(denuncia: {
    usuarioDenunciante: number;
    tipoDenuncia: String;
    comentario: { codigoComentario: number };
    denunciaAcatada: null;

  }): Observable<string> {
    return this.http.post<string>('http://localhost:8081/api/denuncia', denuncia, { responseType: 'text' as 'json'});
  }

  public resolverDenuncia(codigoDenuncia: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}denuncia/${codigoDenuncia}`, { responseType: 'text' as 'json' });
  }

  public moderarComentario(codigoDenuncia: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}denuncia/${codigoDenuncia}/moderacao`,  { responseType: 'text' as 'json' });
  }


}

