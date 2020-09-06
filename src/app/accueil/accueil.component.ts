import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router) { }

  onNavig(){

  	this.router.navigate(['devis']);
  }

  onNavigImg(){

  	this.router.navigate(['prestations']);
  }

  ngOnInit(): void {
  }

}