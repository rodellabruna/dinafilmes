import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../cadastro/cadastro.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private authUrl = 'http://localhost:8081/api/usuario/login';

  constructor(private http: HttpClient) {}

  login(email: string, password?: string): Observable<any> {
    const user: Usuario = { email, senhaAtual: password, nomeUsuario: '', codigoUsuario: 0, ativo: true, dataAtualizacao: null, dataCriacao: null, fotoUsuario: null, fotoUsuarioMimeType: '', telefone: '', aviso1: false, aviso2: false, admin: false };
    
    return this.http.post<any>(this.authUrl, user).pipe(
      tap(response => {
        this.setAuthentication(true);
        this.setAdminStatus(response.admin); // Atualiza o estado de admin com base na resposta do login
        localStorage.setItem('admin', response.admin); // Salva o status de admin no localStorage
      })
    );
  }

  logout() {
    this.setAuthentication(false);
    this.setAdminStatus(false);
    localStorage.removeItem('admin'); // Remove o status de admin do localStorage
  }

  setAuthentication(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }

  checkLocalStorageForUser() {
    const codigoUsuario = localStorage.getItem("codigoUsuario");
    const isAdmin = localStorage.getItem("admin") === 'true';
    
    if (codigoUsuario) {
      this.setAuthentication(true);
      this.setAdminStatus(isAdmin); // Configura o estado de admin com base no localStorage
    } else {
      this.setAuthentication(false);
      this.setAdminStatus(false);
    }
  }
  
}
