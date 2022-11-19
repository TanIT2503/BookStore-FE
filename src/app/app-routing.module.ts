import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'account',
    loadChildren: () => import('./feature/account/account.module').then(module => module.AccountModule)
  },
  {path: '',
    loadChildren: () => import('./feature/bookstore/bookstore.module').then(module => module.BookstoreModule)
  },
  {path: '',
    loadChildren: () => import('./share/share.module').then(module => module.ShareModule)
  },
  {path: '',
    loadChildren: () => import('./feature/cart/cart.module').then(module => module.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
