import { Component } from '@angular/core';
import { DenunciasService } from '../services/denuncias.service';
import { Denuncia, Filme, Comentario } from '../home/home.model';
import { ChangeDetectorRef } from '@angular/core';
import { FilmeService } from '../services/filme.service';
import { ComentariosService } from '../services/comentarios.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent {
  denuncias: Denuncia[] = [];
  comentario: Comentario = new Comentario();
  filme: Filme = new Filme();
  codigoComentario: number | null = null;
  codigoUsuario: number | null = null;
  codigoFilme: number | null = null;
  nomeFilme: string = "";
  comentarioEscrito: string = "";
  comentarios: { [key: number]: Comentario } = {};

  constructor(private denunciasService: DenunciasService, private cdr: ChangeDetectorRef, private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.carregarDenuncias();
  }

  carregarDenuncias() {
    this.denunciasService.carregarDenuncias().subscribe(
      (denuncias: Denuncia[]) => {
        this.denuncias = denuncias;
        this.cdr.detectChanges(); 
        console.log(this.denuncias); // Verifique o que está vindo do backend
        
        // Carregar comentários para cada denúncia e garantir que os campos de codigoUsuario e codigoFilme sejam preenchidos
        const comentariosParaCarregar = this.denuncias.map(denuncia => denuncia.codigoComentario);
        
        // Usar Promise.all para esperar que todos os comentários sejam carregados antes de continuar
        Promise.all(comentariosParaCarregar.map(codigoComentario => this.carregarComentario(codigoComentario)))
          .then(() => {
            console.log('Todos os comentários foram carregados e os dados de denúncias estão completos.');
          })
          .catch((error) => {
            console.error("Erro ao carregar comentários:", error);
          });
      },
      (error) => {
        console.error("Erro ao carregar denuncias:", error);
      }
    );
  }
  
  

  carregarComentario(codigoComentario: number) {
    this.comentariosService.carregarComentario(codigoComentario).subscribe(
      (comentario: Comentario) => {
        this.comentarios[codigoComentario] = comentario; // Armazena o comentário usando o código como chave
        const comentarioAtualizado = this.comentarios[codigoComentario];
        if (comentarioAtualizado) {
          // Agora podemos acessar o codigoUsuario e codigoFilme
          const denuncia = this.denuncias.find(d => d.codigoComentario === codigoComentario);
          if (denuncia) {
            this.cdr.detectChanges(); // Força a detecção de mudanças para garantir que a UI seja atualizada
          }
        }
      },
      (error) => {
        console.error(`Erro ao carregar comentário para o código ${codigoComentario}:`, error);
      }
    );
  }
  

  formatarData(dataInput: string | Date | null): string {
    if (!dataInput) {
      return 'Data inválida'; // ou outra string que preferir
    }
    const data = typeof dataInput === 'string' ? new Date(dataInput) : dataInput;
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}-${mes}-${ano} ${horas}:${minutos}`;
  }

  recusarDenuncia(codigoDenuncia: number): void {
    const denuncia = this.denuncias.find(d => d.codigoDenuncia === codigoDenuncia);

    if (denuncia) {
      // Atualize o estado da denúncia para refletir que foi recusada
      denuncia.resolvido = true;
      denuncia.denunciaAcatada = false; // ou seja, "não"
      
      // Força a detecção de mudanças para atualizar a UI
      this.cdr.detectChanges();
    }


    this.denunciasService.resolverDenuncia(codigoDenuncia).subscribe({
      next: (response) => {
        console.log(response); // Mensagem de sucesso
        // Atualizar a lista de denúncias para refletir a mudança no status
        this.carregarDenuncias();  // Carregar novamente as denúncias
      },
      error: (err) => {
        console.error('Erro ao resolver denúncia:', err);
      }
    });
  }

  resolverDenuncia(codigoDenuncia: number): void {

    const denuncia = this.denuncias.find(d => d.codigoDenuncia === codigoDenuncia);
  
    if (denuncia) {
      // Atualize o estado da denúncia para refletir que foi resolvida
      denuncia.resolvido = true;
      denuncia.denunciaAcatada = true; // ou seja, "sim"
      
      // Força a detecção de mudanças para atualizar a UI
      this.cdr.detectChanges();
    }

        this.denunciasService.moderarComentario(codigoDenuncia).subscribe({
          next: (response) => {
            console.log('Comentário moderado:', response);
            // Recarregar as denúncias ou atualizar a UI conforme necessário
            this.carregarDenuncias();
          },
          error: (err) => {
            console.error('Erro ao moderar comentário:', err);

    }});
  }



}
