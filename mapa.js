var nuevoT = true;

var oldmap = null;
var map = null;
var Siguiente_AnteriorT = true;

var grabarTabla = true;

// Declaración de variables disponibles para todos las funciones javascript
var tamanoVentana = 0;

var murallas = new Array();

var numeroRegistro;

var db = null;

var rs = null;
var Registros = null;
var row = null;
var indice = -1

var result = null;
var pos = 0;
var operador = ">"
var map;

var DSiP = "";
var DSiBa = "";
var DSiT = "";
var DSPr = "";
var eSiP = "";
var eSiBa = "";
var eSiT = "";
var eSPr = "";
var anchoventana = screen.width * .64;
var altoventana = screen.height * .55;


// Imagen que vamos a utilizar para establecer un marcador en el mapa
var fileName = "img/bandera.jpg";
var iconoBandera = new google.maps.MarkerImage(fileName);
// podemos hacerlo de esta forma mas facil sin crear un MarkerImage
var fileName = "punto.png";
var iconCasa = new google.maps.MarkerImage(fileName);

var colortrazado = "blue";
var visualizacalle = true;
var tipoagrabar = "Plaza"
var marker = null;
var nuevoRegistro = "n";
var latitud = null;
var longitud = null;
var textoAyuda = "";
var n = 0

var idcod = ""


var codigoVentana = '<div id="contentInfoWindow' + n++ + '" class="contentMap">\
                        <div class="tablainfo">\
                            <table style="width: 425px; margin-top: 0px; margin-bottom: 0px; padding-bottom: 0px; padding-top: 0px; font-size: 10pt;" id="TABLE1">\
                            <tr>\
                </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">ID_labor</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="labort" \
 type="number" style="width: 220px" disabled />\
                    </td>\
                </tr>\
                  </tr>\
                <tr>\
                <td style="width: 80px; height: 21px">ID_parcela</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="parcelat" disabled\
 type="number" style="width: 220px"  />\
                    </td>\
                </tr>\
                  </tr>\
                  <td style="width: 80px; height: 21px">Tiempo</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="fechat" \
 type="date" style="width: 220px" />\
                    </td>\
                </tr>\
                  </tr>\
                  <td style="width: 80px; height: 21px">Horas</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="horast" \
 type="time" style="width: 220px" />\
                    </td>\
                </tr>\
                  </tr>\
                  <td style="width: 80px; height: 21px">Equipo</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="maquinariat" \
 type="text" style="width: 220px" />\
                    </td>\
                </tr>\
                  </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Aplicador</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="operariot" \
 type="text" style="width: 220px" />\
                    </td>\
                </tr> \
                  </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Nombre Producto</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="productot" \
 type="text" style="width: 220px" />\
                    </td>\
                </tr> \
                  </tr>\
                  </tr> \
                  </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Nº Registro Fitosanitario</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="NregistroT" \
 type="text" style="width: 220px" />\
                    </td>\
                </tr> \
                  </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Dosis</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="cantidadt" \
 type="number" style="width: 220px" />\
                    </td>\
                </tr> \
                  </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Gasto</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="gastot"  type="number" style="width: 220px" />\
                    </td>\
                </tr>\
                <tr>\
                    <td style="width: 80px; height: 21px">Ingreso</td>\
                    <td style="width: 225px; height: 21px">\
                        <input id="ingresot"  type="number" style="width: 220px" />\
                    </td>\
                </tr>\
                 <tr>\
                    <td style="width: 80px; height: 21px">Declaracion</td>\
                    <td style="width: 225px; height: 21px">\
                        <select id=Declaraciont>\
  <option value="FITOSANITARIO">FITOSANITARIO</option>\
  <option value="NO FITOSANITARIO">NO FITOSANITARIO</option>\
</select>\
                    </td>\
                </tr>\
                         </table>\
                            <input id="grabart" value="grabar" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                            <input id="siguientet" value="siguiente" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                               <input id="anteriort" value="anterior" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                                  <input id="borrart" value="borrar" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                                     <input id="primerot" value="primero" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                                        <input id="ultimot" value="ultimo" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                                           <input id="nuevot" value="nuevo" type="Button" style="width: 100px;  display: inline; margin: auto;" />\
                        </div>\
                        <div class="contentTxt">\
                        </div>\
                    </div>';

function initialize() {




    // alert("Maximizar Mapa en toda la pantalla")
    // Metodo que ejecutamos al cargar la página <body onload="initialize)"
    var nuevo = 1;

    //---------------- 
    // Crear el mapa sobre el <div> 'map_canvas'
    //------------------
    textoAyuda = "<div class='ayudando'><h3>Creación de un mapa</h3>" +
            "<input type='button' value='X' onclick='CierraAyuda()' /></br>" +
            "<b>map = new google.maps.Map(document.getElementById('map_canvas')</b>, {</br>" +
            "El mapa se crea con la clase <i>new google.maps.Map</i> y se visualiza el mapa correspondiente a la latitud, longitud indicadas en </br>" +
            "<b>center: new google.maps.LatLng(41.709637, -3.588538),</b></br>" +
            "<b>zoom: 16,</b> // zoom del mapa</br>" +
            "<b>draggableCursor:'auto', </b>// forma del cursor</br>" +
            "<b>draggingCursor:'crosshair',</b></br>" +
            "<b>mapTypeId: google.maps.MapTypeId.ROADMAP</b> // tipo de mama            });</br> " +
            " </div>"
    map = new google.maps.Map(
            document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(41.709637, -3.588538), //latitud,longitud),//
        zoom: 16, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
    });
    ;


    document.getElementById('sigpac').style.display='none';
  

    /*
     1.Opciones para draggableCursor: y draggingCursor:
     auto, crosshair, default, pointer, move,pointere-resize,pointerne-resize,nw-resize,n-resize
     se-resize,sw-resize,s-resize,w-resize,text,wait,help,progress
     Mas Información en: http://www.maestrosdelweb.com/editorial/google-maps-api-v3-introduccion-y-primeros-pasos/
     */
  
    Paso2();

}
function Mapanormal() {
    
    document.getElementById('sigpac').style.display='none';
    document.getElementById('map_canvas').style.display='block'; 
    oldmap.setMap(null) //'Despinta' la imagen anterior para que no se solapen mucho
    oldmap = null
    google.maps.event.clearListeners(map, 'dragend');
     google.maps.event.clearListeners(map, 'zoom_changed');
}
function overlay() {
      
    var bounds = map.getBounds()
    var ne = bounds.getNorthEast()
    var sw = bounds.getSouthWest()
    if (oldmap != null) {
        oldmap.setMap(null) //'Despinta' la imagen anterior para que no se solapen mucho
        oldmap = null
    }
    oldmap = new google.maps.GroundOverlay("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?SERVICE=WMS&SRS=EPSG:4326&REQUEST=GETMAP&bbox=" + sw.lng() + "," + sw.lat() + "," + ne.lng() + "," + ne.lat() + "&width=640&height=480&format=PNG&transparent=Yes&layers=catastro", map.getBounds());
    oldmap.setMap(map);
    
}
  function evcatas(){
      
    document.getElementById('sigpac').style.display='none';
    document.getElementById('map_canvas').style.display='block';
    
    overlay()
       google.maps.event.addListener(map, 'dragend',
            function () {
                overlay()
            }
    )
    google.maps.event.addListener(map, 'zoom_changed',
            function () {
                overlay()
            }
    )
  } 
  function evsigpac(){
      document.getElementById('map_canvas').style.display='none';
       sigpac.data="http://sigpac.mapa.es/fega/visor/?provincia="+Cod_provincia.value+"&municipio="+Cod_localidad.value+"&AGREGADO=0&zona=0&poligono="+PropietarioArrendatario.value+"&parcela="+Parcela.value;
       document.getElementById('sigpac').style.display='block';
  }

   


// Localizame donde estoy en estos momentos
function localizame() {
    //https://developers.google.com/maps/documentation/javascript/tutorial?hl=es
    //http://blog.atrioweb.com/html5/geolocalizacion-con-html5
    //http://www.analyticaweb.com/desarrollo-web/google-maps-api-v3-y-geoposicionamiento-ii

    //http://www.funcion13.com/2012/08/16/calculando-distancias-y-areas-con-google-maps-v3/
    if (navigator.geolocation) { /* Si el navegador tiene geolocalizacion */
        navigator.geolocation.getCurrentPosition(coordenadas, errores);
    } else {
        alert('Oops! Tu navegador no soporta geolocalización. Bájate Chrome, que es gratis!');
    }
}

function coordenadas(position) {
    latitud = position.coords.latitude; /*Guardamos nuestra latitud*/
    longitud = position.coords.longitude; /*Guardamos nuestra longitud*/


    var fileName = "MiCursor.png";
    // Crear marcado
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud, longitud),
        icon: fileName,
        map: map

    });

    //Central el mapa en el marcador obtenido de nuestra posición
    var latLng = marker.getPosition(); //  
    map.setCenter(latLng);
    leeDireccion(latLng);
}
function errores(err) {
    /*Controlamos los posibles errores */
    if (err.code == 0) {
        alert(" Algo ha salido mal");
    }
    if (err.code == 1) {
        alert("  No has aceptado compartir tu posición");
    }
    if (err.code == 2) {
        alert("  No se puede obtener la posición actual");
    }
    if (err.code == 3) {
        alert(" Hemos superado el tiempo de espera");
    }
}


// Infowindows 
popup = new google.maps.InfoWindow({
    content: codigoVentana
    , zIndex: n
});

google.maps.event.addListener(popup, 'domready', function () {
    document.getElementById("grabart").addEventListener("click", grabarmodal, true);
    nuevot.addEventListener("click", despeja, true);
    siguientet.addEventListener("click", Tsiguiente, true);
    anteriort.addEventListener("click", Tanterior, true);
    primerot.addEventListener("click", Tprimero, true);
    ultimot.addEventListener("click", Tultimo, true);
    borrart.addEventListener("click", borrado, true);


    idcod = document.getElementById('IdParcela').value;
    document.getElementById("parcelat").value = idcod;
});

popup.open(map, marker);
(function (id, popup) {
    google.maps.event.addListener(popup, 'domready', function () {
        google.maps.event.addDomListener(document.getElementById('contentInfoWindow' + id), 'click', function () {
            popup.setZIndex(n++);
        });

    })

})(n++, popup);


function Paso2()
{
    // Evento click en el mapa
    google.maps.event.addListener(map, 'click', function (event) {
        datolatitud_longitud = event.latLng.toString();
        // Obtiene la longitud y la latitud correspondiente al clic 
        // y copia los datos en cajas de texto
        leeDireccion(event.latLng);
        var fileName = "img/bandera.jpg";
        // Crear marcado
        marker = new google.maps.Marker({
            position: event.latLng,
            icon: fileName,
            map: map
        });




        murallas[pos] = datolatitud_longitud;
        pos = pos + 1;
    });
    //--------------
    // Ebvento click
    // -----------------
    textoAyuda = "<div class='ayudando'><h3>Eventos </h3>" +
            "<input type='button' value='X' onclick='CierraAyuda()' /></br>" +
            "Los eventos nos van a permitir interactuar con el map, de momento solo utiliaremos el evento <i>'click'</i></br>" +
            "En este ejemplo utilizamos el evento clic para visualizar un marcador en el mapa, que ademas guardarems</br>" +
            "en el array murallas[] para despues poder trazar polígomos. Ademas llamamos a la function <i>leeDireccion(event.latLng);</i></br>" +
            "que obtiene la dirección lógica(dirección) correspondiente a la latitud longitud del marcador obtenido </br>" +
            "<b> google.maps.event.addListener(map, 'click', function(event) { </b></br>" +
            "<b> datolatitud_longitud=event.latLng.toString(); </b></br>" +
            "//Obtiene la longitud y la latitud correspondiente al clic y copia los datos en cajas de texto</br>" +
            "<b> leeDireccion(event.latLng);   </b></br>" +
            "<b> var fileName='bandera.jpg; </b></br>" +
            "// Crear marcado</br>" +
            "<b> marker = new google.maps.Marker({  </b></br>" +
            "<b>  position: event.latLng, icon:fileName, ap: map }); </b></br>" +
            "<b>  murallas[pos]=datolatitud_longitud; </b></br>" +
            "<b> pos=pos+1; </b></br>" +
            "<b> }    ); </b></br>" +
            "<b>  </b></br>" +
            "</div>"

}

// Dibujar lineas y polígonos 
function Trazar_onclick() {

    var tipo_trazo;
    if (document.getElementsByName("lr").item(0).checked) {
        tipo_trazo = document.getElementsByName("lr").item(0).value
    } else {
        tipo_trazo = document.getElementsByName("lr").item(1).value
    }

    Recinto.value = ""
    var posiciones = "[";
    for (i = 0; i < pos; i++) {
        posiciones = posiciones + "new google.maps.LatLng" + murallas[i] + ",";
        Recinto.value = Recinto.value + murallas[i] + ",";
    }
    posiciones = posiciones.substr(0, posiciones.length - 1);

    if (tipo_trazo == "recinto") {
        posiciones = posiciones + ",new google.maps.LatLng" + murallas[0] + "]";
    } else {
        posiciones = posiciones + "]";
    }
   // alert(posiciones)
    if (pos > 0) {
        var polygon = "new google.maps.Polyline({" +
                "path:" + posiciones + "," +
                "strokeColor:'" + colortrazado + "'," +
                "strokeOpacity: 2," +
                "strokeWeight: 1.3," +
                "geodesic: true})";

        eval(polygon).setMap(map);
    }
    murallas = new Array();
    pos = 0;
    //--------------
    // Trazar líneas y polígonos
    // -----------------
    textoAyuda = "<div class='ayudando'><h3>Trazado de Líneas y Polígonos</h3>" +
            "<input type='button' value='X' onclick='CierraAyuda()' /></br>" +
            "  Es otra de las posibildades que nos pgrece Google Maps. Tanto para líneas como para poígonos se utiliza la clase <i> new google.maps.Polyline()</i></br>" +
            "En los parámetros de la clase  indicamos los puntos new google.maps.LatLng(latitd,longitud) de los puntos de la lína o pológomo a dibujar,</br>" +
            "el color de trazado, la opacidad , el grosor de la linea </br>" +
            "<b> </b></br>" +
            "<b> var tipo_trazo; </b></br>" +
            "<b> if(document.getElementsByName('lr').item(0).checked){tipo_trazo=document.getElementsByName('lr').item(0).value} </b></br>" +
            "<b> else{tipo_trazo=document.getElementsByName('lr').item(1).value}  </b></br>" +
            "<b> cRecinto.value=''  </b></br>" +
            "<b> var posiciones ='[; </b></br>" +
            "<b> for (i=0; i<pos; i++){ </b></br>" +
            "<b>     posiciones=posiciones +'new google.maps.LatLng'+murallas[i]+',; </b></br>" +
            "<b>     cRecinto.value=cRecinto.value +murallas[i]+',';</b></br>" +
            "<b> } </b></br>" +
            "<b> posiciones=posiciones.substr(0, posiciones.length-1); </b></br>" +
            "<b>  if (tipo_trazo=='recinto){ </b></br>" +
            "<b>     posiciones=posiciones+',new google.maps.LatLng'+murallas[0]+']';} </b></br>" +
            "<b> else {posiciones=posiciones+']';} </b></br>" +
            "<b> if(pos>0){ </b></br>" +
            "<b>  var polygon  =  'new google.maps.Polyline({+</b></br>" +
            "<b>  'path:'+posiciones+','+ </b></br>" +
            "<b>  'strokeColor:''+colortrazado+'',' </b></br>" +
            "<b>   'strokeWeight: 1.3,'+</b></br>" +
            "<b> 'geodesic: true})'</b></br>" +
            "</div>"
}

// Buscar latitud y longitud a partir de la dirección indicada
function BuscarCalle()
{
    var geocoder = new google.maps.Geocoder();
    var calleAbuscar = document.getElementById("cajaBuscaCalle").value;

    geocoder.geocode({'address': calleAbuscar}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                icon: "buscar.png",
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode no ha podido localizar la dirección por este motivo: ' + status);
        }
    });
    //--------------
    // BUscar calle
    // -----------------
    textoAyuda = "<div class='ayudando'><h3>Buscar Calle </h3>" +
            "<input type='button' value='X' onclick='CierraAyuda()' /></br>" +
            "Una de las opciones más interesantes de Googel maps esta en obtener una posición geográfica a partir de la dirección lógica indicada</br>" +
            "El término codificación geográfica suele hacer referencia al proceso de traducir una dirección interpretable por humanos en una ubicación de un mapa. El proceso de conversión o traducción de una ubicación en una dirección interpretable por humanos se conoce como codificación geográfica inversa." +
            "Para conseguir esto se utiliza la clase <i>google.maps.Geocoder()</i></br>" +
            "<b>var  geocoder = new google.maps.Geocoder(); </b></br>" +
            "<b>  var calleAbuscar = document.getElementById('cajaBuscaCalle').value;</b></br>" +
            "<b>geocoder.geocode( { 'address': calleAbuscar}, function(results, status) { </b></br>" +
            "<b> if (status == google.maps.GeocoderStatus.OK) { </b></br>" +
            "<b> map.setCenter(results[0].geometry.location); </b></br>" +
            "<b> var marker = new google.maps.Marker({</b></br>" +
            "<b> map: map,</b></br>" +
            "<b> icon:'buscar.png',</b></br>" +
            "<b> position: results[0].geometry.location  </b></br>" +
            "<b> }); </b></br>" +
            "<b> } else { </b></br>" +
            "<b>  alert('Geocode no ha podido localizar la dirección por este motivo: ' + status); </b></br>" +
            "<b> }  });   </b></br>" +
            "</div>"
}

// Obtiene la longitud y la latitud correspondiente al clic 
// y copia los datos en cajas de texto. Tambien obtiene la 
// dirección del lugar donde hacemos clic
function leeDireccion(latlng) {
    geocoder = new google.maps.Geocoder();
    if (latlng != null) {
        //    address = latlng;
        //    geocoder.getLocations(latlng, MuestraDireccion);

        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //https://developers.google.com/maps/documentation/javascript/geocoding?hl=es
                    //  alert(results[1].formatted_address);
                    //  alert(results[0].formatted_address);
                    MuestraDireccion(latlng, results[0].formatted_address)
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });




    }
}

function MuestraDireccion(latlng, Recinto) {

    document.getElementById("Localidad").value = Recinto

    document.getElementById("Latitud").value = latlng.lat(); //coord[0]
    document.getElementById("Longitud").value = latlng.lng();//coord[1]

}

// Visualiza para la posición donde nos encontramos la panorámica tomada
// por Stret View
function VistaCalle() {
    //https://developers.google.com/maps/documentation/javascript/streetview?hl=es
    cajapano = document.getElementById("pano");
    cajamap_canvas = document.getElementById("map_canvas");
    if (visualizacalle == false) {
        cajapano.style.display = "block";
        cajamap_canvas.style.display = "none";
        visualizacalle = true;
        var svp = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
            position: new google.maps.LatLng(document.getElementById("Latitud").value.toString(), document.getElementById("Longitud").value.toString())
        });
        map.setStreetView(svp);
    } else {
        visualizacalle = false;
        cajapano.style.display = "none";
        cajamap_canvas.style.display = "block";
    }
    //--------------
    // Visita calla Street View
    // -----------------
    textoAyuda = "<div class='ayudando'><h3>Vista Calle Street View</h3>" +
            "<input type='button' value='X' onclick='CierraAyuda()' /></br>" +
            " Es la opción mas llamativa de las que vamos a ver. Si la calle en la que hemos situado</br> " +
            "el marcador ha sido digitalizada por medio de Street View, veremos una vista real y todo</br>" +
            "detalle del momento en el que fue filmada la calle. Ademas podermos movernos por la vista</br>" +
            " con facilidad. La nueva versión tambien permite situar marcadores sobre la imagen real</br>" +
            "(no esta implementado en el tutorial)</br>" +
            "<b> cajapano=document.getElementById('pano'); </b></br>" +
            "<b>  cajamap_canvas=document.getElementById('map_canvas'); </b></br>" +
            "<b>  if(visualizacalle==false){ </b></br>" +
            "<b> cajapano.style.display='block'';</b></br>" +
            "<b> cajamap_canvas.style.display='none';</b></br>" +
            "<b> visualizacalle=true; </b></br>" +
            "<b>  var svp = new google.maps.StreetViewPanorama(document.getElementById('pano), { </b></br>" +
            "<b>   position:new google.maps.LatLng(document.getElementById('cLatitud').value.toString(),document.getElementById('cLongitud').value.toString())    </b></br>" +
            "<b>    }); </b></br>" +
            "<b>  map.setStreetView(svp);} </b></br>" +
            "<b>  else</b></br>" +
            "<b>    visualizacalle=false;   </b></br>" +
            "<b> cajapano.style.display=none';</b></br>" +
            "<b>  cajamap_canvas.style.display='block';}</b></br>" +
            "<b>  </b></br>" +
            "</div>"
}


function Mideme()
{


    var pi = murallas[0].toString().replace('(', "");
    pi = pi.toString().replace(')', "");
    api = pi.split(",");
    var pf = murallas[1].toString().replace('(', "");
    pf = pf.toString().replace(')', "");
    apf = pf.split(",");


    var posicionInicial = new google.maps.LatLng(api[0], api[1]);//  eval(pi));//
    var posicionFinal = new google.maps.LatLng(apf[0], apf[1]);// eval(pf));// 

    var angulo = google.maps.geometry.spherical.computeHeading(posicionInicial, posicionFinal);

    var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionInicial, posicionFinal);
    document.getElementById("cMideme").value = distancia + " m.";
    pos = 0;
    murallas = new Array();



}
function MidemeRecinto()
{



    var distanciaTotal = 0;
    for (i = 0; i < murallas.length - 1; i++) {
       // alert(i)
        var pi = murallas[i].toString().replace('(', "");
        pi = pi.toString().replace(')', "");
        api = pi.split(",");
        var pf = murallas[i + 1].toString().replace('(', "");
        pf = pf.toString().replace(')', "");
        apf = pf.split(",");


        var posicionInicial = new google.maps.LatLng(api[0], api[1]);//  eval(pi));//
        var posicionFinal = new google.maps.LatLng(apf[0], apf[1]);// eval(pf));// 

        var angulo = google.maps.geometry.spherical.computeHeading(posicionInicial, posicionFinal);

        var distancia = google.maps.geometry.spherical.computeDistanceBetween(posicionInicial, posicionFinal);
        distanciaTotal = distanciaTotal + distancia;
        i++;
    }
    document.getElementById("cMidemeRecinto").value = distanciaTotal + " m.";
    Trazar_onclick();
    pos = 0;
    murallas = new Array();

}
function MidemeAreaRecinto()
{

    var posiciones = "";
    var distanciaTotal = 0;
    for (i = 0; i < murallas.length; i++) {

        var pi = murallas[i].toString().replace('(', "");
        pi = pi.toString().replace(')', "");
        api = pi.split(",");



        posiciones = posiciones + ", new google.maps.LatLng(" + api[0] + "," + api[1] + ")";//  eval(pi));//


    }


    Trazar_onclick();
    pos = 0;
    murallas = new Array();
    posiciones = posiciones.substring(1, posiciones.length);
    posiciones = "[" + posiciones + "]";
   // alert(posiciones)
    //(41.70901237677913, -3.5927865446865326),(41.70914052762599, -3.5912845076381927),(41.70822744726788, -3.590683692818857),(41.70769881586997, -3.5927436293422943),(41.708147351880946, -3.5933444441616302),
    //var nueva_york = new google.maps.LatLng(40.715, -74.002); 
    //var area = google.maps.geometry.spherical.computeArea([nueva_york, sevilla, buenos_aires]);
    var area = google.maps.geometry.spherical.computeArea(eval(posiciones));
    document.getElementById("cMidemeArea").value = area + " m2.";
}
function  CambiaTipoMapa() {
    var ti = document.getElementById("cTipoMapa").value
    //  alert(ti)
    map.setMapTypeId(eval(ti));
    map.setZom(12);
}
function Ayuda() {

    var cccayuda = document.getElementById('cajaa');
    cccayuda.style.zIndex = 100;
    cccayuda.style.display = "block";

    cccayuda.innerHTML = textoAyuda;


}
function CierraAyuda() {

    var cccayuda = document.getElementById('cajaa');
    cccayuda.style.zIndex = 100;
    cccayuda.style.display = "none";

}

function grabarmodal()
{

    var datoslabor = '"' + "Id_labor" + '":' + '"' + labort.value + '",'
            + '"' + "Id_parcela" + '":' + '"' + parcelat.value + '",'
            + '"' + "Fecha" + '":' + '"' + fechat.value + '",'
            + '"' + "Horas" + '":' + '"' + horast.value + '",'
            + '"' + "Maquinaria" + '":' + '"' + maquinariat.value + '",'
            + '"' + "Operario" + '":' + '"' + operariot.value + '",'
            + '"' + "Producto" + '":' + '"' + productot.value + '",'
            + '"' + "NregistroT" + '":' + '"' + NregistroT.value + '",'
            + '"' + "Cantidad" + '":' + '"' + cantidadt.value + '",'
            + '"' + "Gasto" + '":' + '"' + gastot.value + '",'
            + '"' + "Ingreso" + '":' + '"' + ingresot.value + '",'
            + '"' + "Declaracion" + '":' + '"' + Declaraciont.value + '"';
    
    var ajaxrequest = new XMLHttpRequest();
    if (grabarTabla === true) {

        if (nuevoT === true) {
            var jlabor = "{" + datoslabor + "}";
            var envioT = "Todo=" + jlabor;
         //   alert(envioT+"graba");

            ajaxrequest.open("POST", "http://localhost/crudCASA/php/grabaLabor.php", true);
        } else
        {
            datoslabor = '"' + "Id_labor" + '":' + '"' + labort.value + '",' + datoslabor;
            var jlabor = "{" + datoslabor + "}";
            var envioT = "Todo=" + jlabor;
//alert(envioT+"modif");

            ajaxrequest.open("POST", "http://localhost/crudCASA/php/modificaLabor.php", true);
        }

    } else
    {
        datoslabor = '"' + "Id_labor" + '":' + '"' + labort.value + '"';
        var jlabor = "{" + datoslabor + "}";
        var envioT = "Todo=" + jlabor;
        //alert(envioT+"borrar");

        //  ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/borraVecino.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/borrarLabor.php", true);
    }

    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.onreadystatechange = function ()
    {
        //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
        if (ajaxrequest.readyState === 4 && (ajaxrequest.status === 200)) {
            var datosLeidos = ajaxrequest.responseText;
           // alert(datosLeidos)
            //     alert("Datos Recibidos  :" + datosLeidos);
        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envioT);

}

function despeja() {

    grabarTabla = true;
    labort.value = "";
    fechat.value = "";
    horast.value = "";
    maquinariat.value = "";
    operariot.value = "";
    productot.value = "";
    NregistroT.value= "";
    cantidadt.value = "";
    gastot.value = "";
    ingresot.value = "";
    Declaraciont.value = "";

    nuevoT = true;
}

function condicionSqlT(condicionT)
{

    nuevoT = false;
    grabarTabla = true;
    if (labort.value == "") {
        labort.value = 0;
    }
    var datosLabor = '"' + "Id_labor" + '":' + '"' + labort.value + '",' + '"' + "Id_parcela" + '":' + '"' + parcelat.value + '",'
            + '"' + "operador" + '":' + '"' + condicionT + '"';
    var jlabor = "{" + datosLabor + "}";
    var envio = "Todo=" + jlabor;
    // alert(envio)
    var ajaxrequest = new XMLHttpRequest();
    if (Siguiente_AnteriorT == true) {
        //     alert("Siguiente  Anterior")
        //   ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/LeerVecino.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/LeerLabor.php", true);
        //alert(envio)
    } else
    {
       // alert(envio)
        //   ajaxrequest.open("POST", "http://www.informaticasc2.com/webs/esi2/alberto/bares2/LeerUltimoPrimeroParcela.php", true);
        ajaxrequest.open("POST", "http://localhost/crudCASA/php/LeerUltimoPrimeroLabor.php", true);
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
            laboresLeidas = JSON.parse(datosLeidosJSON);
            if (laboresLeidas != null) {
                visualizaLabores(laboresLeidas)
            } else {
                alert("No Hay Registros que cumplan la condición")
            }


        }
    };
    ajaxrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxrequest.send(envio);
}
function borrado() {
    grabarTabla = false;
    grabarmodal();
}
function Tsiguiente() {
    Siguiente_AnteriorT = true;
    condicionSqlT(">");
}
function Tanterior() {
    Siguiente_AnteriorT = true;
    condicionSqlT("<");
}
function Tprimero() {
    Siguiente_AnteriorT = false;
    condicionSqlT("<");
}
function Tultimo() {
    Siguiente_AnteriorT = false;
    condicionSqlT(">");
}
function visualizaLabores(laboresLeidas)
{

    nuevoT = false;
    grabarTabla = true;
    labort.value = laboresLeidas[0].Id_labor;
    parcelat.value = laboresLeidas[0].Id_parcela;
    fechat.value = laboresLeidas[0].Fecha;
    horast.value = laboresLeidas[0].Horas;
    maquinariat.value = laboresLeidas[0].Maquinaria;
    operariot.value = laboresLeidas[0].Operario;
    productot.value = laboresLeidas[0].Producto;
    NregistroT.value = laboresLeidas[0].NregistroT;
    cantidadt.value = laboresLeidas[0].Cantidad;
    gastot.value = laboresLeidas[0].Gasto;
    ingresot.value = laboresLeidas[0].Ingreso;
    Declaraciont.value = laboresLeidas[0]. Declaracion;
    
}

