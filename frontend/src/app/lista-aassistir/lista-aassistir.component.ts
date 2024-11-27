import { Component, OnInit } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { Filme } from '../home/home.model'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-aassistir',
  templateUrl: './lista-aassistir.component.html',
  styleUrls: ['./lista-aassistir.component.css']
})
export class ListaAAssistirComponent {
  viewMode: 'grid' | 'list' = 'grid'; 
  aassistir: Filme[] = [];
  codigoUsuario: number = +localStorage.getItem('codigoUsuario')!;

  constructor(private listaService: ListaService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.carregarAAssistir();
  }

  carregarAAssistir() {
    this.listaService.carregarAAssistir(this.codigoUsuario).subscribe(
      (filmes: Filme[]) => {
        this.aassistir = filmes;
      },
      (error) => {
        console.error('Erro ao carregar aassistir:', error);
      }
    );
  }



  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.cdr.detectChanges();
  }
}