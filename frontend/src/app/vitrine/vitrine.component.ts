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
  generoSelecionado: string = '';
  palavraBuscada: string = '';
  listaTerror: Filme[] = [];
  listaAcao: Filme[] = [];
  listaComedia: Filme[] = [];
  listaFantasia: Filme[] = [];
  listaFiccao: Filme[] = [];
  listaDrama: Filme[] = [];
  listaMusical: Filme[] = [];
  listaAventura: Filme[] = [];
  listaRomance: Filme[] = [];
  listaDocumentario: Filme[] = [];
  listaSuspense: Filme[] = [];
  listaInfantil: Filme[] = [];


  constructor(private filmeService: FilmeService,
    private rotas: ActivatedRoute) {}

    ngOnInit(): void {
      this.rotas.queryParams
      .subscribe(params => {
        this.generoSelecionado = params['genero'] || '';
        this.palavraBuscada = params['search'];
        this.carregarFilmes(params['search'], params['genero']);
      }
    )}   

    public carregarFilmes(search: string, genero: string){
      this.filmeService.listar({ search, genero }).subscribe(
        (filme: Filme[]) => {
          this.lista = this.getRandomFilms(filme);
        },
      );

      this.filmeService.listar({ search, genero: 'Comedia' }).subscribe(
        (filmeComedia: Filme[]) => {
          this.listaComedia = this.getRandomFilms(filmeComedia); 
        }
      );

      this.filmeService.listar({ search, genero: 'Adrenalina' }).subscribe(
        (filmeAcao: Filme[]) => {
          this.listaAcao = this.getRandomFilms(filmeAcao); 
        }
      );

      this.filmeService.listar({ search, genero: 'Terror' }).subscribe(
        (filmeTerror: Filme[]) => {
          this.listaTerror = this.getRandomFilms(filmeTerror); 
        }
      );

      this.filmeService.listar({ search, genero: 'Fantasia' }).subscribe(
        (filmeFantasia: Filme[]) => {
          this.listaFantasia = this.getRandomFilms(filmeFantasia); 
        }
      );

      this.filmeService.listar({ search, genero: 'Ficção Científica' }).subscribe(
        (filmeFiccao: Filme[]) => {
          this.listaFiccao = this.getRandomFilms(filmeFiccao); 
        }
      );

      this.filmeService.listar({ search, genero: 'Drama' }).subscribe(
        (filmeDrama: Filme[]) => {
          this.listaDrama = this.getRandomFilms(filmeDrama); 
        }
      );

      this.filmeService.listar({ search, genero: 'Musical' }).subscribe(
        (filmeMusical: Filme[]) => {
          this.listaMusical = this.getRandomFilms(filmeMusical); 
        }
      );

      this.filmeService.listar({ search, genero: 'Aventura' }).subscribe(
        (filmeAventura: Filme[]) => {
          this.listaAventura = this.getRandomFilms(filmeAventura); 
        }
      );

      this.filmeService.listar({ search, genero: 'Romance' }).subscribe(
        (filmeRomance: Filme[]) => {
          this.listaRomance = this.getRandomFilms(filmeRomance); 
        }
      );

      this.filmeService.listar({ search, genero: 'Documentario' }).subscribe(
        (filmeDocumentario: Filme[]) => {
          this.listaDocumentario = this.getRandomFilms(filmeDocumentario); 
        }
      );

      this.filmeService.listar({ search, genero: 'Suspense' }).subscribe(
        (filmeSuspense: Filme[]) => {
          this.listaSuspense = this.getRandomFilms(filmeSuspense); 
        }
      );

      this.filmeService.listar({ search, genero: 'Infantil' }).subscribe(
        (filmeInfantil: Filme[]) => {
          this.listaInfantil = this.getRandomFilms(filmeInfantil); 
        }
      );

    }

    private getRandomFilms(filmes: Filme[]): Filme[] {
      // Embaralha a lista de filmes
      let shuffled = filmes.sort(() => 0.5 - Math.random());
  
      // Retorna apenas os primeiros 15 itens da lista embaralhada
      return shuffled.slice(0, 15);
    }


}
