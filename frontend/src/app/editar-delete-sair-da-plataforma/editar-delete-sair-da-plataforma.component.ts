import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-delete-sair-da-plataforma',
  templateUrl: './editar-delete-sair-da-plataforma.component.html',
  styleUrls: ['./editar-delete-sair-da-plataforma.component.css']
})
export class EditarDeleteSairDaPlataformaComponent {
  form: FormGroup;
  mensagem: String = ""; 
  showError: boolean = false;
  obj: Usuario = new Usuario();
  senhaAtual: String = ""; 
  codigoUsuario: number = 0;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService) {
    this.form = this.fb.group({
      senhaAtual: ['', Validators.required],
  },);
  }

  public inativarUsuario() {
    if (this.form.valid) {
      const formData = this.form.value;
      const codigoUsuario = localStorage.getItem("codigoUsuario");
  
      // Verificar se o codigoUsuario não é nulo
      if (codigoUsuario) {
        console.log("Dado usuario", codigoUsuario);
  
        this.usuarioService.carregar(parseInt(codigoUsuario, 10)).subscribe(
          (usuario: Usuario) => {
            console.log("Dados carregados do backend:", usuario);
            usuario.senhaAtual = this.form.get("senhaAtual")?.value;
           
            console.log("Dados enviados para o backend:", usuario);
            this.usuarioService.remover(usuario).subscribe(
              response => {
                console.log("Resposta do backend:", response);
                this.mensagem = "Usuario inativado com sucesso!";
                console.log(this.mensagem);
                this.showError = false;
                this.closeModal('myModal5');
                window.location.href = "/vitrine";
                this.logout();
                },
              (error: HttpErrorResponse) => {
                console.error("Erro ao inativar", error);
                this.mensagem = error.error;
                this.showError = true;
              }
            );
          }
        );
      }
    }
  }
  

logout(): void {
    this.authService.logout(); // Atualiza o estado de autenticação para false
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("codigoUsuario");
    localStorage.removeItem("email");
    localStorage.removeItem("foto");
    localStorage.removeItem("dataCriacao");
    localStorage.removeItem("usuario");
    window.location.href = "/"; 
  }


private closeModal(modalId: string) {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }
}

get isSubmitDisabled(): boolean {
  return this.form.invalid || this.form.hasError('mismatch');
}

}
