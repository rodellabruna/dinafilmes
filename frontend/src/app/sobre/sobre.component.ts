import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Para formulários reativos
import { ContatoService } from '../services/contato.service';  // Importando o serviço de contato

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {
  // Formulário reativo
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private contatoService: ContatoService  // Injeção do serviço ContatoService
  ) {
    // Criando o formulário reativo com as validações necessárias
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required]],  // Nome é obrigatório
      assunto: ['', [Validators.required]],  // Assunto é obrigatório
      mensagem: ['', [Validators.required, Validators.minLength(10)]]  // Mensagem é obrigatória e deve ter pelo menos 10 caracteres
    });
  }

  ngOnInit(): void {}

  // Método para enviar os dados do formulário para o backend
  onSubmit(): void {
    if (this.contatoForm.valid) {
      const contato = this.contatoForm.value;

      // Enviando o formulário para o backend via HTTP POST
      this.contatoService.registrarContato(contato).subscribe({
        next: (response: any) => {
          alert('Contato registrado com sucesso!');
          this.contatoForm.reset();  // Limpar o formulário após o envio
        },
        error: (error) => {
          alert('Erro ao enviar o contato: ' + error.message);
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
