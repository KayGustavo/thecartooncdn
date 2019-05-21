window.onload = function() {
    function millisToMinutesAndSeconds(millis) {
        /* https://stackoverflow.com/a/21294619/10077439 */
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + "00s" : minutes + "m" + (seconds < 10 ? "0" : "") + seconds + 's');
    }

    function getonairLoop() {
        var apiUrl = 'https://www.nowonline.com.br/avsclient/epg/livechannels/cartoon-network?channel=PCTV&numberOfSchedules=1&includes=images';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var dateAtual = new Date().getTime();
                var conteudo = JSON.parse(this.responseText);
                var conteudoRoot = conteudo.response[0];
                var conteudoSchedule = conteudoRoot.schedules;
                var conteudoTitulo = conteudoSchedule[0].title;
                var conteudoBanner = conteudoSchedule[0].images.banner;
                var conteudoClass = conteudoSchedule[0].ageRating;
                var conteudoInicio = conteudoSchedule[0].startTime * 1000;
                var conteudoFim = conteudoSchedule[0].endTime * 1000;
                var dateInicio = new Date(conteudoInicio);
                var dateFim = new Date(conteudoFim);
                var dateRestante = Math.abs(dateAtual - conteudoFim);
                var dateDura = Math.abs(dateInicio - dateFim);
                /* console.log(dateRestante); desabilitado em modo de produção */
                if (conteudoClass == "1") conteudoClass = "LIVRE";
                else if (conteudoClass != "1") conteudoClass = conteudoClass + ' ANOS';
                /* console.log(conteudoTitulo); desabilitado em modo de produção */
                document.getElementById("showBanner").src = conteudoBanner;
                document.getElementById("titulo").innerHTML = 'Título: ' + conteudoTitulo;
                document.getElementById("clas").innerHTML = 'Classificação: ' + conteudoClass;
                document.getElementById("duraxd").innerHTML = 'Duração: ' + millisToMinutesAndSeconds(dateDura) + '';
                document.getElementById("come").innerHTML = 'Início: ' + dateInicio.toLocaleString('en-GB', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                });
                document.getElementById("fim").innerHTML = 'Fim: ' + dateFim.toLocaleString('en-GB', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                });
                document.getElementById("rest").innerHTML = 'Termina em ' + millisToMinutesAndSeconds(dateRestante) + '';
            }
        };
        xhttp.open("GET", apiUrl, true);
        xhttp.send();
        setTimeout(getonairLoop, 10000);
    }

    getonairLoop();
}
