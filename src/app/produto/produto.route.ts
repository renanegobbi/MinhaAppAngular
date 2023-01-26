import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoAppComponent } from './produto.app.component';
import { ListaComponent } from './lista/lista.component';
import { ProdutoGuard } from './services/produto.guard';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ProdutoResolve } from './services/produto.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';

const produtoRouterConfig: Routes = [
    {
        path: '', component: ProdutoAppComponent,
        children: [
            { path: 'listar', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [ProdutoGuard]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canDeactivate: [ProdutoGuard],
                resolve: {
                    produto: ProdutoResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    produto: ProdutoResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canDeactivate: [ProdutoGuard],
                resolve: {
                    produto: ProdutoResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class ProdutoRoutingModule { }