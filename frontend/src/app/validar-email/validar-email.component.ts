import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
    selector: 'app-validar-email',
    template: `
        <div *ngIf="mensagem" class="alert alert-info">{{ mensagem }}</div>
    `
})
export class ValidarEmailComponent implements OnInit {
    mensagem: string = '';

    constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) {}

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('token');
        console.log("Token recebido para validação:", token); // Log para depuração
    
        if (token) {
            this.usuarioService.validarEmail(token).subscribe({
                next: (resposta: string) => {
                    console.log("Resposta do backend:", resposta); // Log da resposta
                    this.mensagem = resposta; // Define a mensagem diretamente com base na resposta do backend
                },
                error: (erro) => {
                    console.error("Erro ao validar o email:", erro); // Log do erro
                    if (erro.status === 400) {
                        this.mensagem = "Email já validado.";
                    } else if (erro.status === 404) {
                        this.mensagem = "Token inválido ou expirado.";
                    } else {
                        this.mensagem = "Erro inesperado ao validar o email.";
                    }
                }
            });
        } else {
            // Só define a mensagem se o token for realmente inválido
            console.log("Token inválido ou não fornecido.");
           
        }
    }
    
    
}
