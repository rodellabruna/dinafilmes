import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../cadastro/cadastro.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  codigoUsuario: number = 0;
  usuario: Usuario | null = null;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura o código do usuário da rota, se existir, e executa a pesquisa
    this.route.paramMap.subscribe(params => {
      const codigo = params.get('codigoUsuario');
      if (codigo) {
        this.codigoUsuario = +codigo;
        this.pesquisarUsuario(); // Dispara a pesquisa automaticamente
      }
    });
  }

  
  pesquisarUsuario(): void {
    if (this.codigoUsuario) {
      this.usuarioService.carregar(this.codigoUsuario).subscribe(
        (usuario: Usuario) => {
          if (usuario.codigoUsuario) {
            this.usuario = usuario;
          } else {
            this.usuario = null; // Usuário não encontrado
          }
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
          this.usuario = null;
        }
      );
    }
  }

  formatarData(dataInput: string | Date | null): string {
    if (!dataInput) {
      return '';
    }
    const data = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}-${mes}-${ano} ${horas}:${minutos}`;
  }

  enviarAviso1(codigoUsuario: number) {
    this.usuarioService.enviarAviso1(codigoUsuario).subscribe(() => {
      alert('Aviso 1 enviado com sucesso!');
      this.pesquisarUsuario();
    });
  }

  enviarAviso2(codigoUsuario: number) {
    this.usuarioService.enviarAviso2(codigoUsuario).subscribe(() => {
      alert('Aviso 2 enviado com sucesso!');
      this.pesquisarUsuario();
    });
  }

  inativarUsuario(codigoUsuario: number) {
    this.usuarioService.inativarUsuario(codigoUsuario).subscribe(() => {
      alert('Usuário inativado com sucesso!');
      this.pesquisarUsuario();
    });
  }

  reativarUsuario(codigoUsuario: number) {
    this.usuarioService.reativarUsuario(codigoUsuario).subscribe(() => {
      alert('Usuário reativado com sucesso!');
      this.pesquisarUsuario();
    });
  }
}
