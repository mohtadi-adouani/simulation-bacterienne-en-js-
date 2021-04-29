//La class Environnement
class Environnement{
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

//La class Bacterie
class Bacterie{
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




//Class Experience
class Experience{
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







var temperatureMoyenne = 17.5; //temperature de l'environnement
var temperatureIdealeLacto = 35; // temperature ideale de la lactobacilus
var cycleBacterien = 5; //duree de vie d'une bacteire en heures
var GlucoseParDivision = 0.001; //Quantitee de glucose uttilisee par division cellulaire,unite virtualisee
var glucoseDispo = 10000; //glucose generique

//Les valeures initiales du formulaire 
document.getElementById('time').value = '20';
document.getElementById('temperatureEau').value = '18';
document.getElementById('temperatureLait').value = '14';
document.getElementById('temperatureBiere').value = '13';










//Nous declarons nos environnements pour encapsuler
const eau = new Environnement(7,2,temperatureMoyenne,"Eau",glucoseDispo);
const lait = new Environnement(7,2.001,temperatureMoyenne,"Lait",glucoseDispo);
const biere = new Environnement(5.6,2.002,temperatureMoyenne,"Biere",glucoseDispo);

//Nous declarons nos Bacteries pour encapsuler
const lactobacillus = new Bacterie(7,2,temperatureIdealeLacto,"Lactobacillus");

//Creer un tableau de n case de 0 a n pour l'absice du graphique
function getLabels(n){
	tab = new Array(n);
	for(let i = 0 ; i < n ; i++){
		tab[i] = i+1;
	}
	return tab;
}
 
  //La fonction main
  function Start() {
    console.log("------La fonction Start-----");//Pour debuger

    //On recupere les valeurs entrees sur le HTML pour l'experience
    var nombreHeurs = document.querySelector('#time').valueAsNumber;
    var temperatureEau = document.querySelector('#temperatureEau').valueAsNumber;
    var temperatureLait = document.querySelector('#temperatureLait').valueAsNumber;
    var temperatureBiere = document.querySelector('#temperatureBiere').valueAsNumber;

    eau.temperature = temperatureEau;
    lait.temperature = temperatureLait;
    biere.temperature = temperatureBiere;
    

    console.log("Nombre Heurs: "+nombreHeurs+"\n");//Pour debuger
    console.log("Temperature Eau: "+temperatureEau+"\n");//Pour debuger
    console.log("Temperature Lait: "+temperatureLait+"\n");//Pour debuger
    console.log("Temperature Biere: "+temperatureBiere+"\n");//Pour debuger

    //On iniitialise l'experience
    var exp = new Experience(nombreHeurs,[eau,lait,biere],[lactobacillus],7);
    var tabeau = exp.resultatS;


    //On trace le graphique

    var tempLabels = getLabels(nombreHeurs);//On creer le tableau des x
    var ctx1 = document.getElementById('graphique1').getContext('2d');
    var ctx2 = document.getElementById('graphique2').getContext('2d');
    var data = {
    	labels : tempLabels, //x
    	datasets : tabeau //y
    }

    var options = { 
    	responsive : false
    }

    var config1  = { 
    	type : 'line',
    	data : data,
    	options : options
    	}

    var config2  = { 
    	type : 'bar',
    	data : data,
    	options : options
    	}
    var graph1 = new Chart(ctx1,config1);
    var graph2 = new Chart(ctx2,config2);
}