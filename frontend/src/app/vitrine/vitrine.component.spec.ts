import { Component, OnInit } from '@angular/core';
import { Filme } from './vitrine.model';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit{
  lista: Filme[] = [];
  categoriaSelecionada: string = '';
  palavraBuscada: string = '';


  constructor(private filmeService: FilmeService,
    private rotas: ActivatedRoute) {}

    ngOnInit(): void {
      this.rotas.queryParams
      .subscribe(params => {
        this.categoriaSelecionada = params['categoria'] || '';
        this.palavraBuscada = params['search'];
        this.carregar(params['search'], params['categoria']);
      }
    )}   

    public carregar(search: string, genero: string){
      this.filmeService.listar({ search, genero }).subscribe(
        (filme: Filme[]) => {
          this.lista = filme;
        },
      )
    }

}