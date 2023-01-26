import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { ProcurarFornecedor } from '../models/fornecedor';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit{
    
  procurarFornecedor: ProcurarFornecedor = new ProcurarFornecedor({});
  errorMessage: string;
  todosFornecedores: any = [];

  constructor(private fornecedorService: FornecedorService) { 
  }  
  
  ngOnInit(): void {
    this.fornecedores();
  }

  fornecedores(): void{
    this.fornecedorService.listar(this.procurarFornecedor).subscribe((response: any) => {
        this.todosFornecedores = response;
    });
  }

}

