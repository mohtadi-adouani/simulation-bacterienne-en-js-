//La class Environnement
export class Environnement{
	constructor(ph,facteurMultiplication,temperature,nom,glucose){
		//le ph de ce milieu
		this.ph = ph;

		//facteurs de l'augumentation de la population dans ce milieu
		this.facteurMultiplication = facteurMultiplication;

		//temperatured de ce milieu
		this.temperature = temperature;

		//nom
		this.nom = nom;

		//glucose
		this.glucose = glucose;
	}

}