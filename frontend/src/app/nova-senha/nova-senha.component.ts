// import { Component } from '@angular/core';
// import { Usuario } from '../cadastro/cadastro.model';
// import { UsuarioService } from '../services/usuario.service';
// import { AuthService } from '../services/auth.services';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as bootstrap from 'bootstrap';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-nova-senha',
//   templateUrl: './nova-senha.component.html',
//   styleUrls: ['./nova-senha.component.css']
// })
// export class NovaSenhaComponent {

//   form: FormGroup;
//   mensagem: String = ""; 
//   showError: boolean = false;
//   obj: Usuario = new Usuario();
//   novaSenha: String = ""; 
//   senhaAntiga: String = ""; 
//   senha: String = ""; 
//   codigoUsuario: number = 0;
  
//   constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService) {
//     this.form = this.fb.group({
//       senhaAntiga: ['', Validators.required],
//       novaSenha: ['', Validators.required],
//       confirmaNovaSenha: ['', Validators.required],
//   }, { 
//     validators: this.passwordMatchValidator
//   });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     const senha = form.get('novaSenha')?.value;
//     const confirmPassword = form.get('confirmaNovaSenha')?.value;
//     return senha === confirmPassword ? null : { mismatch: true };
//   }

//   public alterarSenha() {
//     if (this.form.valid) {
//       const formData = this.form.value;
//       const codigoUsuario = localStorage.getItem("codigoUsuario");
  
//       // Verificar se o codigoUsuario não é nulo
//       if (codigoUsuario) {
//         console.log("Dado usuario", codigoUsuario);
  
//         this.usuarioService.carregar(parseInt(codigoUsuario, 10)).subscribe(
//           (usuario: Usuario) => {
//             console.log("Dados carregados do backend:", usuario);
//             if (usuario.senha === formData.senhaAntiga) {
//               // Senha antiga está correta, prosseguir com a alteração
//                 usuario.senha = formData.novaSenha,
//                 usuario.dataAtualizacao = new Date()
           

//               console.log("Dados enviados para o backend:", usuario);
  
//               this.usuarioService.alterar(usuario).subscribe(
//                 response => {
//                   console.log("Resposta do backend:", response);

//                   this.mensagem = "Senha alterada com sucesso!";
//                   console.log(this.mensagem);
//                   this.showError = false;
//                   this.closeModal('myModal10');
//                   window.location.href = "/perfil";
//                   },
//                 (error: HttpErrorResponse) => {
//                   console.error("Erro ao alterar a senha:", error);
//                   this.mensagem = "Erro ao alterar a senha.";
//                   this.showError = true;
//                 }
//               );
//             }}
//         );
           
//       }
//     }
//   }
  


// private closeModal(modalId: string) {
//   const modalElement = document.getElementById(modalId);
//   if (modalElement) {
//     const modal = bootstrap.Modal.getInstance(modalElement);
//     if (modal) {
//       modal.hide();
//     }
//   }
// }

// get isSubmitDisabled(): boolean {
//   return this.form.invalid || this.form.hasError('mismatch');
// }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service'; // ajuste o caminho conforme necessário
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
})
export class NovaSenhaComponent implements OnInit {
  form: FormGroup;
  showError = false;
  mensagem = '';
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.passwordComplexityValidator]],
      confirmaNovaSenha: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']; // Captura o token da URL
    });
  }

  passwordComplexityValidator(control: any) {
    const value = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const valid = hasLetter && hasNumber && hasSpecialChar;
    return valid ? null : { passwordComplexity: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const { novaSenha, confirmaNovaSenha } = group.controls;
    return novaSenha.value === confirmaNovaSenha.value ? null : { mismatch: true };
  }

  alterarSenha() {
    if (this.form.valid) {
      const novaSenha = this.form.value.novaSenha;
  
      this.usuarioService.redefinirSenha(this.token, novaSenha).subscribe(
        response => {
          // Redireciona para a página "/vitrine"
          this.router.navigate(['/vitrine']);
        },
        error => {
          this.router.navigate(['/vitrine']);
        }
      );
    }
  }

  get isSubmitDisabled(): boolean {
      return this.form.invalid || this.form.hasError('mismatch');
    }
}