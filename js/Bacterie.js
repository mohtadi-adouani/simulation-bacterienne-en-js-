//La class Bacterie
export class Bacterie{
	constructor(ph,divisionsHeure,temperature,nom){
		//le ph ideal pour la division
		this.phIdeale = ph;

		//nombre de division par heure
		this.division = divisionsHeure;

		//temperature ideale pour la division
		this.temperatureIdeale = temperature;

		//Nom
		this.nom = nom;
	}

}
