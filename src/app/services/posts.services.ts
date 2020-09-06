export class PostService {
	
	  posts = [
  	{
  		title : "ligne 1",
  		contenu: "la vie est un long fleuve sur lequel navigue chaque humain",
  		loveIts: 0,
  		created_at: new Date(),
  	},

  	{
  		title : "ligne 2",
  		contenu: "Quand on regarde le passé nous savons où nous menera l'avenir",
  		loveIts: 0,
  		created_at: new Date(),
  	},

  	{
  		title : "YZ",
  		contenu: "Ingénieur non-qualifié",
  		loveIts: 0,
  		created_at: new Date(),
  	},


  	];

	onLoveIt(i: number){
		this.posts[i].loveIts=this.posts[i].loveIts + 1;
		
	}

	onDontLoveIt(i: number){
		this.posts[i].loveIts=this.posts[i].loveIts - 1;

	}

}