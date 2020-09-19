import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Routes, Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submited: boolean;
  errMess : string;
  response : string;
  @ViewChild('fform') feedbackFormDirective;
  formErrors = {
    'prenom': '',
    'nom': '',
    'tel' : '',
    'email' : '',
    'suj' : '',
    'msg' : ''
  };
  validationMessages = {
    'prenom': {
      'required' : 'Votre prenom est requis.',
      'minlength' : 'Votre prenom doit avoir au moins 2 caractères.',
      'maxlength' : 'Votre prenom doit avoir maximum 25 caractères.'
    },
    'nom': {
      'required' : 'Votre nom est requis.',
      'minlength' : 'Votre nom doit avoir au moins 2 caractères.',
      'maxlength' : 'Votre nom doit avoir maximum 25 caractères.'
    },
    'tel': {
      'required' : 'Votre numero est requis.',
      'pattern' : 'Votre numéro doit contenir que des chiffres'  
    },
    'email': {
      'required' : 'Votre email est requis.',
      'email' : `Format d'email invalid`
    },
    'suj': {
      'required' : 'Le sujet est requis.',
    },
    'msg': {
      'required' : 'Votre message est requis.',
    }
  };

  constructor(private fb: FormBuilder, private contactService: ContactService,
    public dialog: MatDialog, private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
   
  }
  createForm(){
    this.contactForm = this.fb.group({
       prenom: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
       nom: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
       tel: [0,[Validators.required, Validators.pattern]],
       email: ['',[Validators.required, Validators.email]],
       suj: ['',[Validators.required]],
       msg: ['',[Validators.required]]

    });
    this.contactForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    this.onValueChanged();
      }

  onValueChanged(data?: any) {
    console.log(data);
    if(!this.contactForm) {return;}
    const form = this.contactForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key]
            }
          }
        }
      }
    }
}
onSubmit() {
    console.log(this.contactForm.value);
    window.scrollTo(350, 350);
    this.submited = false;
    this.contactService.sendEmail({
      from: 'Mailgun Sandbox <postmaster@sandboxec4031dc7c414d41ba658caebb7fec9e.mailgun.org',
      to: 'menuisiersamobel@gmail.com',
      subject: this.contactForm.value.suj,
      firstname: this.contactForm.value.prenom,
      lastname: this.contactForm.value.nom,
      text: this.contactForm.value.msg,
      tel: this.contactForm.value.tel
    }).subscribe(
      (success) => {
        console.log(success);
        this.openDialog('success');
        this.submited=true;
      },
      err => {
        console.log(err);
        this.errMess=err;
        this.openDialog('error');
      }
 
    );
  }
 
  openDialog(data: string) {
    this.dialog.open(ContactConfirmationDialog, {
      data
    });
  }

}

@Component({
  selector: 'contact-confirmation-dialog',
  templateUrl: 'contact-confirmation.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactConfirmationDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private router: Router) {}

  onClick() {
    this.router.navigate([''], { fragment: 'top'});
  }
}
