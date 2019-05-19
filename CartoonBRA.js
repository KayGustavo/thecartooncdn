function getonairLoop(){
  var xhttp = new XMLHttpRequest();
  var sweet = document.getElementsByClassName('sweet')[0];
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      conteudo = JSON.parse(this.responseText);
      document.getElementById("av").innerHTML = conteudo.flavour + ' - ' + conteudo.flavourName + '. Começou às ' + conteudo.flavourBeg + ', Termina às ' + conteudo.flavourExp + '.';
    }
    else {
      document.getElementById("strawberryFlavour").innerHTML = 'Erro! Um problema técnico impossibilita a recepção da programação.';
    }
  };
  xhttp.open("GET", "https://thecartoonfactory.herokuapp.com/no_ar.php", true);
  xhttp.send();
  setTimeout(getonairLoop, 10000);
}

getonairLoop()
