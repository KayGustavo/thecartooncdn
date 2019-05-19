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
      var conteudoClass = conteudoSchedule[0].ageRating;
      if (conteudoClass == "1") conteudoClass = "LIVRE";
      else if (conteudoClass != "1") conteudoClass = conteudoClass + ' ANOS';
      console.log(conteudoTitulo);
      document.getElementById("showBanner").src = conteudoBanner;
      document.getElementById("titulo").innerHTML = 'Título: ' + conteudoTitulo;
      document.getElementById("clas").innerHTML = 'Classificação: ' + conteudoClass;
    }
  };
  xhttp.open("GET", apiUrl, true);
  xhttp.send();
  setTimeout(getonairLoop, 10000);
}

getonairLoop()
}
