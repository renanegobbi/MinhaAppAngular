import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { GenericValidator } from 'src/app/utils/generic-form-validation';
import { FornecedorService } from '../services/fornecedor.service';
import { StringUtils } from 'src/app/utils/string-utils';
import { FornecedorBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FornecedorBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  MASKS = utilsBr.MASKS;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

    super();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
        nome: ['', [Validators.required]],
        descricao: [''],
        cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]]
      });

   }

   ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

   adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.cnpj = StringUtils.somenteNumeros(this.fornecedor.cnpj);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

       this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.mensagens;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

