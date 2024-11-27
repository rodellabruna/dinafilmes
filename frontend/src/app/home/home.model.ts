export class Filme {
    codigoFilme: number = 0;
    nomeFilme: string = "";
    genero: string = "";
    diretor: string = "";
    distribuidor: string = "";
    avaliacaoIMDB: string = "";
    anoLancamento: number = 0;
    elenco: string = "";
    classificacaoIndicativa: string = "";
    ondeAssistir: string = "";
    foto: string = "";
    sinopse: string = "";
    trailerUrl: string = "";
    duracao: string = "";

    constructor(obj?:Filme){
        if(obj!=undefined){
            this.codigoFilme = obj.codigoFilme;
            this.nomeFilme = obj.nomeFilme;
            this.genero = obj.genero;
            this.diretor = obj.diretor;
            this.distribuidor = obj.distribuidor;
            this.avaliacaoIMDB = obj.avaliacaoIMDB;
            this.anoLancamento = obj.anoLancamento;
            this.elenco = obj.elenco;
            this.classificacaoIndicativa = obj.classificacaoIndicativa;
            this.ondeAssistir = obj.ondeAssistir;
            this.foto = obj.foto;
            this.sinopse = obj.sinopse;
            this.duracao = obj.duracao;
            this.trailerUrl = obj.trailerUrl;
        }
    }
    
}

export class Comentario {
    codigoComentario: number = 0;
    codigoFilme: number = 0;
    codigoUsuario: number = 0;
    comSpoiler: number = 0;
    comentario: String = '';
    codigoComentarioRespondido: number = 0;
    dataCriacao: Date | null = null;
    dataAtualizacao: Date | null = null;
    qtddLikes: number = 0;
    apagadoOuModerado: number = 0;
    nomeUsuario: String = '';
    fotoUsuario: String = '';
    fotoUsuarioMimeType: String = "";
    fotoUsuarioUrl: string = '';

    constructor(obj?:Comentario){
        if(obj!=undefined){
            this.codigoComentario = obj.codigoComentario;
            this.codigoFilme = obj.codigoFilme;
            this.codigoUsuario = obj.codigoUsuario;
            this.comSpoiler = obj.comSpoiler;
            this.comentario = obj.comentario;
            this.codigoComentarioRespondido = obj.codigoComentarioRespondido;
            this.dataCriacao = obj.dataCriacao ? new Date(obj.dataCriacao) : null;
            this.dataAtualizacao = obj.dataAtualizacao ? new Date(obj.dataAtualizacao) : null;
            this.qtddLikes = obj.qtddLikes;
            this.apagadoOuModerado = obj.apagadoOuModerado;
            this.nomeUsuario = obj.nomeUsuario;
            this.fotoUsuario = obj.fotoUsuario;
            this.fotoUsuarioMimeType = obj.fotoUsuarioMimeType;
            this.fotoUsuarioUrl = obj.fotoUsuarioUrl || '';

        }
    }

    get isSpoiler(): boolean {
        return this.comSpoiler === 1; // Retorna true se comSpoiler for 1
    }

    get isApagadoOuModerado(): boolean {
        return this.apagadoOuModerado === 1; // Retorna true se comSpoiler for 1
    }

}

export class Denuncia {
    codigoDenuncia: number = 0;
    tipoDenuncia: String = '';
    codigoComentario: number = 0;
    dataCriacao: Date | null = null;
    dataResolucao: Date | null = null;
    denunciaAcatada: boolean = false;
    usuarioDenunciante: number = 0;
    codigoUsuario: number | null = null;  
    codigoFilme: number | null = null;
    resolvido: boolean = false;   

    constructor(obj?:Denuncia){
        if(obj!=undefined){
            this.codigoComentario = obj.codigoComentario;
            this.tipoDenuncia = obj.tipoDenuncia;
            this.codigoComentario = obj.codigoComentario;
            this.dataCriacao = obj.dataCriacao ? new Date(obj.dataCriacao) : null;
            this.dataResolucao = obj.dataResolucao ? new Date(obj.dataResolucao) : null;
            this.denunciaAcatada = obj.denunciaAcatada;
            this.usuarioDenunciante = obj.usuarioDenunciante;
            this.codigoUsuario = obj.codigoUsuario || null;
            this.codigoFilme = obj.codigoFilme || null;
            this.resolvido = obj.resolvido;
        }
    }

    get isResolvido(): boolean {
        return this.resolvido === true; 
    }

}

export class Contato {
    id: number = 0;
    assunto: String = '';
    mensagem: String = '';
    nome: String = '';
    lido: boolean = false;   

    constructor(obj?:Contato){
        if(obj!=undefined){
            this.id = obj.id;
            this.assunto = obj.assunto;
            this.mensagem = obj.mensagem;
            this.nome = obj.nome;
            this.lido = obj.lido;
        }
    }

    get isLido(): boolean {
        return this.lido === true; 
    }

}
  