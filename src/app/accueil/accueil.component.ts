import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  onNavig(){

  	this.router.navigate(['devis']);
  }

  onNavigImg(){

  	this.router.navigate(['prestations']);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: string =  params.id;
    });
 
  }
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }

}
