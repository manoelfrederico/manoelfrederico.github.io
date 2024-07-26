let numero1, numero2;
let min1=0, max1=9;
let min2=0, max2=9;
let acertos=0;
let erros=0;

function getParametro(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

function body_onload() {
    document.querySelector("#comecar").style.visibility = 'visible';
    document.querySelector("#confirmar").style.visibility = 'hidden';
    document.querySelector("#resposta").style.visibility = 'hidden';
    document.querySelector("#sonic").style.visibility = 'hidden';
    document.querySelector("#eggman").style.visibility = 'hidden';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('min1'))
        min1 = parseInt(urlParams.get('min1'));
    if (urlParams.get('min2'))
        min2 = parseInt(urlParams.get('min2'));
    if (urlParams.get('max1'))
        max1 = parseInt(urlParams.get('max1'));
    if (urlParams.get('max2'))
        max2 = parseInt(urlParams.get('max2'));
//    console.log('min,max',min+','+max)
//    console.log('min+max',max+min+1)
}

function comecar() {
    document.querySelector("#comecar").style.visibility = 'hidden';
    document.querySelector("#confirmar").style.visibility = 'visible';
    document.querySelector("#resposta").style.visibility = 'visible';
    document.querySelector("#resposta").focus();
    document.querySelector("#sonic").style.visibility = 'hidden';
    document.querySelector("#eggman").style.visibility = 'hidden';

    numero1 = Math.floor(Math.random() * (max1-min1+1))+min1;
    numero2 = Math.floor(Math.random() * (max2-min2+1))+min2;
    document.querySelector("#conta").innerHTML = numero1+" x "+numero2;
}

function confirmar() {
    document.querySelector("#comecar").style.visibility = 'visible';
    document.querySelector("#confirmar").style.visibility = 'hidden';
    document.querySelector("#resposta").style.visibility = 'hidden';
    if (document.querySelector("#resposta").value == (numero1*numero2)) {
        document.querySelector("#conta").innerHTML = "CERTO";
        document.querySelector("#sonic").style.visibility = 'visible';
            acertos++;  
    } else {
        document.querySelector("#conta").innerHTML = "ERRADO: " + numero1+" x "+numero2+"="+ (numero1 * numero2);
        document.querySelector("#eggman").style.visibility = 'visible';
        erros++;
    }
    document.querySelector("#resposta").value = "";
    document.querySelector("#resumo").innerHTML = "acertos("+acertos+") erros("+erros+")";
}