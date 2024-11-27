import { Component } from '@angular/core';
import { Usuario } from '../cadastro/cadastro.model';
import { UsuarioService } from '../services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(){
    this.usuarioService.carregarUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        console.log(this.usuarios);

      }
    )
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

  enviarAviso1(codigoUsuario: number){
    this.usuarioService.enviarAviso1(codigoUsuario).subscribe(
      (response) => {
        console.log('Aviso 1 enviado com sucesso!', response);
        alert('Aviso 1 enviado com sucesso!');
        this.carregarUsuarios(); 
      },
      (error) => {
        console.error('Erro ao enviar aviso 1:', error);
        alert('Ocorreu um erro. Tente novamente.');
      }
    );
  }

  enviarAviso2(codigoUsuario: number){
    this.usuarioService.enviarAviso2(codigoUsuario).subscribe(
      (response) => {
        console.log('Aviso 2 enviado com sucesso!', response);
        alert('Aviso 2 enviado com sucesso!');
        this.carregarUsuarios(); 
      },
      (error) => {
        console.error('Erro ao enviar aviso 2:', error);
        alert('Ocorreu um erro. Tente novamente.');
      }
    );

  }

  inativarUsuario(codigoUsuario: number){
    this.usuarioService.inativarUsuario(codigoUsuario).subscribe(
      (response) => {
        console.log('Aviso de inativado enviado com sucesso!', response);
        alert('Aviso de inativado enviado com sucesso!');
        this.carregarUsuarios(); 
      },
      (error) => {
        console.error('Erro ao enviar inativação:', error);
        alert('Ocorreu um erro. Tente novamente.');
      }
    );

  }

  reativarUsuario(codigoUsuario: number){
    this.usuarioService.reativarUsuario(codigoUsuario).subscribe(
      (response) => {
        console.log('Aviso de reativação enviado com sucesso!', response);
        alert('Aviso de reativação enviado com sucesso!');
        this.carregarUsuarios(); 
      },
      (error) => {
        console.error('Erro ao enviar reativar:', error);
        alert('Ocorreu um erro. Tente novamente.');
      }
    );

  }

}
