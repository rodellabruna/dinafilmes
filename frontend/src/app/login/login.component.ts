import { Component, AfterViewInit  } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../cadastro/cadastro.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  mensagem: String = "";
  obj: Usuario = new Usuario;
  showError: boolean = false;
  
  constructor(private service: UsuarioService, private authService: AuthService, private router: Router) {}

  fazerLogin() {
    console.log('Login attempted with:', this.obj);
  
    try {
      this.authService.login(this.obj.email, this.obj.senhaAtual).subscribe(
        (retorno: Usuario) => {
          if (!retorno || !retorno.nomeUsuario) {
            // Se o login falhar por conta de email ou senha inválidos
            this.mensagem = 'Email ou senha inválidos!';
            this.showError = true;
            this.authService.setAuthentication(false); 
          } else if (retorno.ativo === false) {
            // Se o usuário estiver inativo
            this.mensagem = 'Usuário inativado da plataforma. Dúvidas entre em contato.';
            this.showError = true;
            this.authService.setAuthentication(false);
          } else {
            // Se o login for bem-sucedido e o usuário estiver ativo
            this.mensagem = 'Login bem-sucedido!';
            this.showError = false;
            this.authService.setAuthentication(true); 
            localStorage.setItem("nomeUsuario", retorno.nomeUsuario); 
            localStorage.setItem("email", retorno.email);
            localStorage.setItem("codigoUsuario", retorno.codigoUsuario?.toString());
            localStorage.setItem("dataCriacao", retorno.dataCriacao?.toString() || '');
            
            window.location.href = "/vitrine";
          }
        },
        (error) => {
          // Lidando com erros no servidor
          if (error.status === 403) {
            // Email não validado
            this.mensagem = 'Por favor, valide seu email para ativar sua conta.';
          } else if (error.status === 401) {
            // Email ou senha inválidos
            this.mensagem = 'Email ou senha inválidos!';
          } else {
            // Outros erros
            this.mensagem = 'Erro ao fazer login. Tente novamente mais tarde.';
          }
          this.showError = true;
          this.authService.setAuthentication(false);
        }
      );
    } catch {
      this.mensagem = "Ocorreu um erro, tente novamente mais tarde.";
      this.authService.setAuthentication(false);
    }
  }
  
  
  limparFormulario(): void {
    this.obj.email = '';
    this.obj.senhaAtual = '';
    this.mensagem = '';
    this.showError = false;
  }

}