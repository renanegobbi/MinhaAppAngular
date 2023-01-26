import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorAppComponent } from './fornecedor.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { FornececedorGuard } from './services/fornecedor.guard';
import { EditarComponent } from './editar/editar.component';
import { FornecedorResolve } from './services/fornecedor.resolve';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';

const fornecedorRouterConfig: Routes = [
    {
        path: '', component: FornecedorAppComponent,
        children: [
            { path: 'listar', component: ListaComponent },
            { 
              path: 'adicionar-novo', component: NovoComponent,
              canDeactivate: [FornececedorGuard]
            },
            { path: 'editar/:id', component: EditarComponent,
              resolve: {
                    fornecedor: FornecedorResolve
                }
            },
            { 
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                } 
            },
            { 
                path: 'excluir/:id', component: ExcluirComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                }
            } 
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(fornecedorRouterConfig)
    ],
    exports: [RouterModule]
})
export class FornecedorRoutingModule { }