import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import '@progress/kendo-angular-intl/locales/fr/all';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SchedulerEditFormComponent } from './edit-form/edit-form.component';
import { EditService } from './services/edit.service';
import { ContactComponent } from './contact/contact.component';
import { RealisationComponent } from './realisation/realisation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AmenagementInterieurComponent } from './amenagement-interieur/amenagement-interieur.component';
import { PrestationsComponent } from './prestations/prestations.component';
import { DevisComponent } from './devis/devis.component';


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
    SchedulerEditFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonsModule,
    DateInputsModule,
    FormsModule,
    MatInputModule,
    HttpClientJsonpModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    SchedulerModule       
  ],

  providers: [EditService , {provide: LOCALE_ID,useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
