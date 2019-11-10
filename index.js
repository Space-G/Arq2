class BHT{
	constructor(m,n){
		this.m = m;
		this.n = n;
		this.tableSize = Math.pow(2, m);
		this.historico = new Array(this.tableSize);
		(n == 1) ? this.historico.fill(1) : this.historico.fill(2);
		this.hits = new Array(this.tableSize);
		this.hits.fill(0);
		this.miss = new Array(this.tableSize);
		this.miss.fill(0);
	}

	doTheThing(endereco, resultado){
		let predPos = (parseInt(endereco, 16) >>> 2) % this.tableSize;
		let predicao = this.historico[predPos];
		let allHist = "";
		for (let b = 0; b<this.tableSize; b++){
			allHist+=dec2bin(this.historico[b]);
			allHist+=' ';
		}
		console.log("Endereco: "+endereco);
		console.log("Resultado: "+resultado);
		console.log("predPos: "+predPos);
		console.log("Predicao: "+predicao);
		console.log("Historico: "+allHist);
		
		//preditor de 1 bit
		if(this.n == 1){
			//acertou a predicao
			if ((predicao == 0 && (resultado == "N" || resultado == 0))||(predicao == 1 && (resultado == "T" || resultado == 1))){
				this.hits[predPos]++;
			}
			//errou a predicao
			else {
				this.miss[predPos]++;
				(predicao == 0) ? this.historico[predPos] = 1 : this.historico[predPos] = 0;
			}
		}
		//preditor de 2 bits
		else {
			//acertou a predicao
			if ((predicao <= 1 && (resultado == "N" || resultado == 0)) || (predicao >= 2 && (resultado == "T" || resultado == 1))){
				this.hits[predPos]++;
				if (predicao == 1){
					this.historico[predPos] = 0;
				}
				else if (predicao == 2){
					this.historico[predPos] = 3;
				}
			}
			//errou a predicao
			else {
				this.miss[predPos]++;
				if (predicao <= 1){
					this.historico[predPos]++;
				}
				else {
					this.historico[predPos]--;
				}
			}
		}
		
		if (predicao == 0){
			predicao = "N";
		}
		else if ((predicao == 1 && n == 1) || predicao == 3){
			predicao = "T";
		}
		else if (predicao == 1){
			predicao = "N*";
		}
		else if (predicao == 2){
			predicao = "T*";
		}
		else {
			predicao = "errado";
		}
		
		let historico = this.historico[predPos];
		
		if (historico == 2){
			historico = "T,N";
		}
		else if (historico == 3){
			historico = "T,T";
		}
		else if (historico == 0 && n == 1){
			historico = "N";
		}
		else if (historico == 1 && n == 1){
			historico = "T";
		}
		else if (historico == 0){
			historico = "N,N";
		}
		else if (historico == 1){
			historico = "N,T";
		}
		
		document.getElementById("myTable").rows[predPos+1].cells[1].innerHTML = endereco;
		document.getElementById("myTable").rows[predPos+1].cells[2].innerHTML = historico;
		document.getElementById("myTable").rows[predPos+1].cells[3].innerHTML = resultado;
		document.getElementById("myTable").rows[predPos+1].cells[4].innerHTML = predicao;
		document.getElementById("myTable").rows[predPos+1].cells[5].innerHTML = this.hits[predPos];
		document.getElementById("myTable").rows[predPos+1].cells[6].innerHTML = this.miss[predPos];
		document.getElementById("myTable").rows[predPos+1].cells[7].innerHTML = this.getPercent(predPos);
		
		
		/*
		if ((predicao <= 1 && resultado == "N") || (predicao >= 2 && resultado == "T")){
			this.hits[this.historico[histIndex]] += 1;
		} else {
			this.miss[this.historico[histIndex]] += 1;
		}

		var posCounter = this.historico[histIndex];

		if (resultado == "T"){
			if (document.getElementById("bitch").value == 2){
				if (predicao == 0){
					this.counter[posCounter] = 1;
				} else{
					this.counter[posCounter] = 3;
				}
			} else {
				this.counter = 1;
			}
			this.historico[histIndex] = (this.historico[histIndex] >>> 1) + Math.pow(2, (this.n - 1));
		} else {
			if(document.getElementById("bitch").value == 2){
				if (predicao == 3){
					this.counter[posCounter] = 2;
				} else{
					this.counter[posCounter] = 0;
				}
			} else{
				this.counter = 0;
			}
			this.historico[histIndex] = (this.historico[histIndex] >>> 1);
		}
		console.log("Predicao: "+predicao);
		(predicao<=1) ? predicao='N' : predicao='T';
		hist = "";
		console.log("Bitch: "+this.bitch);
		for(let i = 0; i < this.bitch; i++){
			(this.historico[histIndex][i] == '0') ? hist+="N," : hist+="T,";
		}
		let hist2 = "";
		for(let i = 0; i < hist.length-1; i++){
			hist2+=hist[i];
		}
		console.log(hist2);
		document.getElementById("myTable").rows[histIndex+1].cells[1].innerHTML=endereco;
		document.getElementById("myTable").rows[histIndex+1].cells[2].innerHTML=this.historico[histIndex];
		document.getElementById("myTable").rows[histIndex+1].cells[3].innerHTML=resultado;
		document.getElementById("myTable").rows[histIndex+1].cells[4].innerHTML=predicao;
		*/
	}

	getPercent(predPos){
		return parseInt(this.hits[predPos]/(this.hits[predPos] + this.miss[predPos])*100);
	}

	getHits(){
		return this.hits[this.historico[histIndex]];
	}

	getMiss(){
		return this.miss[this.historico[histIndex]];
	}
}

var fileAsString = Array();
var lineNumber = -1;
let bht;
var done = false;

function dec2bin(dec) {
	var binario = dec >= 0 ? dec.toString(2) : (~dec).toString(2);
	return ("0".repeat(this.n) + binario).substr(-this.n);
}

/*document.getElementById('file').onchange = function(){
	var file = this.files[0];
	bht = new BHT(getElementById("m").value, getElementById("n").value);

	var reader = new FileReader();
	reader.onload = function(){
		lineNumber = -1;
		fileAsString = this.result.split('\n');
	};
	reader.readAsText(file);

}*/

function fileRead(){
	let file = document.getElementById("file-id").files[0];
	let reader = new FileReader();
	reader.onload = function(){
		lineNumber = -1;
		fileAsString = this.result.split('\n');
	};
	reader.readAsText(file);
}

function computeLine(){ // não chamem isso, front!!!!!!!
	var line = fileAsString[lineNumber].split(' ');
	bht.doTheThing(line[0], line[1]);
}

function go(){
	//mudar os hidden;
	let menu1 = document.getElementById("menu-1");
	let menu2 = document.getElementById("menu-2");
	menu1.hidden = "hidden";
	menu2.hidden = "";
	let table = document.getElementById("myTable");
	let m = document.getElementById("m").value;
	let n = document.getElementById("n").value;
	let m2 = 1;
	
	fileRead();
	
	bht = new BHT(m, n);
	for (let i=0; i<m; i++){
		m2*=2;
	}
	
	for (let i=0; i<m2; i++){
		let row = table.insertRow(table.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		let cell6 = row.insertCell(5);
		let cell7 = row.insertCell(6);
		let cell8 = row.insertCell(7);
		
		let index = dec2bin(i).toString();
		
		while (index.length < m){
			index = "0" + index;
		}
		
		cell1.innerHTML = index;
		cell2.innerHTML = "";
		cell3.innerHTML = "";
		cell4.innerHTML = "";
		cell5.innerHTML = "";
		cell6.innerHTML = "";
		cell7.innerHTML = "";
		cell8.innerHTML = "";
	}
}
function updateRowInTable(){
	lineNumber += 1;
	if (lineNumber >= fileAsString.length){
		done = true;
	} else {
		computeLine();
		done = false;
	}
}
