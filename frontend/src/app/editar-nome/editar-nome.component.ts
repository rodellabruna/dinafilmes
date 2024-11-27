import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-nome',
  templateUrl: './editar-nome.component.html',
  styleUrls: ['./editar-nome.component.css']
})
export class EditarNomeComponent  {
  form: FormGroup;
  mensagem: String = "";
  showError: boolean = false;
  obj: Usuario = new Usuario();
  nomeUsuario: String = "";
  codigoUsuario: number = 0;
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      novoNome: ['', Validators.required],
  });
  }
  ngOnInit(){
    {
      const nome = localStorage.getItem("nomeUsuario");
      const codigo = localStorage.getItem("codigoUsuario");     
      if (nome) this.nomeUsuario = nome;
      if (codigo) this.codigoUsuario = parseInt(codigo, 10); // Converter para número
    }
 }

 public alterarNome() {
  if (this.form.valid) {
    const formData = this.form.value;

    // Carregar os dados completos do usuário, incluindo a senha
    this.usuarioService.carregar(this.codigoUsuario).subscribe(
      (usuario: Usuario) => {
        // Após o carregamento dos dados do usuário, criar o objeto atualizado
        const obj: Usuario = {
          nomeUsuario: formData.novoNome, // Novo nome
          email: usuario.email,           // Manter o email existente
          codigoUsuario: this.codigoUsuario,
          fotoUsuarioMimeType: usuario.fotoUsuarioMimeType,             // Manter a foto existente
          ativo: usuario.ativo,           // Manter o status ativo
          dataCriacao: usuario.dataCriacao, // Manter a data de criação
          dataAtualizacao: new Date(),     // Atualizar a data de atualização
          telefone: usuario.telefone,
          fotoUsuario: usuario.fotoUsuario,
          aviso1: false, 
          aviso2: false,
          admin: false
        };

        console.log("Dados enviados para o backend:", obj);

        // Agora enviar os dados atualizados para o backend
        this.usuarioService.alterar(obj).subscribe(
          response => {
            console.log("Resposta do backend:", response);

            // Atualizar o localStorage diretamente aqui, após sucesso no backend
            localStorage.setItem("nomeUsuario", obj.nomeUsuario);

            this.mensagem = "Nome alterado com sucesso!";
            console.log(this.mensagem);

            //Fechar o modal ou realizar outras ações de sucesso
            this.closeModal('myModal3');
            window.location.href = "/perfil";
          },
          (error: HttpErrorResponse) => {
            console.error("Erro ao alterar o nome:", error);
            this.mensagem = "Erro ao alterar o nome.";
            this.showError = true;
          }
        );
      },
      (error) => {
        console.error("Erro ao carregar os dados do usuário:", error);
        this.mensagem = "Erro ao carregar os dados do usuário.";
        this.showError = true;
      }
    );
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
