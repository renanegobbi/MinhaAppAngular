import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Consulta, Produto } from '../models/produto';
import { Fornecedor } from "src/app/fornecedor/models/fornecedor";

@Injectable()
export class ProdutoService extends BaseService {

    produto: Produto = new Produto();

    constructor(private http: HttpClient) { super() 
        
    }

    obterTodos(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "produto")
            .pipe(catchError(super.serviceError));
    }

    listar(consulta: Consulta): Observable<Produto[]> {
        return this.http
            .post<any>(this.UrlServiceV1 + "produto/listar", consulta, this.ObterHeaderJson())
            .pipe(
                map(super.extractRegistros),
                catchError(super.serviceError));
    }

    obterPorId(id: number): Observable<Produto> {
        return this.http
            .get<Produto>(this.UrlServiceV1 + "produto/obter-por-id?id=" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }

    novoProduto(produto: Produto): Observable<Produto> {
        return this.http
            .post(this.UrlServiceV1 + "produto/salvar", produto, this.ObterHeaderJson())
            .pipe(
                map(super.extractRegistros),
                catchError(super.serviceError));
    }

    atualizarProduto(produto: Produto): Observable<Produto> {
        return this.http
            .put(this.UrlServiceV1 + "produto/alterar", produto, this.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }

    excluirProduto(id: number): Observable<Produto> {
        return this.http
            .delete(this.UrlServiceV1 + "produto/excluir?id=" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractRetorno),
                catchError(super.serviceError));
    }
    
    obterFornecedores(consulta: Consulta): Observable<Fornecedor[]> {
        return this.http
            .post<any>(this.UrlServiceV1 + "fornecedor/listar", consulta, this.ObterHeaderJson())
            .pipe(
                map(super.extractRegistros),
                catchError(super.serviceError));
    }
}