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
      console.log(conteudoTitulo);
      document.getElementById("showBanner").src = conteudoBanner;
      document.getElementById("av").innerHTML = 'teste ' + conteudoTitulo;
    }
  };
  xhttp.open("GET", apiUrl, true);
  xhttp.send();
  setTimeout(getonairLoop, 10000);
}

getonairLoop()
}
