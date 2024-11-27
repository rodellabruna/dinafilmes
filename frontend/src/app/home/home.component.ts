import { Component, OnInit } from '@angular/core';
import { Filme } from './home.model';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  lista: Filme[] = [];
  generoSelecionado: string = '';
  palavraBuscada: string = '';


  constructor(private filmeService: FilmeService,
    private rotas: ActivatedRoute) {}

    ngOnInit(): void {
      this.rotas.queryParams
      .subscribe(params => {
        this.palavraBuscada = params['search'] || '';
        this.generoSelecionado = params['genero'] || '';
        this.carregar(params['search'], params['genero']);
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
