import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';
import { ToastrService } from 'ngx-toastr';
import { FornecedorBaseComponent } from '../fornecedor-form.base.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent extends FornecedorBaseComponent {

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    super();
    this.fornecedor = this.route.snapshot.data['fornecedor'];   
  }

  excluirEvento() {
    this.fornecedorService.excluirFornecedor(this.fornecedor.id)
      .subscribe(
        fornecedor => { this.sucessoExclusao(fornecedor) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Fornecedor excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.mensagens;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
