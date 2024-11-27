import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-senha',
  templateUrl: './editar-senha.component.html',
  styleUrls: ['./editar-senha.component.css']
})
export class EditarSenhaComponent  {
  form: FormGroup;
  mensagem: String = ""; 
  showError: boolean = false;
  obj: Usuario = new Usuario();
  novaSenha: String = ""; 
  senhaAntiga: String = ""; 
  senha: String = ""; 
  codigoUsuario: number = 0;
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService) {
    this.form = this.fb.group({
      senhaAntiga: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirmaNovaSenha: ['', Validators.required],
  }, { 
    validators: this.passwordMatchValidator
  });
  }

  passwordMatchValidator(form: FormGroup) {
    const senha = form.get('novaSenha')?.value;
    const confirmPassword = form.get('confirmaNovaSenha')?.value;
    return senha === confirmPassword ? null : { mismatch: true };
  }

  public alterarSenha() {
    if (this.form.valid) {
      const formData = this.form.value;
      const codigoUsuario = localStorage.getItem("codigoUsuario");
  
      // Verificar se o codigoUsuario não é nulo
      if (codigoUsuario) {
        console.log("Dado usuario", codigoUsuario);
  
        this.usuarioService.carregar(parseInt(codigoUsuario, 10)).subscribe(
          (usuario: Usuario) => {
            console.log("Dados carregados do backend:", usuario);
              usuario.senhaAtual = formData.senhaAntiga,
              usuario.senhaNova = formData.novaSenha,
              usuario.dataAtualizacao = new Date()
          
              console.log("Dados enviados para o backend:", usuario);
  
              this.usuarioService.alterar(usuario).subscribe(
                response => {
                  console.log("Resposta do backend:", response);

                  this.mensagem = "Senha alterada com sucesso!";
                  console.log(this.mensagem);
                  this.showError = false;
                  this.closeModal('myModal4');
                  window.location.href = "/perfil";
                  },
                (error: HttpErrorResponse) => {
                  console.error("Erro ao alterar a senha:", error);
                  this.mensagem = "Erro ao alterar a senha.";
                  this.showError = true;
                }
              );
            }
        );
           
      }
    }
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
