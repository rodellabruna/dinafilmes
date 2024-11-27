import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-foto',
  templateUrl: './editar-foto.component.html',
  styleUrls: ['./editar-foto.component.css']
})
export class EditarFotoComponent {
  form: FormGroup;
  mensagem: String = "";
  showError: boolean = false;
  obj: Usuario = new Usuario();
  codigoUsuario: number = 0;
  selectedFile: File | null = null; 

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      fotoUsuario: ['', Validators.required],
  });
  }

  ngOnInit(){
    {
      const codigo = localStorage.getItem("codigoUsuario");     
      if (codigo) this.codigoUsuario = parseInt(codigo, 10); // Converter para número
    }
 }

  // Função para capturar o arquivo selecionado
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    const maxSizeInMB = 15; // Defina o tamanho máximo em MegaByte
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
        this.mensagem = `O arquivo selecionado é muito grande. O tamanho máximo permitido é ${maxSizeInMB}MB.`;
        this.showError = true;
        this.selectedFile = null; 
    } else {
        this.selectedFile = file;
        this.showError = false;
    }
}

  public alterarFoto() {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('fotoUsuario', this.selectedFile, this.selectedFile.name); // Adiciona o nome do arquivo
  
      this.usuarioService.uploadFoto(this.codigoUsuario, formData).subscribe(
        response => {
          console.log("Foto enviada com sucesso:", response);
          this.mensagem = "Foto alterada com sucesso!";
          this.showError = false;
  
          // Fecha o modal após o sucesso
          this.closeModal('myModal6');
          window.location.href = "/perfil";
        },
        (error: HttpErrorResponse) => {
          console.error("Erro ao enviar a foto:", error);
          this.mensagem = "Erro ao enviar a foto.";
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

