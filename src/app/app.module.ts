import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import '@progress/kendo-angular-intl/locales/fr/all';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SchedulerEditFormComponent } from './edit-form/edit-form.component';
import { EditService } from './services/edit.service';
import { ContactComponent, ContactConfirmationDialog } from './contact/contact.component';
import { RealisationComponent } from './realisation/realisation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AmenagementInterieurComponent } from './amenagement-interieur/amenagement-interieur.component';
import { PrestationsComponent } from './prestations/prestations.component';
import { DevisComponent } from './devis/devis.component';
import { CommonModule } from '@angular/common';

const appRoutes : Routes = [
{path: 'accueil', component : AccueilComponent },
{path: 'prestations', component : PrestationsComponent },
{path: 'contact', component : ContactComponent },
{path: 'réalisations', component : RealisationComponent },
{path: 'devis', component : DevisComponent },
{path: '', component : AccueilComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AmenagementInterieurComponent,
    ContactComponent,
    DevisComponent,
    PrestationsComponent,
    RealisationComponent,
    SchedulerEditFormComponent,
    ContactConfirmationDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ButtonsModule,
    DateInputsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    BrowserModule,
    HttpClientJsonpModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    SchedulerModule       
  ],

  providers: [EditService , {provide: LOCALE_ID,useValue: 'fr'}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
