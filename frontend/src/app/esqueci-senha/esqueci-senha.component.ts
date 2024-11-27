import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {

  form: FormGroup;
  mensagem: string = "";
  emailExistente: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // esqueciSenha() {
  //   const email = this.form.get('email')?.value;

  //   this.usuarioService.esquecisenha(email).subscribe(
      
  //   );
  // }

  // get isSubmitDisabled(): boolean {
  //   return this.form.invalid;
  // }

  esqueciSenha() {
    const email = this.form.get('email')?.value;
  
    // Chama o serviço para enviar o e-mail
    this.usuarioService.esquecisenha(email).subscribe(
      response => {
        // Define a mensagem de sucesso diretamente
        this.mensagem = 'Se o e-mail estiver correto você receberá um link para redefinir sua senha';
      },
      error => {
        // Define a mensagem de erro caso algo dê errado
        this.mensagem = 'Se o e-mail estiver correto você receberá um link para redefinir sua senha';
      }
    );
  }

  get isSubmitDisabled(): boolean {
      return this.form.invalid;
    }

}