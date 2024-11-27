import { Component, OnInit } from '@angular/core';
import { ListaService } from '../services/lista.service';
import { Filme } from '../home/home.model'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent {
  viewMode: 'grid' | 'list' = 'grid'; 
  favoritos: Filme[] = [];
  codigoUsuario: number = +localStorage.getItem('codigoUsuario')!;

  constructor(private listaService: ListaService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    this.listaService.carregarFavoritos(this.codigoUsuario).subscribe(
      (filmes: Filme[]) => {
        this.favoritos = filmes;
      },
      (error) => {
        console.error('Erro ao carregar favoritos:', error);
      }
    );
  }



  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.cdr.detectChanges();
  }
}