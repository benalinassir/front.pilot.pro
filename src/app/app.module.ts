import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { VolsComponent } from './compagnie-aerienne/components/vols/vols.component';
import { PilotesComponent } from './compagnie-aerienne/components/pilotes/pilotes.component';
import { AvionsComponent } from './compagnie-aerienne/components/avions/avions.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http'; // Import du HttpClientModule
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InsertVolComponent } from './compagnie-aerienne/Dialog/insert-vol/insert-vol.component';
import { MatSelectModule } from '@angular/material/select'; // Importez MatSelectModule
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    VolsComponent,PilotesComponent,AvionsComponent,InsertVolComponent,
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule ,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
