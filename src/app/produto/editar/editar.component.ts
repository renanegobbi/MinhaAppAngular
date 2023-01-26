import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoService } from '../services/produto.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ProdutoBaseComponent } from '../produto-form.base.component';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends ProdutoBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService, 
    private bsLocaleService: BsLocaleService,
    private spinner: NgxSpinnerService) {

        super();
        this.bsLocaleService.use('pt-br');
        this.produto = this.route.snapshot.data['produto'];
    }  


  ngOnInit(): void {

    this.spinner.show();

    this.obterFornecedores();

    this.produtoForm = this.fb.group({
      id: '',
      fornecedorId: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      dataFabricacao: ['', [Validators.required]],
      dataValidade: ['', [Validators.required]],
      ativo: ['', [Validators.required]]
    });

    this.preencherForm();

    setTimeout(() => {
        this.spinner.hide();
      }, 1000);
  }

  obterFornecedores(): void{
    this.produtoService.obterFornecedores(this.procurarFornecedor).subscribe((response: any) => {
        this.todosFornecedores = response;
    });
  }

   preencherForm() {
    this.produtoForm.patchValue({
       fornecedorId: this.produto.fornecedorId, 
       id: this.produto.id,
       descricao: this.produto.descricao,
       dataFabricacao: this.produto.dataFabricacao,
       dataValidade: this.produto.dataValidade,
       ativo: this.produto.ativo
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);

      this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

        this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Produto editado com sucesso!', 'Sucesso!');
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
