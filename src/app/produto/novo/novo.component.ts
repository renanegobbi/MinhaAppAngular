import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { ProdutoService } from '../services/produto.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ProdutoBaseComponent } from '../produto-form.base.component';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends ProdutoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

   MASKS = utilsBr.MASKS;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService, 
    private bsLocaleService: BsLocaleService) {
      
      super(); 
      this.bsLocaleService.use('pt-br');
  }

  ngOnInit(): void {

    this.fornecedores();

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      dataFabricacao: ['', [Validators.required]],
      dataValidade: ['', [Validators.required]],
      ativo: [true]
    });

    this.preencherForm();
  }

  fornecedores(): void{
    this.produtoService.obterFornecedores(this.procurarFornecedor).subscribe((response: any) => {
        this.todosFornecedores = response;
    });
  }

  preencherForm() {

    this.produtoForm.patchValue({
      dataFabricacao: this.currentDate
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      this.produtoService.novoProduto(this.produto)
        .subscribe({
          next: (sucesso: any) => { this.processarSucesso(sucesso) },
          error: (falha: any) => { this.processarFalha(falha) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.mensagens;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
