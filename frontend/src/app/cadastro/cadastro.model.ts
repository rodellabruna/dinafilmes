export class Usuario {
    codigoUsuario: number = 0;
    nomeUsuario: string = "";
    email: string = "";
    senhaNova?: string = "";
    senhaAtual?: string = "";
    ativo: boolean = true;
    aviso1: boolean = false;
    aviso2: boolean = false;
    dataCriacao: Date | null = null;
    dataAtualizacao: Date | null = null;
    fotoUsuario: Blob | null = null;
    fotoUsuarioMimeType: String = "";
    telefone: string = "";
    admin:  boolean = false;
    
    constructor(obj?:Usuario){
        if(obj!=undefined){
            this.codigoUsuario = obj.codigoUsuario;
            this.nomeUsuario = obj.nomeUsuario;
            this.email = obj.email;
            this.senhaAtual = obj.senhaAtual;
            this.senhaNova = obj.senhaNova;
            this.fotoUsuario = obj.fotoUsuario;
            this.fotoUsuarioMimeType = obj.fotoUsuarioMimeType;
            this.ativo = obj.ativo;
            this.dataCriacao = obj.dataCriacao ? new Date(obj.dataCriacao) : null;
            this.dataAtualizacao = obj.dataAtualizacao ? new Date(obj.dataAtualizacao) : null;
            this.telefone = obj.telefone;
            this.aviso1 = obj.aviso1;
            this.aviso2 = obj.aviso2;
            this.admin = obj.admin;
        }
    }

}