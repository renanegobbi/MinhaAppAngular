import { Router} from '@angular/router';

export abstract class BaseGuard {

    constructor(protected router: Router){}
    
    private navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }    
}