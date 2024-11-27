import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario = new Usuario;
  nomeUsuario: String = "";
  email: String ="";
  dataCriacao: String = "";
  foto: String = "";
  fotoPadrao: String = "/assets/usuario-de-perfil.png";

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    const nome = localStorage.getItem("nomeUsuario");
    const email = localStorage.getItem("email");
    const dataCriacao = localStorage.getItem("dataCriacao");
    const codigoUsuario = localStorage.getItem("codigoUsuario");
  
    if (nome) this.nomeUsuario = nome;
    if (email) this.email = email;
    if (dataCriacao) this.dataCriacao = new Date(dataCriacao).toLocaleDateString();
    
    if (codigoUsuario) {
      this.usuarioService.getFotoUsuario(+codigoUsuario).subscribe(
        (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.foto = objectURL;
        },
        (error) => {
          console.error("Erro ao carregar a foto:", error);
          this.foto = "/assets/usuario-de-perfil.png"; // Define uma imagem padrão caso ocorra erro
        }
      );
    }}
  

  private formatDate(date: Date): string {
    // Formatando a data no formato desejado (ex: dd/mm/yyyy)
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

}
