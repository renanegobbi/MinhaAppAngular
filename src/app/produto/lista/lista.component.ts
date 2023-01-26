import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ProcurarProduto } from '../models/produto';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit{
    
  procurarProduto: ProcurarProduto = new ProcurarProduto({});
  errorMessage: string;
  todosProdutos: any = [];

  constructor(private produtoService: ProdutoService) { 
  }  
  
  ngOnInit(): void {
    this.produtos();
  }

  produtos(): void{
    this.produtoService.listar(this.procurarProduto).subscribe((response: any) => {
        this.todosProdutos = response;
    });
  }
}



