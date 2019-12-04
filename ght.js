// class GHT{
//     constructor(m,n){
//         this.m = m;
//         this.n = n;
//         this.tableSize = Math.pow(2, m);
//         this.estado = new Array(this.tableSize);
//         this.historico = 0;
//         (this.n == 1) ? this.estado.fill(1) : this.estado.fill(2);
//         this.hits = new Array(this.tableSize);
//         this.hits.fill(0);
//         this.hitsGeral = 0;
//         this.miss = new Array(this.tableSize);
//         this.miss.fill(0);
//         this.missGeral = 0;
//         this.animationQueue = new Array(this.tableSize);
//     }
//
//     doTheThing(endereco, resultado){
//         let predicao = this.estado[this.historico];
//         /*
//         let allHist = "";
//         for (let b = 0; b<this.tableSize; b++){
//             allHist+=dec2bin(this.estado[b]);
//             allHist+=' ';
//         }*/
//
//         let hueAux = 116;
//
//         //preditor de 1 bit
//         if(this.n == 1){
//             //acertou a predicao
//             if ((predicao == 0 && (resultado == "N" || resultado == 0))||(predicao == 1 && (resultado == "T" || resultado == 1))){
//                 this.hits[this.historico]++;
//                 this.hitsGeral++;
//             }
//             //errou a predicao
//             else {
//                 this.miss[this.historico]++;
//                 this.missGeral++;
//                 (predicao == 0) ? this.estado[this.historico] = 1 : this.estado[this.historico] = 0;
//                 hueAux = 0;
//             }
//         }
//         //preditor de 2 bits
//         else {
//             //acertou a predicao
//             if ((predicao <= 1 && (resultado == "N" || resultado == 0)) || (predicao >= 2 && (resultado == "T" || resultado == 1))){
//                 this.hits[this.historico]++;
//                 this.hitsGeral++;
//                 if (predicao == 1){
//                     this.estado[this.historico] = 0;
//                 }
//                 else if (predicao == 2){
//                     this.estado[this.historico] = 3;
//                 }
//             }
//             //errou a predicao
//             else {
//                 hueAux = 0;
//                 this.miss[this.historico]++;
//                 this.missGeral++;
//                 if (predicao <= 1){
//                     this.estado[this.historico]++;
//                 }
//                 else {
//                     this.estado[this.historico]--;
//                 }
//             }
//         }
//
//         if (predicao == 0){
//             predicao = "N";
//         }
//         else if ((predicao == 1 && this.n == 1) || predicao == 3){
//             predicao = "T";
//         }
//         else if (predicao == 1){
//             predicao = "N*";
//         }
//         else if (predicao == 2){
//             predicao = "T*";
//         }
//         else {
//             predicao = "errado";
//         }
//
//         let estado = this.estado[this.historico];
//
//         if (estado == 2){
//             estado = "T*";
//         }
//         else if (estado == 3){
//             estado = "T";
//         }
//         else if (estado == 0 && this.n == 1){
//             estado = "N";
//         }
//         else if (estado == 1 && this.n == 1){
//             estado = "T";
//         }
//         else if (estado == 0){
//             estado = "N";
//         }
//         else if (estado == 1){
//             estado = "N*";
//         }
//
//         (resultado == "N" || resultado == 0) ? resultado = "N" : resultado = "T";
//
//         document.getElementById("myTable").rows[this.historico+1].cells[1].innerHTML = endereco;
//         document.getElementById("myTable").rows[this.historico+1].cells[2].innerHTML = dec2bin(this.historico); // TODO: tem que remover essa coluna foda-se
//         document.getElementById("myTable").rows[this.historico+1].cells[3].innerHTML = estado;
//         document.getElementById("myTable").rows[this.historico+1].cells[4].innerHTML = resultado;
//         document.getElementById("myTable").rows[this.historico+1].cells[5].innerHTML = predicao;
//         document.getElementById("myTable").rows[this.historico+1].cells[6].innerHTML = this.hits[this.historico];
//         document.getElementById("myTable").rows[this.historico+1].cells[7].innerHTML = this.miss[this.historico];
//         document.getElementById("myTable").rows[this.historico+1].cells[8].innerHTML = this.getPercent(this.historico);
//         window.clearTimeout(this.animationQueue[this.historico]);
//         this.animationQueue[this.historico] = window.setTimeout("animar("+hueAux+", 50, "+ (this.historico+1) +")",7);
//
//         let resultAux = 0;
//         (resultado == 0 || resultado == "N") ? resultAux = 0 : resultAux = 1;
//         this.historico = (this.historico >>> 1) + (Math.pow(2, (this.m - 1)) * resultAux);
//         document.getElementById("GHT").innerText = dec2bin(this.historico);
//     }
//
//     getPercentGeral(){
//         if ((this.missGeral + this.hitsGeral) == 0){
//             return "Incalculável";
//         } else {
//             return parseInt((this.hitsGeral * 100) / (this.hitsGeral + this.missGeral));
//         }
//     }
//
//     getPercent(hist){
//         return parseInt(this.hits[hist]/(this.hits[hist] + this.miss[hist])*100);
//     }
//
//     getHits(){
//         return this.hits[this.estado[histIndex]];
//     }
//
//     getMiss(){
//         return this.miss[this.estado[histIndex]];
//     }
// }
//
// var fileAsString = Array();
// var lineNumber = -1;
// let ght;
// var done = false;
//
// function dec2bin(dec) {
//     var binario = dec >= 0 ? dec.toString(2) : (~dec).toString(2);
//     return ("0".repeat(this.n) + binario).substr(-this.n);
// }
//
// function fileRead(){
//     let file = document.getElementById("file-id").files[0];
//     let reader = new FileReader();
//     reader.onload = function(){
//         lineNumber = -1;
//         fileAsString = this.result.split('\n');
//     };
//     reader.readAsText(file);
// }
//
// function computeLine(){ // não chamem isso, front!!!!!!!
//     var line = fileAsString[lineNumber].split(' ');
//     if (line.length == 2){
//         ght.doTheThing(line[0], line[1].charAt(0));
//     } else {
//         done = true;
//         let next = document.getElementById("but-next");
//         let skip = document.getElementById("but-skip");
//         next.hidden = "hidden";
//         skip.hidden = "hidden";
//     }
//     document.getElementById("p_texto").innerHTML = "Porcentagem geral: " + ght.getPercentGeral() + "%";
// }
//
// function radio() {
//     var rbs = document.getElementsByName('n');
//     for (var i=0, iLen=rbs.length; i<iLen; i++) {
//         if (rbs[i].checked) {
//             return rbs[i].value;
//         }
//     }
// }
//
// function go(){
//     //mudar os hidden;
//     let menu1 = document.getElementById("menu-1");
//     let menu2 = document.getElementById("menu-2");
//     menu1.hidden = "hidden";
//     menu2.hidden = "";
//     let table = document.getElementById("myTable");
//     let m = document.getElementById("m").value;
//     let n = radio();
//     let m2 = 1;
//
//     fileRead();
//
//     ght = new GHT(m, n);
//     for (let i=0; i<m; i++){
//         m2*=2;
//     }
//
//     for (let i=0; i<m2; i++){
//         let row = table.insertRow(table.length);
//         let cell1 = row.insertCell(0);
//         let cell2 = row.insertCell(1);
//         let cell3 = row.insertCell(2);
//         let cell4 = row.insertCell(3);
//         let cell5 = row.insertCell(4);
//         let cell6 = row.insertCell(5);
//         let cell7 = row.insertCell(6);
//         let cell8 = row.insertCell(7);
//         let cell9 = row.insertCell(8);
//
//         let index = dec2bin(i).toString();
//
//         while (index.length < m){
//             index = "0" + index;
//         }
//
//         cell1.innerHTML = index;
//         cell2.innerHTML = "";
//         cell3.innerHTML = "";
//         cell4.innerHTML = "";
//         cell5.innerHTML = "";
//         cell6.innerHTML = "";
//         cell7.innerHTML = "";
//         cell8.innerHTML = "";
//         cell9.innerHTML = "";
//     }
//     document.getElementById("p_texto").innerHTML = "Porcentagem geral: " + ght.getPercentGeral();
// }
// function goBack(){
//     location.reload()
// }
// function skipAll(){
//     while (!done) {
//         updateRowInTable();
//     }
// }
// function updateRowInTable(){
//     lineNumber += 1;
//     if (lineNumber >= fileAsString.length){
//         done = true;
//     } else {
//         computeLine();
//         done = false;
//     }
// }
// function animar(hue, ilum, elementRow){
//     let element = document.getElementById("myTable").rows[elementRow];
//     ilum += 0.5;
//     let str = 'hsl(' + hue + ',100%,' + ilum + '%)';
//     element.style.backgroundColor = str;
//     let otherStr = "animar("+hue+", "+ilum+", "+elementRow+")";
//     if (ilum >= 90){
//         element.style.backgroundColor = 'hsl('+hue+',100%,90%)';
//     } else { ght.animationQueue[elementRow -1] = window.setTimeout(otherStr,5);}
// }

class GHT{
	constructor(indexBitsCount, patternBitsCount, counterBits){
		this.historyTable = new HashHistoryTable(indexBitsCount, patternBitsCount);
		this.patternTable = new PatternTable(patternBitsCount, counterBits);
		this.hits = 0;
		this.misses = 0;
	}
	
	getPatternIndex(memoryAddress){
		return this.historyTable.getPattern(memoryAddress);
	}
	
	getPatternPrediction(memoryAddress){
		return this.patternTable.getPredictionString(this.historyTable.getPattern(memoryAddress));
	}

	doTheThing(memoryAddress, resultadoNaoParseado){
		let resultado = (resultadoNaoParseado == 1 || resultadoNaoParseado == 'T');
		let pattern = this.historyTable.getPattern(memoryAddress);

		if (resultado == this.patternTable.getPrediction(pattern)){
			this.hits++;
		} else{
			this.misses++;
		}
		
		this.patternTable.updatePredictor(pattern, resultado);
		this.historyTable.updatePattern(memoryAddress, resultado);
		
	}

	getHistoryTable(){
		return this.historyTable;
	}

	getPatternTable(){
		return this.patternTable;
	}

	getPercent(){
		if ((this.misses + this.hits) == 0){
			return "Incalculável";
		} else {
			return parseInt((this.hits * 100) / (this.hits + this.misses));
		}
	}
	
	getHistoryIndex(memoryAddress){
		return this.historyTable.getIndex(memoryAddress);
	}
	
	getHistoryPattern(memoryAddress){
		return this.historyTable.getPatternString(memoryAddress);
	}
}

class HashHistoryTable{
	constructor(indexBitsCount, patternBitsCount){
		this.tableSize = Math.pow(2, indexBitsCount);
		this.patternBitsCount = patternBitsCount;
		this.patternMax = Math.pow(2, patternBitsCount);
		this.table = new Array(this.tableSize);
		for (let i = 0; i < this.table.length; i++){
			this.table[i] = [i, 0];
		}
	}
	
	getIndex(memoryAddress){
		return parseInt(memoryAddress, 16) % this.tableSize; // faz o hash
	}

	getPattern(memoryAddress){
		let index = parseInt(memoryAddress, 16) % this.tableSize; // faz o hash
		return this.table[index][1];
	}

	getPatternString(memoryAddress){
		let index = parseInt(memoryAddress, 16) % this.tableSize; // faz o hash
		let patternStr = dec2bin(this.table[index][1]).toString();
		while (patternStr.length < this.patternBitsCount){
			patternStr = '0' + patternStr;
		}
		return patternStr;
	}

	updatePattern(memoryAddress, lastChoice){
		let index = parseInt(memoryAddress, 16) % this.tableSize; // faz o hash
		this.table[index][0] = memoryAddress;
		this.table[index][1] = ((this.table[index][1] << 1) % this.patternMax) + (lastChoice ? 1 : 0);
	}
}

class PatternTable{
	constructor(patternBitsCount, counterBits){
		this.tableSize = Math.pow(2, patternBitsCount);
		this.table = new Array(this.tableSize);
		for (let i = 0; i < this.table.length; i++){
			this.table[i] = [i, new Counter(counterBits)];
		}
	}

	getPrediction(pattern){
		return this.table[pattern][1].getPrediction();
	}

	getPredictionString(pattern){
		return this.table[pattern][1].getString();
	}

	updatePredictor(pattern, choice){
		this.table[pattern][1].update(choice);
	}
}

class Counter{ // os preditores em sí
	constructor(bits){
		this.bits = bits;
		console.log(bits);
		if (this.bits == 2){
			this.counter = 2;
		} else{
			this.counter = 1;
		}
	}

	getString(){
		if (this.bits == 2) {
			switch (this.counter){
				case 0:
					return "NT";
					break;
				case 1:
					return "NT*";
					break;
				case 2:
					return "T*";
					break;
				case 3:
					return "T";
					break;
			}
		} else{
			if (this.counter == 0){
				return "NT";
			} else{
				return "T";
			}
		}
	}

	getPrediction(){
		if (this.bits == 2) {
			return (this.counter > 1);
		} else{
			return (this.counter > 0);
		}
	}

	update(choice){
		if (this.bits == 2){
			if (choice){ // tomado
				if (this.counter < 3){
					this.counter++;
				}
			} else{ // não tomado
				if (this.counter > 0){
					this.counter--;
				}
			}
		} else{
			if (choice){ // tomado
				this.counter = 1;
			} else{ // não tomado
				this.counter = 0;
			}
		}
	}
}

var fileAsString = Array();
var lineNumber = -1;
let ght;
var done = false;

function dec2bin(dec) {
	var binario = dec >= 0 ? dec.toString(2) : (~dec).toString(2);
	return ("0".repeat(this.n) + binario).substr(-this.n);
}

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
	if (line.length == 2){
		let address = line[0];
		let executed = line[1].charAt(0);
		let indexPattern = ght.getPatternIndex(address);
		let prediction = ght.getPatternPrediction(address);
		document.getElementById("patternTable").rows[indexPattern+1].cells[1].innerHTML = prediction;
		ght.doTheThing(address, executed);
		
		let historyIndex = ght.getHistoryIndex(address);
		let historyPattern = ght.getHistoryPattern(address);
		
		document.getElementById("histTable").rows[historyIndex+1].cells[1].innerHTML = address;
		document.getElementById("histTable").rows[historyIndex+1].cells[2].innerHTML = historyPattern;
		document.getElementById("patternTable").rows[indexPattern+1].cells[2].innerHTML = executed;
		document.getElementById("patternTable").rows[indexPattern+1].cells[3].innerHTML = prediction;
		
	} else {
		done = true;
		let next = document.getElementById("but-next");
		let skip = document.getElementById("but-skip");
		next.hidden = "hidden";
		skip.hidden = "hidden";
	}
	document.getElementById("p_texto").innerHTML = "Porcentagem geral: " + ght.getPercent() + "%";
}

function radio() {
	var rbs = document.getElementsByName('bit');
	for (var i=0, iLen=rbs.length; i<iLen; i++) {
		if (rbs[i].checked) {
			return rbs[i].value;
		}
	}
}

function go(){
	//mudar os hidden;
	let menu1 = document.getElementById("menu-1");
	let menu2 = document.getElementById("menu-2");
	menu1.hidden = "hidden";
	menu2.hidden = "";
	let table = document.getElementById("histTable");
	let pTable = document.getElementById("patternTable");
	let m = document.getElementById("m").value;
	let n = document.getElementById("n").value;
	let bit = radio();
	console.log(bit);
	let m2 = 1;
	let n2 = 1;

	fileRead();

	ght = new GHT(m, n, bit);
	for (let i=0; i<m; i++){
		m2*=2;
	}
	for (let i=0; i<n; i++){
		n2*=2;
	}

	for (let i=0; i<m2; i++){
		let row = table.insertRow(table.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);

		let index = dec2bin(i).toString();

		while (index.length < m){
			index = "0" + index;
		}

		cell1.innerHTML = index;
		cell2.innerHTML = "";
		cell3.innerHTML = "";
	}
	for (let i=0; i<n2; i++){
		let row = pTable.insertRow(pTable.length);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		
		let index = dec2bin(i).toString();
		
		while (index.length < n){
			index = "0" + index;
		}
		
		cell1.innerHTML = index;
		cell2.innerHTML = "";
		cell3.innerHTML = "";
		cell4.innerHTML = "";
	}
	
}
function goBack(){
	location.reload()
}
function skipAll(){
	while (!done) {
		updateRowInTable();
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
function animar(hue, ilum, elementRow){
	let element = document.getElementById("histTable").rows[elementRow];
	ilum += 0.5;
	let str = 'hsl(' + hue + ',100%,' + ilum + '%)';
	element.style.backgroundColor = str;
	let otherStr = "animar("+hue+", "+ilum+", "+elementRow+")";
	if (ilum >= 90){
		element.style.backgroundColor = 'hsl('+hue+',100%,90%)';
	} else { ght.animationQueue[elementRow -1] = window.setTimeout(otherStr,5);}
}