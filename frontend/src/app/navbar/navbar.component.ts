import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../services/filme.service';
import { Router } from '@angular/router';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  foto: String = "";
  fotoPadrao: String = "/assets/padraPerfil.png";
  listaFilmes: any[] = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private filmeService: FilmeService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });

    this.authService.isAdmin$.subscribe(adminStatus => {
      this.isAdmin = adminStatus;
    });

    if (this.isAuthenticated) {
      const codigoUsuario = localStorage.getItem("codigoUsuario");
      if (codigoUsuario) {
        this.usuarioService.getFotoUsuario(+codigoUsuario).subscribe(
          (blob: Blob) => {
            const objectURL = URL.createObjectURL(blob);
            this.foto = objectURL;
          },
          (error) => {
            console.error("Erro ao carregar a foto:", error);
            this.foto = this.fotoPadrao; // Define uma imagem padrão caso ocorra erro
          }
        );
      }
    } else {
      this.foto = this.fotoPadrao; // Imagem padrão se não estiver autenticado
    }
    this.authService.checkLocalStorageForUser();
  }
 

  buscarFilme(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Faz o cast para HTMLInputElement
  const search = inputElement?.value || ''; // Se o valor for null ou undefined, usa uma string vazia
  
  if (search.length >= 3) { // Verifica se o usuário digitou pelo menos 3 caracteres
    this.filmeService.listar({ search, genero: '' }).subscribe(
      (filmes) => {
        this.listaFilmes = filmes;
        console.log('Filmes encontrados:', this.listaFilmes);
      },
      (error) => {
        console.error('Erro ao buscar filmes:', error);
      }
    );
  }
}

onSubmit(event: Event): void {
  event.preventDefault(); // Evita o recarregamento da página
  const inputElement = (event.target as HTMLFormElement).querySelector('#search') as HTMLInputElement;
  
  const search = inputElement?.value || ''; // Obtém o valor do input

  if (search.length >= 3) {
    // Redireciona para a página home com a query string de busca
    this.router.navigate(['/home'], { queryParams: { search } });
  }
}

  logout(): void {
    this.authService.logout(); // Atualiza o estado de autenticação para false
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("codigoUsuario");
    localStorage.removeItem("email");
    localStorage.removeItem("fotoUsuario");
    localStorage.removeItem("dataCriacao");
    localStorage.removeItem("usuario");
    window.location.href = "/vitrine"; 
  }

}
