let numero1, numero2;
let min=0, max=9;
let acertos=0;
let erros=0;

function body_onload() {
    document.querySelector("#comecar").style.visibility = 'visible';
    document.querySelector("#confirmar").style.visibility = 'hidden';
    document.querySelector("#resposta").style.visibility = 'hidden';
    document.querySelector("#sonic").style.visibility = 'hidden';
    document.querySelector("#eggman").style.visibility = 'hidden';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('min'))
        min = parseInt(urlParams.get('min'));
    if (urlParams.get('max'))
        max = parseInt(urlParams.get('max'));
    console.log('min,max',min+','+max)
    console.log('min+max',max+min+1)
}

function comecar() {
    document.querySelector("#comecar").style.visibility = 'hidden';
    document.querySelector("#confirmar").style.visibility = 'visible';
    document.querySelector("#resposta").style.visibility = 'visible';
    document.querySelector("#resposta").focus();
    document.querySelector("#sonic").style.visibility = 'hidden';
    document.querySelector("#eggman").style.visibility = 'hidden';

    numero1 = Math.floor(Math.random() * (max-min+1))+min;
    numero2 = Math.floor(Math.random() * (max-min+1))+min;
    document.querySelector("#conta").innerHTML = numero1+"+"+numero2;
}

function confirmar() {
    document.querySelector("#comecar").style.visibility = 'visible';
    document.querySelector("#confirmar").style.visibility = 'hidden';
    document.querySelector("#resposta").style.visibility = 'hidden';
    if (document.querySelector("#resposta").value == (numero1+numero2)) {
        document.querySelector("#conta").innerHTML = "CERTO";
        document.querySelector("#sonic").style.visibility = 'visible';
            acertos++;  
    } else {
        document.querySelector("#conta").innerHTML = "ERRADO: " + numero1+"+"+numero2+"="+ (numero1+numero2);
        document.querySelector("#eggman").style.visibility = 'visible';
        erros++;
    }
    document.querySelector("#resposta").value = "";
    document.querySelector("#resumo").innerHTML = "acertos("+acertos+") erros("+erros+")";
}