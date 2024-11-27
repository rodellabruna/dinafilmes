import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../home/home.model';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private apiUrl = 'http://localhost:8081/api/filme';
  constructor(private http: HttpClient) {}

  public gravar(obj: Filme) {          
    this.http.post<String>("http://localhost:8081/api/filme", obj)
    .subscribe();        
  }
  
  public alterar(obj: Filme) {          
    this.http.put<String>("http://localhost:8081/api/filme", obj)
    .subscribe();        
  }

  public carregar(codigoFilme: number): Observable<Filme> {
    return this.http.get<Filme>(`${this.apiUrl}/${codigoFilme}`);         
  }

  public remover(codigoFilme: number) {
    return this.http.delete<String>(`${this.apiUrl}/${codigoFilme}`).subscribe();    
  }

  public listar({ search, genero }: { search: any; genero: any }): Observable<Filme[]> {
    return this.http.get<Filme[]>(`${this.apiUrl}?search=${search || ""}&categoria=${genero || ""}`);         
  }
  
  public exibir(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);         
  }

  // Novo método para buscar o trailer
  public buscarTrailer(codigoFilme: number): Observable<{ trailerUrl: string }> {
    return this.http.get<{ trailerUrl: string }>(`${this.apiUrl}/${codigoFilme}/trailer`);
  }
}
