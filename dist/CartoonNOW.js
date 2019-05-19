window.onload = function() {
function getonairLoop(){
  var apiUrl = 'https://www.nowonline.com.br/avsclient/epg/livechannels/cartoon-network?channel=PCTV&numberOfSchedules=1&includes=images'
  var xhttp = new XMLHttpRequest();
  var sweet = document.getElementsByClassName('sweet')[0];
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var conteudo = JSON.parse(this.responseText);
      var conteudoRoot = conteudo.response[0];
      var conteudoSchedule = conteudoRoot.schedules;
      var conteudoTitulo = conteudoSchedule[0].title;
      var conteudoBanner = conteudoSchedule[0].images.banner;
      var conteudoClass = parseInt(conteudoSchedule[0].ageRating);
      var conteudoInicio = parseInt(conteudoSchedule[0].startTime;);
      var conteudoFim = conteudoSchedule[0].endTime;
      if (conteudoClass == "1") conteudoClass = "LIVRE";
      else if (conteudoClass != "1") conteudoClass = conteudoClass + ' ANOS';
      console.log(conteudoTitulo);
      document.getElementById("showBanner").src = conteudoBanner;
      document.getElementById("titulo").innerHTML = 'Título: ' + conteudoTitulo;
      document.getElementById("clas").innerHTML = 'Classificação: ' + conteudoClass;
      document.getElementById("come").innerHTML = 'Início: ' + new Date(conteudoInicio).toLocaleString('en-GB', { hour:'numeric', minute:'numeric', second:'numeric', hour12:false } );
      document.getElementById("fim").innerHTML = 'Fim: ' + new Date(conteudoFim).toLocaleString('en-GB', { hour:'numeric', minute:'numeric', second:'numeric', hour12:false } );
    }
  };
  xhttp.open("GET", apiUrl, true);
  xhttp.send();
  setTimeout(getonairLoop, 10000);
}

getonairLoop()
}
