import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compagnie-aerienne',
    loadChildren: () => import('./compagnie-aerienne/compagnie-aerienne-routing.module').then(m => m.CompagnieAerienneRoutingModule)
  },
  { path: '', redirectTo: 'compagnie-aerienne', pathMatch: 'full' }, // Redirection si l'URL est vide
  { path: '**', redirectTo: 'compagnie-aerienne' } // Redirection pour toutes les autres faux URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
