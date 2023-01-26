import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Consulta, Fornecedor } from '../models/fornecedor';

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();

    constructor(private http: HttpClient) { super() 
        
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedor")
            .pipe(catchError(super.serviceError));
    }

    listar(consulta: Consulta): Observable<Fornecedor[]> {
        return this.http
            .post<any>(this.UrlServiceV1 + "fornecedor/listar", consulta, this.ObterHeaderJson())
            .pipe(
                map(super.extractRegistros),
                catchError(super.serviceError));
    }

    obterPorId(id: number): Observable<Fornecedor> {
        return this.http
            .get<Fornecedor>(this.UrlServiceV1 + "fornecedor/obter-por-id?id=" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http
            .post(this.UrlServiceV1 + "fornecedor/salvar", fornecedor, this.ObterHeaderJson())
            .pipe(
                map(super.extractRegistros),
                catchError(super.serviceError));
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http
            .put(this.UrlServiceV1 + "fornecedor/alterar", fornecedor, this.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }

    excluirFornecedor(id: number): Observable<Fornecedor> {
        return this.http
            .delete(this.UrlServiceV1 + "fornecedor/excluir?id=" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }    
}