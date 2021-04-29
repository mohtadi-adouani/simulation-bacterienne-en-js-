//Class Experience
export class Experience{
	constructor(nombreHeurs,elements,bacteries,bacteriesBase){
		this.elements = elements;
		this.bacteries = bacteries;
		this.nombreHeurs = nombreHeurs;
		this.bacteriesBase = bacteriesBase;
		this.resultat = new Array(this.elements.length);
	}


	get resultatS(){
		return this.calculer();
	}
	calculer(){

		for(let i = 0 ; i < this.elements.length ; i++){
			this.resultat[i] = this.calculerPourUnelement(this.elements[i],this.bacteries[0],i);
		}

		return this.resultat;
	}

	//Fait l'experience pour un element et une bacterie
	calculerPourUnelement(element,bacterie,col){
		let glucose = element.glucose;//
		let color = ['#000000','#800000','#008000','#cc99ff','#ccff99','#ffe699','#ff6384','#36a2eb','#cc65fe','#ffce56'];
		let bacterieTab = new Array(this.nombreHeurs);
		bacterieTab[0] = this.bacteriesBase;
		for(let i = 1 ; i < this.nombreHeurs ; i++){
			console.log("Etape : "+i+" glucose : "+glucose+"\n");
			if(glucose > 0){
				let ajoutTemp = bacterieTab[i-1] * element.facteurMultiplication * bacterie.division * this.facteurTemperature(element,bacterie) * this.facteurPh(element,bacterie);
				bacterieTab[i] =  ajoutTemp;
				if(glucose - GlucoseParDivision*ajoutTemp >= 0){
					glucose = glucose - GlucoseParDivision*ajoutTemp ;
				}
				else{
					glucose = 0;
				}
			}
			else{
				bacterieTab[i] = bacterieTab[i-1]
			}
			if(i >= cycleBacterien ){
				if(bacterieTab[i] - bacterieTab[i-cycleBacterien] >= 0){
				bacterieTab[i] = bacterieTab[i] - bacterieTab[i-cycleBacterien];//mort de bacteries
				}
				else{
					bacterieTab[i] = 0;
				}
			}
		}
		
		return {data : bacterieTab , label : element.nom ,borderColor : color[col],fill : false ,borderWidth : 1 };
	}

	//Calcule si Nous somme dans l'interval du ph optimal
	facteurPh(element,bacterie){
		return (1 - ( Math.abs(bacterie.phIdeale - element.ph) / Math.abs(bacterie.phIdeale + element.ph) ))
	}

	//Calcule si Nous somme dans l'interval de la temperature optimale
	facteurTemperature(element,bacterie){
		return (1 - ( Math.abs(bacterie.temperatureIdeale - element.temperature) / Math.abs(bacterie.temperatureIdeale + element.temperature) ));
	}
}
