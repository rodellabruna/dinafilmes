import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

interface Contato {
  nome: string;
  assunto: string;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8081/api/contato';  // URL do backend

  constructor(private http: HttpClient) { }

  // Método para enviar o contato para o backend
  registrarContato(contato: Contato): Observable<any> {
    return this.http.post(this.apiUrl, contato, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Erro ao enviar o contato:', error);
        return throwError(() => new Error('Erro ao enviar o contato.'));
      })
    );
  }
  // Método para obter a lista de contato do backend
  obterContatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao obter os contatos:', error);
        return throwError(() => new Error('Erro ao obter os contatos.'));
      })
    );
  }

  // Método para marcar um contato como lido
  marcarComoLido(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, null, { responseType: 'text'});
  }
}
