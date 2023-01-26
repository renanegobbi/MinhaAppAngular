import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent extends ProdutoBaseComponent {

  constructor(
    private route: ActivatedRoute) {

    super();
    this.produto = this.route.snapshot.data['produto'];
  }
}
