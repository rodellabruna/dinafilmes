import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filme, Comentario } from '../home/home.model';
import { FilmeService } from '../services/filme.service';
import { ListaService } from '../services/lista.service';
import { ComentariosService } from '../services/comentarios.service';
import { LikesService } from '../services/likes.service';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import { DenunciasService } from '../services/denuncias.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-tela-filme',
  templateUrl: './tela-filme.component.html',
  styleUrls: ['./tela-filme.component.css']
})
export class TelaFilmeComponent implements OnInit, AfterViewInit {

  filme: Filme = new Filme();
  mensagem: string = "";
  codigoUsuario: number | null = null;
  codigoFilme: number | null = null;
  codigoComentario: number | null = null;
  filmeFavoritado: boolean = false;
  carregandoFavorito: boolean = true;
  filmeAssistido: boolean = false;
  carregandoAssistido: boolean = true;
  filmeAAssistir: boolean = false;
  carregandoAAssistir: boolean = true;
  trailerUrl!: string;

  @ViewChild('trailerIframe', { static: false }) trailerIframe: ElementRef | undefined;

  filmeAAssisitr: boolean = false;
  filmeAssistir: boolean = false;
  isAuthenticated: boolean = false;

  comentarios: Comentario[] = [];
  qtddComentarios: number = 0;
  qtddLikes: number = 0;

  comentarioForm: FormGroup;
  novoComentario: string = "";
  exibirSpoilers = false;

  foto: String = "";
  fotoPadrao: String = "/assets/padraPerfil.png";

  likes: { [codigoComentario: number]: boolean } = {};

  limiteCaracteres: number = 500;
  caracteresRestantes: number = this.limiteCaracteres;

  tipoDenuncia: string = '';

     constructor(private denunciaService: DenunciasService, private usuarioService: UsuarioService, private likesService: LikesService, private filmeService: FilmeService, private comentariosService: ComentariosService, private route: ActivatedRoute, private listaService: ListaService, private cdr: ChangeDetectorRef, private authService: AuthService, private fb: FormBuilder ) {
    this.comentarioForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(1)]], 
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const codigoFilmeRaw = params.get('codigoFilme');
      if (codigoFilmeRaw == null) {
        console.error('Codigo invalido');
        return;
      }

      this.codigoFilme = +codigoFilmeRaw;
      if (isNaN(this.codigoFilme)) {
        console.error('Codigo invalido');
        return;
      }

      this.carregarFilme(this.codigoFilme);
      this.carregarComentarios(this.codigoFilme);
      this.carregarQuantidadeComentarios(this.codigoFilme);
      this.codigoUsuario = +localStorage.getItem('codigoUsuario')!;
      this.authService.isAuthenticated$.subscribe(authStatus => {
        this.isAuthenticated = authStatus; // Atualiza o estado de autenticação
      });
    })
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Garante que todas as mudanças sejam detectadas após a view estar inicializada

    const modalElement = document.getElementById('trailerModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.pararTrailer();  // Chama a função para parar o trailer quando o modal for fechado
      });
    }
  }

    carregarFilme(codigoFilme: number) {
        this.filmeFavoritado = false;  // Limpar o estado anterior
        this.carregandoFavorito = true;
        this.filmeAssistido = false;  // Limpar o estado anterior
        this.carregandoAssistido = true;
        this.filmeAAssistir= false;  // Limpar o estado anterior
        this.carregandoAAssistir = true;
        this.route.paramMap.subscribe((params) => {
          const codigoFilme = params.get('codigoFilme');
          if (codigoFilme !== null) {
            const codigoFilmeParsed = +codigoFilme;
            if (!isNaN(codigoFilmeParsed)) {
              this.filmeService.carregar(codigoFilmeParsed).subscribe(
                (filme: Filme) => {
                  this.filme = filme;
                  this.verificarSeFavorito(codigoFilmeParsed);
                  this.verificarSeAssistido(codigoFilmeParsed);
                  this.verificarSeAAssistir(codigoFilmeParsed);
                },
                (error) => {
                  console.error('Erro ao carregar o filme:', error);
                }
              );
            }
          }
        });
      }

  pararTrailer() {
    if (this.trailerIframe && this.trailerIframe.nativeElement) {
      const iframe: HTMLIFrameElement = this.trailerIframe.nativeElement;
      const iframeSrc = iframe.src;
      iframe.src = '';  // Remove o src para parar o vídeo
      iframe.src = iframeSrc;  // Restaura o src para que o vídeo possa ser carregado novamente, se necessário
    }
  }

   verificarSeFavorito(codigoFilme: number) {
    if (this.codigoUsuario) {
      this.listaService.verificarFilmeFavorito(codigoFilme, this.codigoUsuario).subscribe(
        (isFavorito: boolean) => {
          console.log("Resultado da verificação de favorito:", isFavorito);
          this.filmeFavoritado = isFavorito; // Atualiza o estado do favorito
          if (isFavorito) {
            this.filmeFavoritado = true;
          } else {
            this.filmeFavoritado = false;
          }
          this.carregandoFavorito = false;
          this.cdr.detectChanges();
          console.log("Resultado da verificação 2 de favorito:", isFavorito);
        },
        (error) => {
          console.error('Erro ao verificar se o filme é favorito:', error);
          this.carregandoFavorito = false;
          this.cdr.detectChanges(); 
        }
      );
    }
  }

  favoritarFilme() {
    if (this.codigoUsuario && this.filme.codigoFilme) {
      if (this.filmeFavoritado) {
        this.listaService.desfavoritarFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeFavoritado = false;
            this.mensagem = "Filme desfavoritado com sucesso!";
          },
          (error) => {
            console.error("Erro ao desfavoritar o filme:", error);
            this.mensagem = "Erro ao desfavoritar o filme.";
          }
        );
      } else {
        this.listaService.favoritarFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeFavoritado = true;
            this.mensagem = "Filme favoritado com sucesso!";
          },
          (error) => {
            console.error("Erro ao favoritar o filme:", error);
            this.mensagem = "Erro ao favoritar o filme.";
          }
        );
      }
    }
  }

    
 
  verificarSeAssistido(codigoFilme: number) {
    if (this.codigoUsuario) {
      this.listaService.verificarFilmeAssistido(codigoFilme, this.codigoUsuario).subscribe(
        (isAssistido: boolean) => {
          console.log("Resultado da verificação de assistido:", isAssistido);
          this.filmeAssistido = isAssistido; // Atualiza o estado do assistido
          if (isAssistido) {
            this.filmeAssistido = true;
          } else {
            this.filmeAssistido = false;
          }
          this.carregandoAssistido = false;
          this.cdr.detectChanges();
          console.log("Resultado da verificação 2 de assistido:", isAssistido);
        },
        (error) => {
          console.error('Erro ao verificar se o filme é assistido:', error);
          this.carregandoAssistido = false;
          this.cdr.detectChanges(); 
        }
      );
    }
  }


  assistirFilme() {
    if (this.codigoUsuario && this.filme.codigoFilme) {
      if (this.filmeAssistido) {
        this.listaService.desassistirFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeAssistido = false; // Atualiza o estado do assistido
            this.mensagem = "Filme retirado de lista com sucesso!";
            // Remover a chamada à verificação, pois já sabemos que foi desassistido
          },
          (error) => {
            console.error("Erro ao retirar o filme da lista:", error);
            this.mensagem = "Erro ao retirar o filme da lista.";
          }
        );
      } else {
        this.listaService.assistirFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeAssistido = true; // Atualiza o estado do assistido
            this.mensagem = "Filme adicionado à lista com sucesso!";
          },
          (error) => {
            console.error("Erro ao retirar o filme da lista:", error);
            this.mensagem = "Erro ao retirar o filme da lista.";
          }
        );
      }
    }
  }


    verificarSeAAssistir(codigoFilme: number) {
    if (this.codigoUsuario) {
      this.listaService.verificarFilmeAAssistir(codigoFilme, this.codigoUsuario).subscribe(
        (isAAssistir: boolean) => {
          console.log("Resultado da verificação de aassistir:", isAAssistir);
          this.filmeAssistir = isAAssistir; // Atualiza o estado do áassistir
          if (isAAssistir) {
            this.filmeAAssistir = true;
          } else {
            this.filmeAAssistir = false;
          }
          this.carregandoAAssistir = false;
          this.cdr.detectChanges();
          console.log("Resultado da verificação 2 de aassistir:", isAAssistir);
        },
        (error) => {
          console.error('Erro ao verificar se o filme está à assistir:', error);
          this.carregandoAAssistir = false;
          this.cdr.detectChanges(); 
        }
      );
    }
  }

    aassistirFilme() {
    if (this.codigoUsuario && this.filme.codigoFilme) {
      if (this.filmeAAssistir) {
        this.listaService.desaassistirFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeAAssistir = false; // Atualiza o estado do aassistir
            this.mensagem = "Filme retirado da lista com sucesso!";
            // Remover a chamada à verificação, pois já sabemos que foi desaassistido
          },
          (error) => {
            console.error("Erro ao retirar o filme da lista:", error);
            this.mensagem = "Erro ao retirar o filme da lista.";
          }
        );
      } else {
        this.listaService.aassistirFilme(this.filme.codigoFilme, this.codigoUsuario).subscribe(
          (response) => {
            this.filmeAAssistir = true; // Atualiza o estado do aassistir
            this.mensagem = "Filme adicionado à lista com sucesso!";
          },
          (error) => {
            console.error("Erro ao adicionar o filme à lista:", error);
            this.mensagem = "Erro ao adicionar o filme à lista.";
          }
        );
      }
    }
  }
  
    carregarComentarios(codigoFilme: number){
    this.comentariosService.carregarComentarios(codigoFilme).subscribe(
      (comentarios: Comentario[]) => {
        this.comentarios = comentarios;
        console.log(comentarios)
        this.comentarios.forEach(comentario => {
          this.verificarSeCurtido(comentario.codigoComentario); // Inicializa o estado de like
          this.carregarQuantidadeLikes(comentario.codigoComentario); // Carregar quantidade de likes
          const codigoUsuarioquecomentou = comentario.codigoUsuario;
          if (codigoUsuarioquecomentou) {
            this.usuarioService.getFotoUsuario(+codigoUsuarioquecomentou).subscribe(
              (blob: Blob) => {
                const objectURL = URL.createObjectURL(blob);
                comentario.fotoUsuario = objectURL;
              },
              (error) => {
                console.error("Erro ao carregar a foto:", error);
                comentario.fotoUsuario = this.fotoPadrao; // Define uma imagem padrão caso ocorra erro
              }
            );
          }
          if (comentario.comSpoiler === 1){
            console.log(comentario.comSpoiler)
            comentario.comentario = "Comentário com spoiler!";
           }
        });
        this.cdr.detectChanges(); 
      },
    (error) => {
      console.error('Erro ao carregar comentarios:', error);
    }
  );
  }

  toggleSpoilers() {
    this.exibirSpoilers = !this.exibirSpoilers; // Alterna o estado
  }

  carregarQuantidadeComentarios(codigoComentario: number) {
    this.comentariosService.contar(codigoComentario).subscribe(
      (qtddComentarios: number) => {
        this.qtddComentarios = qtddComentarios;
      },
      (error) => {
        console.error('Erro ao carregar quantidade de comentarios:', error);
      }
    );
  }

  carregarQuantidadeLikes(codigoComentario: number) {
    this.likesService.contar(codigoComentario).subscribe(
      (qtddLikes: number) => {
        const comentario = this.comentarios.find(c => c.codigoComentario === codigoComentario);
        if (comentario) {
          comentario.qtddLikes = qtddLikes; // Atualiza a quantidade de likes no comentário
        }
      },
      (error) => {
        console.error('Erro ao carregar quantidade de likes:', error);
      }
    );
  }

  // 
  
  inserirComentario() {
    if (this.comentarioForm.valid) {
      // Mostra o modal para perguntar sobre spoilers
      const modal = new bootstrap.Modal(document.getElementById('spoilerModal')!);
      modal.show();
    } else {
      console.warn('Formulário inválido');
    }
  }
  
  confirmarComentario(comSpoiler: boolean) {
    const novoComentario = {
      usuario: {
        codigoUsuario: this.codigoUsuario! // Certifique-se de que isso está definido
      },
      filme: {
        codigoFilme: this.codigoFilme! // Certifique-se de que isso está definido
      },
      comentario: this.comentarioForm.value.comentario, // O texto do comentário
      comSpoiler: comSpoiler ? 1 : 0 // Define se contém spoiler
    };
  
    this.comentariosService.inserir(novoComentario).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        this.comentarioForm.reset();
        this.caracteresRestantes = this.limiteCaracteres;
        this.carregarQuantidadeComentarios(this.codigoFilme!); // Atualizar a contagem
        this.carregarComentarios(this.codigoFilme!);
      },
      (error) => {
        console.error('Erro ao inserir comentário:', error);
      }
    );
  }

  atualizarContagem() {
    const comentario = this.comentarioForm.get('comentario')?.value || '';
    this.caracteresRestantes = this.limiteCaracteres - comentario.length;
  }

  removerComentario(codigo: number) {
    this.comentariosService.ocultar(codigo).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        this.carregarComentarios(this.codigoFilme!); // Atualiza a lista de comentários
        this.carregarQuantidadeComentarios(this.codigoFilme!); // Atualiza a contagem
      },
      (error) => {
        console.error('Erro ao remover comentário:', error);
      }
    );
  }

  curtirComentario(codigoComentario: number) {
    if (!this.isAuthenticated) {
      alert('Você precisa estar logado para curtir um comentário.');
      return;
    }
  
    if (this.codigoUsuario) {
      const jaCurtido = this.likes[codigoComentario]; // Verificar o estado atual do like
  
      if (jaCurtido) {
        // Se já curtiu, remove o like
        this.likesService.removerLike(codigoComentario, this.codigoUsuario).subscribe(
          () => {
            this.likes[codigoComentario] = false;
            this.carregarQuantidadeLikes(codigoComentario);// Atualiza a quantidade de likes
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Erro ao remover like:', error);
          }
        );
      } else {
        // Se não curtiu, adicionar o like
        this.likesService.adicionarLike(codigoComentario, this.codigoUsuario).subscribe(
          () => {
            this.likes[codigoComentario] = true;
            this.carregarQuantidadeLikes(codigoComentario); // Atualiza a quantidade de likes
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Erro ao adicionar like:', error);
          }
        );
      }
    }
  }

  verificarSeCurtido(codigoComentario: number) {
    if (this.codigoUsuario) {
      this.likesService.verificarCurtida(codigoComentario, this.codigoUsuario).subscribe(
        (isLiked: boolean) => {
          this.likes[codigoComentario] = isLiked; // Atualiza o estado do like
          this.cdr.detectChanges(); // Garante que as mudanças sejam detectadas
        },
        (error) => {
          console.error('Erro ao verificar se o comentário foi curtido:', error);
        }
      );
    }
  }

  denunciarComentario(codigoComentario: number) {
    this.codigoComentario = codigoComentario; 
    console.log('Comentário a ser denunciado:', this.codigoComentario); 
  }

  enviarDenuncia() {
    const tipoSelecionado = this.tipoDenuncia;
    
    if (!tipoSelecionado) {
      alert('Por favor, selecione um tipo de denúncia.');
      return;
    }

    
    if (this.codigoUsuario === null) {
      alert('Erro: Usuário não autenticado.');
      return;
    }

    if (this.codigoComentario === null) {
      alert('Erro: Código do comentário não encontrado.');
      return;
    }

    const novaDenuncia = {
      usuarioDenunciante: this.codigoUsuario,
      tipoDenuncia: tipoSelecionado,
      comentario: { codigoComentario: this.codigoComentario }, // Código do comentário sendo denunciado
      denunciaAcatada: null 
    };

    // Envia a denúncia para o backend
    this.denunciaService.inserir(novaDenuncia).subscribe(
      (response) => {
        console.log('Denúncia enviada com sucesso!', response);
        alert('Sua denúncia foi enviada com sucesso!');
      },
      (error) => {
        console.error('Erro ao enviar denúncia:', error);
        alert('Houve um erro ao enviar sua denúncia. Tente novamente.');
      }
    );
  }
  
  onStarClick() {
    if (this.isAuthenticated) {

      this.mensagem = "A função dar nota com as estrelas está em construção";
      alert(this.mensagem); 
    } else {

      const modalElement = document.getElementById('myModal2');
      if (modalElement) {
        const myModal2 = new bootstrap.Modal(modalElement);
        myModal2.show();
      }
    }
  }

}