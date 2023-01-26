import { Fornecedor } from './models/fornecedor';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { FormBaseComponent } from '../base-components/form-base.component';

export abstract class FornecedorBaseComponent extends FormBaseComponent {
    
  errors: any[] = [];
  errorsEndereco: any[] = [];
  fornecedorForm: FormGroup;

  fornecedor: Fornecedor = new Fornecedor();

  textoDocumento: string = '';
  formResult: string = '';

    constructor() {
        super();

        this.validationMessages = {
            nome: {
              required: 'Informe o Nome',
            },
            descricao: {
              required: 'Informe o Descrição'
            },
            cnpj: {
              required: 'Informe o CNPJ',
              cnpj: "CNPJ em formato inválido"
            }
          };

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.fornecedorForm);
    }
}