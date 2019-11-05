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
            if (predicao < 3){
                this.counter[posCounter]++;
            }
            this.historico[histIndex] = (this.historico[histIndex] >>> 1) + Math.pow(2, (this.n - 1));
        } else {
            if (predicao > 0){
                this.counter[posCounter]--;
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

function nextLine(){
    lineNumber += 1;
    if (lineNumber >= fileAsString.length){
        done = true;
    } else {
        computeLine();
        done = false;
    }
}