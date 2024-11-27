import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../cadastro/cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/api/usuario'; // URL base do backend

  constructor(private http: HttpClient) {}

  public gravar(obj: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}`, obj);
  }

  public verificarEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-email`, { params: { email } });
  }

  public validarEmail(token: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/validar-email`, {
        params: { token },
        responseType: 'text' as 'json' // Força a resposta a ser tratada como texto
    });
  }

  public alterar(obj: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>("http://localhost:8081/api/usuario", obj, { responseType: 'text'  as 'json' });
  }

  public carregar(codigoUsuario: number): Observable<Usuario>{
    return this.http.get<Usuario>("http://localhost:8081/api/usuario/"+codigoUsuario);         
  }

  public remover(obj: Usuario): Observable<string> {
    return this.http.delete<string>("http://localhost:8081/api/usuario", { body: obj,  responseType: 'text' as 'json' });
  }

  public listar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8081/api/usuario/lista");         
  }

  public carregarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`http://localhost:8081/api/usuarios`);
  }

  public login(obj: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>
    ("http://localhost:8081/api/usuario/login", obj);         
  }

  uploadFoto(codigo: number, formData: FormData) {
    return this.http.post("http://localhost:8081/api/usuario/" + codigo +"/foto", formData, { responseType: 'text' });
  }

  getFotoUsuario(codigo: number): Observable<Blob> {
    return this.http.get(`http://localhost:8081/api/usuario/${codigo}/foto`, { responseType: 'blob' });
  }

  public esquecisenha(email: String){
    return this.http.post("http://localhost:8081/api/usuario/recuperar-senha?email="+email, { responseType: 'text' });   
  }

  redefinirSenha(token: string | null, novaSenha: string) {
    return this.http.post("http://localhost:8081/api/usuario/resetar-senha", { token, novaSenha });
  }

  enviarAviso1(codigo: number) {
    return this.http.put<number>(`http://localhost:8081/api/usuario/${codigo}/aviso1`, { responseType: 'text' });
  }
  enviarAviso2(codigo: number) {
    return this.http.put<number>(`http://localhost:8081/api/usuario/${codigo}/aviso2`, { responseType: 'text' });
  }
  inativarUsuario(codigo: number) {
    return this.http.put<number>(`http://localhost:8081/api/usuario/${codigo}/inativar`, { responseType: 'text' });
  }
  reativarUsuario(codigo: number){
    return this.http.put<number>(`http://localhost:8081/api/usuario/${codigo}/reativar`, { responseType: 'text' });
  }

  

}
