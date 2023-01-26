import { Produto } from './models/produto';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-components/form-base.component';
import { Fornecedor, ProcurarFornecedor } from '../fornecedor/models/fornecedor';

export abstract class ProdutoBaseComponent extends FormBaseComponent {
    
    currentDate = new Date();
    errors: any[] = [];
    todosFornecedores: Fornecedor[];
    produtoForm: FormGroup;
    produto: Produto;
    procurarFornecedor: ProcurarFornecedor = new ProcurarFornecedor({});

    formResult: string = '';

    constructor() {
        super();

        this.validationMessages = {
            fornecedorId: {
                required: 'Escolha um fornecedor',
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 1000 caracteres'
            },
            dataFabricacao: {
                required: 'Informe a data de fabricação'
            },
            dataValidade: {
                required: 'Informe a data de validade'
            },
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.produtoForm);
    }
}