class BHT{
    constructor(m,n){
        this.m = m;
        this.historicoTableSize = 2 ** m;
        this.historico = new Array(this.historicoTableSize).fill(0);
        this.n = n;
        this.counterSize = 2 ** n;
        this.counter = new Array(this.counterSize).fill(2);
        this.hits = 0;
        this.miss = 0;
    }

    doTheThing(endereco, resultado){
        histIndex = (parseInt(endereco, 16) >>> 2) % m;
        predicao = counter[historico[histIndex]];

        if ((predicao <= 1 && resultado == 'n') || (predicao >= 2 && resultado == 't')){
            this.hits += 1;
        } else {
            this.miss += 1;
        }

        if (resultado == 't'){
            this.counter[historico[histIndex]] += (predicao < 4) ? 1 : 0;
            this.historico[histIndex] = (historico[histIndex] >>> 1) + (2 ** (n - 1));
        } else {
            this.counter[historico[histIndex]] -= (predicao > 0) ? 1 : 0;
            this.historico[histIndex] = (historico[histIndex] >>> 1);
        }
    }
}