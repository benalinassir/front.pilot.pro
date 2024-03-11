import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolsComponent } from './components/vols/vols.component';
import { PilotesComponent } from './components/pilotes/pilotes.component';
import { AvionsComponent } from './components/avions/avions.component';
import { AvionsService } from './services/avions/avions.service';
import { VolsService } from './services/vols/vols.service';
import { PilotsService } from './services/pilots/pilots.service';


const routes: Routes = [
    { path: 'vols', component: VolsComponent },
    { path: 'avion', component: AvionsComponent },
    { path: 'pilote', component: PilotesComponent },
    { path: '', redirectTo: 'vols', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [VolsService, AvionsService, PilotsService]
})
export class CompagnieAerienneRoutingModule { }
