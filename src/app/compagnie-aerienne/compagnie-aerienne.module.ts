import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { MatPaginatorModule } from '@angular/material/paginator';
import { VolsComponent } from './components/vols/vols.component';
import { PilotesComponent } from './components/pilotes/pilotes.component';
import { AvionsComponent } from './components/avions/avions.component';
import { DeleteVolComponent } from './Dialog/delete-vol/delete-vol.component';
import { UpdateVolComponent } from './Dialog/update-vol/update-vol.component';
import { InsertVolComponent } from './Dialog/insert-vol/insert-vol.component';
import { ConsultVolComponent } from './Dialog/consult-vol/consult-vol.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    DeleteVolComponent,
    UpdateVolComponent,
    InsertVolComponent,
    ConsultVolComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
  ]
})
export class CompagnieAerienneModule { }
