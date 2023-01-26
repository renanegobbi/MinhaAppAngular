import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FornecedorBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent extends FornecedorBaseComponent {

  constructor(
    private route: ActivatedRoute) {
        super();
        this.fornecedor = this.route.snapshot.data['fornecedor'];
    }
}
