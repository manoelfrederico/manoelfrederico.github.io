let numero1, numero2;
let min1=0, max1=9;
let min2=0, max2=9;
let acertos=0;
let erros=0;
let horaInicial = new Date().getTime();

var dif = Math.round((_final - _initial) / (1000 * 60));

function getParametro(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

 function input(e) {
    var tbInput = document.getElementById("resposta");
    tbInput.value = tbInput.value + e.value;
}

function del() {
    var tbInput = document.getElementById("resposta");
    tbInput.value = tbInput.value.substr(0, tbInput.value.length - 1);
}

function image(certo) {
    nome = '';
    maxImagens = 10;
    minImagens = 1;
    if (certo) {
        nome += 'c';
    } else {
        nome += 'e';
    }
    aletorio = Math.floor(Math.random() * (maxImagens-minImagens+1))+minImagens;
    nome += aletorio + ".gif";
    document.getElementById("certoErrado").src=nome;
}

function body_onload() {
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
    document.querySelector("#VirtualKey").style.visibility = 'visible';
    document.querySelector("#resposta").style.visibility = 'visible';
    document.querySelector("#comecar").style.visibility = 'hidden';
    document.querySelector("#certoErrado").style.visibility = 'hidden';

    numero1 = Math.floor(Math.random() * (max1-min1+1))+min1;
    numero2 = Math.floor(Math.random() * (max2-min2+1))+min2;
    document.querySelector("#conta").innerHTML = numero1+" x "+numero2;
}

function confirmar() {
    document.querySelector("#VirtualKey").style.visibility = 'hidden';
    document.querySelector("#resposta").style.visibility = 'hidden';
    document.querySelector("#comecar").style.visibility = 'visible';
    document.querySelector("#certoErrado").style.visibility = 'visible';
    if (document.querySelector("#resposta").value == (numero1*numero2)) {
        document.querySelector("#conta").innerHTML = "CERTO";
        acertos++;
        image(true); 
    } else {
        document.querySelector("#conta").innerHTML = "ERRADO: " + numero1+" x "+numero2+"="+ (numero1 * numero2);
        erros++;
        image(false); 
    }
    document.querySelector("#resposta").value = "";

    var timestampGasto = Math.round((new Date().getTime() - horaInicial)/1000);
    var segGastos = timestampGasto % 60;
    var minGastos = Math.round(timestampGasto / 60);
    var horaGastos = Math.round(minGastos / 60);
    var tempoGasto = String(horaGastos).padStart(2,'0') + ":" + String(minGastos).padStart(2,'0') + ":" + String(segGastos).padStart(2,'0');
    document.querySelector("#resumo").innerHTML = "acertos("+acertos+") erros("+erros+") tempo="+tempoGasto;
}