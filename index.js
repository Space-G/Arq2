class BHT{
    constructor(m,n){
        this.m = m;
        this.historicoTableSize = Math.pow(2, m);
        this.historico = new Array(this.historicoTableSize);
        this.historico.fill(0);
        this.n = n;
        this.counterSize = Math.pow(2, n);
        this.counter = new Array(this.counterSize).fill(2);
        this.hits = 0;
        this.miss = 0;
    }

    doTheThing(endereco, resultado){
        var histIndex = (parseInt(endereco, 16) >>> 2) % this.historicoTableSize;
        var predicao = this.counter[this.historico[histIndex]];

        if ((predicao <= 1 && resultado == "N") || (predicao >= 2 && resultado == "T")){
            this.hits += 1;
        } else {
            this.miss += 1;
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

var fileAsString = Array();
var lineNumber = -1;
var bht = new BHT(1, 1);
var done = false;

document.getElementById('file').onchange = function(){
    var file = this.files[0];
    bht = new BHT(getElementById("m").value, getElementById("n").value);

    var reader = new FileReader();
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