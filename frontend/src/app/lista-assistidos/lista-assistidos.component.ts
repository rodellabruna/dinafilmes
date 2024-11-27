import { Component, OnInit } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { Filme } from '../home/home.model'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-assistidos',
  templateUrl: './lista-assistidos.component.html',
  styleUrls: ['./lista-assistidos.component.css']
})
export class ListaAssistidosComponent {
  viewMode: 'grid' | 'list' = 'grid'; 
  assistidos: Filme[] = [];
  codigoUsuario: number = +localStorage.getItem('codigoUsuario')!;

  constructor(private listaService: ListaService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.carregarAssistidos();
  }

  carregarAssistidos() {
    this.listaService.carregarAssistidos(this.codigoUsuario).subscribe(
      (filmes: Filme[]) => {
        this.assistidos= filmes;
      },
      (error) => {
        console.error('Erro ao carregar assistidos:', error);
      }
    );
  }



  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.cdr.detectChanges();
  }
}