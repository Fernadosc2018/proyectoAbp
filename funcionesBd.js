

var nuevo = true;
var grabarRegistro = true;
var Siguiente_Anterior = true;
var trazado= new google.maps.Polygon();
var marker = new google.maps.Marker();


botonNuevo.addEventListener("click", fnuevo, true);
botonGrabar.addEventListener("click", grabar, true);
botonBorrar.addEventListener("click", borrar, true);
botonSiguiente.addEventListener("click", siguiente, true);
botonAnterior.addEventListener("click", anterior, true);
botonPrimero.addEventListener("click", primero, true);
botonUltimo.addEventListener("click", ultimo, true);
botonTabla.addEventListener("click", tablaModal, true);
botonPDF.addEventListener("click", PDF, true);
cerrarVentana.addEventListener("click", function ()
{
    var modal3 = document.getElementById('myModal3');
    modal3.style.display = "none";
});
function tablaModal()
{

    var modal3 = document.getElementById('myModal3');
    modal3.style.display = "block";
}
function PDF()
{

   window.location.href = 'php/PDF.php';
}


function fnuevo() {

    grabarRegistro = true;
    IdParcela.value = "";
    Localidad.value = "";
    Latitud.value = "";
    Longitud.value = "";
    FSiembra.value = "";
    PropietarioArrendatario.value = "";
    Recinto.value = "";
    Parcela.value = "";
    Cod_provincia.value = "";
    Cod_localidad.value = "";
    Especie.value = "";

    Variedad.value = "";
    Fitosan.value ="";
    nuevo = true;
}
function grabar()
{

    //'"' + "IdParcela" + '":' + '"' + IdParcela.value + '",'
    var datosParcela = '"' + "Localidad" + '":' + '"' + Localidad.value + '",'
            + '"' + "Latitud" + '":' + '"' + Latitud.value + '",'
            + '"' + "Longitud" + '":' + '"' + Longitud.value + '",'
            + '"' + "FSiembra" + '":' + '"' + FSiembra.value + '",'
            + '"' + "PropietarioArrendatario" + '":' + '"' + PropietarioArrendatario.value + '",'
            + '"' + "Recinto" + '":' + '"' + Recinto.value + '",'
            + '"' + "Parcela" + '":' + '"' + Parcela.value + '",'
            + '"' + "Cod_provincia" + '":' + '"' + Cod_provincia.value + '",'
            + '"' + "Cod_localidad" + '":' + '"' + Cod_localidad.value + '",'
            + '"' + "Especie" + '":' + '"' + Especie.value + '",'
            + '"' + "Variedad" + '":' + '"' + Variedad.value + '",'
            + '"' + "Fitosan" + '":' + '"' + Fitosan.value + '"';
    var ajaxrequest = new XMLHttpRequest();
    if (grabarRegistro === true) {

        if (nuevo === true) {
            var jparcela = "{" + datosParcela + "}";
            var envio = "Todo=" + jparcela;

            // ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/grabaParcela.php", true);
            ajaxrequest.open("POST", "http://localhost/crudCASA/php/grabaParcela.php", true);

        } else
        {
            datosParcela = '"' + "IdParcela" + '":' + '"' + IdParcela.value + '",' + datosParcela;
            var jparcela = "{" + datosParcela + "}";
            var envio = "Todo=" + jparcela;
         //   alert(envio);
            //   ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/modificaParcela.php", true);
            ajaxrequest.open("POST", "http://localhost/crudCASA/php/modificaParcela.php", true);
        }
    } else
    {
        datosParcela = '"' + "IdParcela" + '":' + '"' + IdParcela.value + '"';
        var jparcela = "{" + datosParcela + "}";
        var envio = "Todo=" + jparcela;
        //    alert(envio)
        //  ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/borraVecino.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/borrar.php", true);
    }


    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
            //alert(datosLeidos)
            //     alert("Datos Recibidos  :" + datosLeidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}
function borrar()
{
    grabarRegistro = false;
    grabar();
}


function condicionSql(condicion)
{
    
    nuevo = false;
    grabarRegistro = true;
    if (IdParcela.value == "") {
        IdParcela.value = 0;
    }
    var datosParcela = '"' + "IdParcela" + '":' + '"' + IdParcela.value + '",'
            + '"' + "operador" + '":' + '"' + condicion + '"';
    var jparcela = "{" + datosParcela + "}";
    var envio = "Todo=" + jparcela;
    // alert(envio)
    var ajaxrequest = new XMLHttpRequest();
    if (Siguiente_Anterior == true) {
        //     alert("Siguiente  Anterior")
        //   ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/LeerParcela.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/LeerParcela.php", true);
    } else
    {

        //   ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/LeerUltimoPrimeroParcela.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/LeerUltimoPrimeroParcela.php", true);
    }


    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            //  var datosLeidos = ajaxrequest.responseText;
            //  alert("Datos Recibidos  :" + datosLeidos);
            var datosLeidosJSON = ajaxrequest.response;
            //  alert("Datos Recibidos response :" + datosLeidosJSON);
            vecinosLeidos = JSON.parse(datosLeidosJSON);
            if (vecinosLeidos != null) {
                visualizaRegistro(vecinosLeidos)
            } else {
                alert("No Hay Registros que cumplan la condición")
            }


        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}
function siguiente()
{
    Siguiente_Anterior = true;
    condicionSql(">")
    marker.setMap(null);
}
function anterior()
{
    Siguiente_Anterior = true;
    condicionSql("<")
    marker.setMap(null);
}
function primero()
{

    Siguiente_Anterior = false;
    condicionSql("<")
    marker.setMap(null);
}
function ultimo()
{

    Siguiente_Anterior = false;
    condicionSql(">")
    marker.setMap(null);
}
function tabla()
{

}
function visualizaRegistro(vecinosLeidos)
{
 
    nuevo = false;
    grabarRegistro = true;
    IdParcela.value = vecinosLeidos[0].idParcela;
    Localidad.value = vecinosLeidos[0].Localidad;
    Latitud.value = vecinosLeidos[0].Latitud;
    Longitud.value = vecinosLeidos[0].Longitud;

    FSiembra.value = vecinosLeidos[0].anoSiembra;
    PropietarioArrendatario.value = vecinosLeidos[0].Poligono;
    Recinto.value = vecinosLeidos[0].Recinto;
    Parcela.value = vecinosLeidos[0].Parcela;
    Cod_provincia.value = vecinosLeidos[0].Cod_provincia;
    Cod_localidad.value = vecinosLeidos[0].Cod_localidad;
    Especie.value = vecinosLeidos[0].Especie;

    Variedad.value = vecinosLeidos[0].Variedad;
    Fitosan.value = vecinosLeidos[0].Fitosan;


    // Visualiza mapa
    latitud = vecinosLeidos[0].Latitud;
    longitud = vecinosLeidos[0].Longitud;
    recinto = vecinosLeidos[0].Recinto;
 //   alert(recinto)
    var fileName = "img/registro.png";
    // Crear marcado
    
 
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud, longitud),
        icon: fileName,
        map: map

    });
 marker.setMap(map);
    marker.addListener('click', function () {

        map.setCenter(marker.getPosition());

        popup.open(map, marker);
    });


    recinto
    var murallas = recinto.split(",");
    var colortrazado = "blue";

    var lados = [];

    for (i = 0; i < (murallas.length-1); i = i + 2) {

        la = murallas[i].toString().substring(1, murallas[i].toString().length);
        lo = murallas[i + 1].toString().substring(0, murallas[i+1].toString().length - 1);
         

        var nla = parseFloat(la)
        var nlo = parseFloat(lo)
        //  alert(nla+nlo)
        lados.push({"lat": nla, "lng": nlo})

        //  console.dir(lados)


    }

    la = murallas[0].toString().substring(1, murallas[0].toString().length);
    lo = murallas[1].toString().substring(0, murallas[1].toString().length - 1);
  
    var nla = parseFloat(la)
    var nlo = parseFloat(lo)
    lados.push({lat: nla, lng: nlo})
   




    /* var lados=[
     {lat:41.711118914959236,lng:-3.5876262187957764},
     {lat:41.71065438122034,lng:-3.5884952545166016},
     {lat:41.70921270341444,lng: -3.586413860321045}//,
     //   {lat:41.71040609456952,lng:-3.5943746573320823}
     ]
     la=41.70981340642942
     lo=-3.5856521129608154
     lados.push({lat:la,lng:lo})*/
    
trazado.setMap(null);



console.dir(lados)
   trazado= new google.maps.Polygon({
    //    map: map,
        paths: lados,
        strokeColor: '#FF0000',
        strokeOpacity: 4,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        draggable: false,
        geodesic: true
    });
    trazado.setMap(map);

    map.setCenter(marker.getPosition());
    



}

