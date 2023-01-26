import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { ToastrService } from 'ngx-toastr';
import { ProdutoBaseComponent } from '../produto-form.base.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent extends ProdutoBaseComponent {

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    super();    
    this.produto = this.route.snapshot.data['produto'];   
  }

  excluirEvento() {
    this.produtoService.excluirProduto(this.produto.id)
      .subscribe(
        produto => { this.sucessoExclusao(produto) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Produto excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.mensagens;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
