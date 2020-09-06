import { Component,Input, OnInit } from '@angular/core';
import { PostService } from '../services/posts.services';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {


@Input() titres : string;
@Input() contenu : string;
@Input() misAjour : string;
@Input() likes: number;
@Input() indexPost:number;


	constructor(private PostService: PostService) {
    
  	}
	
	loveIt() {
	
	this.PostService.onLoveIt(this.indexPost);
	console.log(this.likes);
	
	}

	DontLove() {
		this.PostService.onDontLoveIt(this.indexPost);
		console.log(this.likes);
	}

  

  ngOnInit(): void {
  }

}
