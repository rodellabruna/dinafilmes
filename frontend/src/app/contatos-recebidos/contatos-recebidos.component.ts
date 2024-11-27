import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../services/contato.service';
import { ChangeDetectorRef } from '@angular/core';
import { Contato } from '../home/home.model';

@Component({
  selector: 'app-contatos-recebidos',
  templateUrl: './contatos-recebidos.component.html',
  styleUrls: ['./contatos-recebidos.component.css']
})
export class ContatosRecebidosComponent implements OnInit {
  contatos: Contato[] = [];

  constructor(private contatoService: ContatoService, private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.contatoService.obterContatos().subscribe(
      (contatos: any[]) => {
        this.contatos = contatos;
        this.cdr.detectChanges(); 
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
        alert('Ocorreu um erro ao carregar os contatos.');
        
      }
    );
  }

  onClickMarcarComoLido(contato: Contato): void {
    const id = contato.id;  // Verifique o valor de 'codigo' aqui
    console.log('Código do contato a ser marcado como lido:', id);
    this.marcarComoLido(id);
  }

  marcarComoLido(id: number): void {
    
    console.log('Código do contato:', id);
    this.contatoService.marcarComoLido(id).subscribe(
      () => {
        alert('Contato marcado como lido!');
        this.carregarContatos(); // Recarregar os contatos
      },
      (error) => {
        console.error('Erro ao marcar como lido:', error);
        alert('Ocorreu um erro ao marcar o contato como lido.');
      }
    );
  }
}
