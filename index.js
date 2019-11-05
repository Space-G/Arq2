class BHT{
	constructor(m,n){
		this.m = m;
		this.address = Array();
		this.pred = Array();
		this.hist = Array();
		this.hits = Array();
		this.miss = Array();
	}

	doTheThing(endereco, resultado){
		let predicao = 0;
		if(!this.address.includes(endereco)){
			this.address.push(endereco);
			this.pred.push(2);
		}
		let pos = ((parseInt(endereco, 16) >>> 2) % Math.pow(2,this.m)) + 1;
		console.log(pos);
		predicao = this.pred[pos];
		document.getElementById("myTable").rows[pos].cells[3].innerHTML=resultado;
		let end = document.getElementById("myTable").rows[pos].cells[1].innerHTML;
		console.log(end);
		if(endereco !== end){
			predicao=2;
			this.pred[pos]=2;
		}
		console.log("Predicao: "+predicao);
		console.log("Resultado: "+resultado);
		if ((predicao <= 1 && resultado == 'N') || (predicao >= 2 && resultado == 'T')){
			if(predicao == 1){
				this.pred[pos] -= 1;
			} else if (predicao == 2){
				this.pred[pos] += 1;
			}
			this.hits[pos] += 1;
		} else {
			if(predicao == 0){
				this.pred[pos] += 1;
			} else if (predicao == 1){
				this.pred[pos] += 2;
			} else if (predicao == 2){
				this.pred[pos] -= 2;
			} else {
				this.pred[pos] -= 1;
			}
			this.miss[pos] += 1;
		}
		if(this.pred[pos]==0){
			this.hist[pos]="N,N";
		}
		else if(this.pred[pos]==1){
			this.hist[pos]="N,T";
		}
		else if(this.pred[pos]==2){
			this.hist[pos]="T,N";
		}
		else{
			this.hist[pos]="T,T";
		}
		document.getElementById("myTable").rows[pos].cells[1].innerHTML=endereco;
		(predicao<=1) ? predicao="NT" : predicao="T";
		document.getElementById("myTable").rows[pos].cells[4].innerHTML=predicao;
		document.getElementById("myTable").rows[pos].cells[2].innerHTML= this.hist[pos];
	}

	getPercent(){
		return parseInt(this.hits/(this.hits + this.miss)*100);
	}

	getHits(){
		return this.hits;
	}

	getMiss(){
		return this.miss;
	}
}

let bht;
let fileAsString = Array();
let lineNumber = -1;
let done = false;
let line;

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
	line = fileAsString[lineNumber].split(' ');
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
		
		let e = 0;
		let aux = i;
		
		for (let j=0; j<m; j++){
			e+=aux%2*Math.pow(10,m);
			aux=parseInt(aux/2);
			e=parseInt(e/10);
		}
		
		cell1.innerHTML = e;
		cell2.innerHTML = "";
		cell3.innerHTML = "T,N";
		cell4.innerHTML = "";
		cell5.innerHTML = "";
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