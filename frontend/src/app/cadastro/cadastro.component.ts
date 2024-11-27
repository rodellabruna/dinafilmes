import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Usuario } from './cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements AfterViewInit {
    form: FormGroup;
    mensagem: string = "";
    showError: boolean = false;
    emailExistente: boolean = false;

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private rotas: ActivatedRoute
    ) {
        this.form = this.fb.group({
            nomeUsuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.passwordComplexityValidator]],
            confirmPassword: ['', Validators.required],
            agreement: [false, Validators.requiredTrue]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    // Implementação obrigatória da interface AfterViewInit
    ngAfterViewInit(): void {
        //this.initModal('myModal');      // Modal de Criar Conta
        //.this.initModal('successModal'); // Modal de Sucesso
    }

    // Método para fechar um modal
    public closeModal(modalId: string): void {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const focusedElement = modalElement.querySelector(':focus') as HTMLElement;
            if (focusedElement) {
                focusedElement.blur();
            }

            // Remove o foco de qualquer elemento dentro do modal
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            if (modalInstance) {
                (modalInstance as any)._isShown  = true // hack
                modalInstance.hide(); // Esconde o modal
            }

            const modalBackdrops = document.getElementsByClassName("modal-backdrop");

            // Converter em array para iterar
            Array.from(modalBackdrops).forEach(element => {
                element.remove(); // Remove o elemento do DOM
            });
        }
    }

    // Método para abrir um modal
    public openModal(modalId: string): void {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show(); // Abre o modal
        }
    }

    passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
        const senha = form.get('senha')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return senha === confirmPassword ? null : { mismatch: true };
    }

    passwordComplexityValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
        const password = control.value;
        if (!password) return null;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);
        return hasLetter && hasNumber && hasSpecialChar ? null : { 'passwordComplexity': true };
    };

    public cadastrar() {
        if (this.form.valid) {
            const formData = this.form.value;
            this.usuarioService.verificarEmail(formData.email).subscribe(existe => {
                if (existe) {
                    this.emailExistente = true;
                    this.mensagem = "O e-mail já está em uso.";
                    return;
                } else {
                    this.emailExistente = false;
                    const obj: Usuario = {
                        nomeUsuario: formData.nomeUsuario,
                        email: formData.email,
                        senhaNova: formData.senha,
                        codigoUsuario: 0,
                        ativo: true,
                        dataCriacao: new Date(),
                        dataAtualizacao: new Date(),
                        fotoUsuarioMimeType: formData.fotoUsuarioMimeType,
                        fotoUsuario: formData.fotoUsuario,
                        telefone: formData.telefone,
                        aviso1: false, 
                        aviso2: false,
                        admin: false 
                    };

                    this.usuarioService.gravar(obj).subscribe({
                        next: () => {
                            this.mensagem = "Cadastro realizado com sucesso! Verifique seu email para validar a conta.";
                            this.closeModal('myModal');
                            this.openModal('successModal');
                        },
                        error: (error) => {
                            console.error("Erro ao cadastrar:", error);
                            this.mensagem = "Erro ao realizar o cadastro.";
                        }
                    });
                }
            });
        }
    }



    get isSubmitDisabled(): boolean {
        return this.form.invalid || this.form.hasError('mismatch');
    }

}

