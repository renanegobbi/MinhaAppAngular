import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { FornecedorService } from '../services/fornecedor.service';
import { NgBrazilValidators } from 'ng-brazil';
import { StringUtils } from 'src/app/utils/string-utils';
import { utilsBr } from 'js-brasil';
import { FornecedorBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FornecedorBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  MASKS = utilsBr.MASKS;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    super();
    this.fornecedor = this.route.snapshot.data['fornecedor'];
  }

  ngOnInit() {

    this.spinner.show();

    this.fornecedorForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      descricao: [''],
      cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
      ativo: ['', [Validators.required]]
    });

    this.preencherForm();

    setTimeout(() => {
        this.spinner.hide();
      }, 1000);

  }

  preencherForm() {

    this.fornecedorForm.patchValue({
      id: this.fornecedor.id,
      nome: this.fornecedor.nome,
      descricao: this.fornecedor.descricao,
      cnpj: this.fornecedor.cnpj,
      ativo: this.fornecedor.ativo
    });

    this.fornecedorForm.controls['cnpj'].disable();
  }

  gAfterViewInit() {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);

      this.fornecedor.cnpj = StringUtils.somenteNumeros(this.fornecedor.cnpj);

      this.fornecedorService.atualizarFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Fornecedor atualizado com sucesso!', 'Sucesso!');
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
