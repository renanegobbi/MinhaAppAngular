export class Fornecedor {
    id: number;
    nome: string;
    descricao: string;
    cnpj: string;
    ativo: boolean;
}


export class Consulta {
    paginaIndex: number;
    paginaTamanho: number;
    ordenarPor: string;
    ordenarSentido: string;

    constructor(ordenarPor: string = 'Nome', ordenarSentido: string = 'ASC', paginaIndex: 1, paginaTamanho: 10000) {
        this.ordenarPor = ordenarPor;
        this.ordenarSentido = ordenarSentido;
        this.paginaIndex = paginaIndex;
        this.paginaTamanho = paginaTamanho;
    }
}

export class ProcurarFornecedor{
    //ativo: boolean = true;
    ordenarPor: string  = 'Nome';
    ordenarSentido: string = 'ASC';
    paginaIndex: number = 1;
    paginaTamanho: number = 10000;
   
    constructor(obj: any) {
        if (obj instanceof Consulta) {
            this.ordenarPor = obj.ordenarPor;
            this.ordenarSentido = obj.ordenarSentido;
            this.paginaIndex = obj.paginaIndex;
            this.paginaTamanho = obj.paginaTamanho;
        }else{}
    }
}