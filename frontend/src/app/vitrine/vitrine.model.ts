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
        }
    }
    
}