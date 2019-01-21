var nroPergunta = $("#numero-pergunta").text();
var tempo;
var idInterval;
var pergunta;
var indicePergunta = perguntas.length - 1;
var acertos = 0;
var tempoPlacar = 0;
var posicao = 1;
var jogador;
var ranking = [];
var cronometro;
shuffle(perguntas);

$(function(){
    encerrarJogo(idInterval);
    $("#modal-comecar").css("display", "block");
//    $("#cronometro").css("display", "none");
    
    $("#botao-comecar").on("click", function(){
        
        if($("#nome").val() == ""){
            $("#nome").addClass("borda-vermelha");
            setInterval(function(){
                $("#nome").removeClass("borda-vermelha");
            }, 1000);
        }else{        
            $("#modal-comecar").css("display", "none");
            $("#modal-contagem").css("display", "block");
            $("#cronometro").css("display", "block");
            nroPergunta = 1
            $("#numero-pergunta").text(nroPergunta);
            indicePergunta = perguntas.length - 1;

            setTimeout(function(){
                jogador = $("#nome").val();
                $("#modal-contagem").css("display", "none");
                idInterval = iniciarJogo();
                $("html").css("overflow", "auto");
            }, 4700);

            cronometro = 4;
            var novoId = setInterval(function(){
                cronometro--;
                $("#cronometro").text(cronometro);            
                if(cronometro == 0){
                    clearInterval(novoId);
                }
            }, 1000);    
        }
    });
    
    $("#alternativas").find(".alternativa").on("click", function(event){
            alternativa = event.target.textContent;

            if(alternativa == pergunta.alternativaCorreta){
                respostaCorreta(event);
                clearInterval(idInterval);

                acertos = acertos + 10;
                tempoPlacar = tempoPlacar + (15 - tempo);
                setTimeout(function(){
                    trocaPergunta();    

                }, 700);


            }else if(alternativa != pergunta.alternativaCorreta){
                respostaErrada(event);
                clearInterval(idInterval);
                tempoPlacar = tempoPlacar + (15 - tempo);
                setTimeout(function(){
                    trocaPergunta();    
                }, 700);

            }else{
                clearInterval(idInterval);
            }
        });   
    reiniciarJogo();
});
    
function carregaPergunta(){
    pergunta = perguntas[indicePergunta];
    indicePergunta--;

    return pergunta;    
}

function iniciarJogo(){
    location.href = "#relogio";

    var id = iniciarTempo();     
    pergunta = carregaPergunta();
    var alternativas = shuffle(pergunta.alternativas);
    
    var alternativasHtml = document.querySelectorAll(".alternativa");
    
    $("#pergunta-jogo").text(pergunta.enunciado);
    
    var i = 0;
    $.each(alternativasHtml, function(index, alternativa){
        alternativa.textContent = alternativas[i];
        i++;
    });    
    return id;    
}

function trocaPergunta(){
    nroPergunta++;
    var alternativasHtml = document.querySelectorAll(".alternativa");

    if(nroPergunta > 10){
        ranking.push({"usuario": jogador, "pontos":acertos, "tempo": tempoPlacar + "s"})        
        var rankingOrdenado = rankear(ranking);
        $("#placar").find("tbody").find("tr").remove();
        $.each(rankingOrdenado, function(index, posicao){
            gerarRanking(index + 1, posicao.usuario, posicao.pontos, posicao.tempo);
        });
        location.href = "#placar";
        $("#numero-pergunta").text(0);
        $("#pergunta-jogo").text("");
        $("#tempo").text(0);
        
        var alternativasHtml = $(".alternativa");

        var i = 0;
        $.each(alternativasHtml, function(index, alternativa){
            alternativa.textContent = "";
            i++;
        });    
        
        clearInterval(idInterval);
        
    }else{       
        pergunta = carregaPergunta();
        var alternativas = shuffle(pergunta.alternativas);
        $("#numero-pergunta").text(nroPergunta)
        $("#pergunta-jogo").text(pergunta.enunciado);
        
        var i = 0;
        $.each(alternativasHtml, function(index, alternativa){
            alternativa.textContent = alternativas[i];
            i++;
        }); 
        iniciarTempo();
    }
}

function rankear(ranking){
    var n = ranking.length; 
    for (var i = 0; i < n-1; i++){
        for (var j = 0; j < n-i-1; j++){
            if (ranking[j].pontos < ranking[j+1].pontos) 
            { 
                var temp = ranking[j]; 
                ranking[j] = ranking[j+1]; 
                ranking[j+1] = temp; 
            }    
        }
    }
    return ranking;
}

function gerarRanking(posicao, usuario, nroAcertos, tempo){
    var linha = $("<tr>");
    var colunaPosicao = $("<td>").text(posicao);
    var colunaUsuario = $("<td>").text(usuario);
    var colunaAcertos = $("<td>").text(nroAcertos);
    var colunaTempo = $("<td>").text(tempo);

    linha.append(colunaPosicao);
    linha.append(colunaUsuario);
    linha.append(colunaAcertos);
    linha.append(colunaTempo);

    $("#placar").find("tbody").append(linha);
}

function respostaCorreta(event){ 
    event.target.classList.add("borda-verde");
    
    setInterval(function(){
        event.target.classList.remove("borda-verde");
    }, 700);
    console.log(event.target);
}

function respostaErrada(event){    
    event.target.classList.add("borda-vermelha");     
    
    setInterval(function(){
        event.target.classList.remove("borda-vermelha");  
    }, 700);
}

function iniciarTempo(){   
    clearInterval(idInterval);
    tempo = 15;
    idInterval = setInterval(function(){
        tempo--;
        $(".contagem-regressiva").text(tempo);
        if(tempo <= 5 && tempo%2 == 0){
           $("#jogo").addClass("borda-fade-on");
           $("#jogo").removeClass("borda-fade-out");
           
        }else{
            $("#jogo").addClass("borda-fade-out");
            $("#jogo").removeClass("borda-fade-on");
        }
        
        if(tempo < 1){
            clearInterval(idInterval);
            trocaPergunta();
            tempoPlacar = tempoPlacar + 10;
        }        
    }, 1000);
    
    encerrarJogo(idInterval);
    return idInterval;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function reiniciarJogo(){
    $("#reiniciar").on('click', function(){
        $("#modal-contagem").css("display", "block");
        $("#numero-pergunta").text(0);
        $("#pergunta-jogo").text("");
        $("#tempo").text(0);
        $("#cronometro").css("display", "none");
        tempo = 0;
        tempoPlacar = 0;
        var alternativasHtml = $(".alternativa");

        var i = 0;
        $.each(alternativasHtml, function(index, alternativa){
            alternativa.textContent = "";
            i++;
        });    
        
        clearInterval(idInterval);

        setTimeout(function(){
            shuffle(perguntas);
            acertos = 0;
            resetaNroPergunta();
            resetaNroArray();
            $("#modal-contagem").css("display", "none");
            idInterval = iniciarJogo();
            $("html").css("overflow", "auto");
        }, 4700);
        
        cronometro = 4;
        var novoId = setInterval(function(){
            $("#cronometro").css("display", "block");
            cronometro--;
            $("#cronometro").text(cronometro);            
            if(cronometro == 0){
                clearInterval(novoId);
            }
        }, 1000);
    });
}

function resetaNroPergunta(){
    nroPergunta = 1;
    $("#numero-pergunta").text(nroPergunta);

} 

function resetaNroArray(){
    indicePergunta = perguntas.length - 1
}

function encerrarJogo(id){
    $("#encerrar-jogo").click(function(){
        location.href = "#relogio";
        tempo = 15;
        acertos = 0;
        tempoPlacar = 0;
        $("#numero-pergunta").text(0);
        $("#pergunta-jogo").text("");
        $("#tempo").text(0);
        $("#cronometro").css("display", "none");
        var alternativasHtml = $(".alternativa");

        var i = 0;
        $.each(alternativasHtml, function(index, alternativa){
            alternativa.textContent = "";
            i++;
        });    
        clearInterval(id);
        $("#modal-encerrado").css("display", "block");
        $("#botao-recomecar").click(function(){
            $("#modal-encerrado").css("display", "none");
            $("#modal-comecar").css("display", "block");
        });
    });
}