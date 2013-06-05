jQuery(document).ready(function($){
	$("#hebrew").click(function(){
		$("#lang").attr('currentlanguage','he');
		changeLanguage();
	});

	$("#english").click(function(){
		$("#lang").attr('currentlanguage','en');
		changeLanguage();
	});
	
	$("#edit").click(function(){
		var lat = map.getCenter().lat;
		var lng = map.getCenter().lng;
		var zoom = map.getZoom();
		window.open("http://www.openstreetmap.org/edit?lat="+lat+"&lon="+lng+"&zoom="+zoom, '_blank');
		
	});
});
 
function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.marker(e.latlng).addTo(map)
	.bindPopup("You are within " + radius + " meters from this point").openPopup();
	L.circle(e.latlng, radius).addTo(map);
}

function addr_search() {
	var inp = document.getElementById("addr");
	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
	var items = [];

	$.each(data, function(key, val) {
		items.push(
			"<li><a href='#' onclick='chooseAddr(" +
			val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
			'</a></li>'
		);
	});
	 $('#results').empty();
    if (items.length != 0) {
      $('<p>', { html: "Search results:" }).appendTo('#results');
      $('<ul/>', {
        'class': 'my-new-list',
        html: items.join('')
      }).appendTo('#results');
    } else {
      $('<p>', { html: "No results found" }).appendTo('#results');
    }
  });
}

function chooseAddr(lat, lng, type) {
  var location = new L.LatLng(lat, lng);
  map.panTo(location);

  if (type == 'city' || type == 'administrative') {
    map.setZoom(11);
  } else {
    map.setZoom(13);
  }
}

function changeLanguage(){
	var currentLanguage = $("#lang").attr('currentlanguage');
	$("#about div").remove();
		if (currentLanguage == "en")
		{
			var text = '<div id="language" class="en"><H1 id="Header">Israel Hiking Project</H1>'+
			'<p> This map was generated from <a class="OSM">Open Street Map (OSM)</a> data where it can be be viewed and edited. All you need to do is create an account and start mapping. Note that the changes will not affect this map instantly.</p>'+
			'<H4> Below are some links related to this project </H4>'+
			'<ul>'+
			'<li>See <a class="Github">Github</a> for instructions on how to create the map by yourself and links to map downloads.</li>'+
			'<li>See <a class="OSMWiki">Israel OSM Wiki Project</a> for common rules of the Israeli Open Street Map community.</li>'+
			'<li>See <a class="OSMForum">Israel OSM Forum</a> for the Israeli Open Street Map forum where you can post questions and look for answers.</li>'+
			'</ul>'+
			'<i>'+
			'<p align="right">'+
			'Thank you for your support!<br>'+
			'Harel and Zeev<br>'
			'</p>'+
			'</i></div>';
			$("#descriptionToggle").text('Legend');
			$("#about").addClass('eng');
			$("#search").addClass('eng');
			$("#searchWindow").addClass('eng');
			$("#edit").addClass('eng');
			$("#InfoWrapper").addClass('eng');
			$("#myLocation").addClass('eng');
			$("#InfoWrapper").text('About');
			$("#myLocation").text('My Location');
			$("#search").text('Search');
			$("#edit").text('Edit');
		}
		else
		{
			var text = '<div id="language" class="he">'+'<h1 id="Header-he">פרוייקט מפת הטיולים הפתוחה של ישראל</h1>'+
				'<p> המפה הזו נוצרה בעזרת מידע מ- <a class="OSM" href="http://www.openstreetmap.org/" target="_blank">Open Street Map</a> שם ניתן לראות ולערוך אותו. כל שיש לעשות הוא לפתוח חשבון ולהתחיל למפות. שימו לב, המפה אינה מתעדכנת באופן מיידי.</p>'+
				'<h4> להלן כמה קישורים הקשורים לפרוייקט </h4>'+
				'<ul>'+
				'<li><a class="Github">Github</a> הוראות איך ליצור את המפה בעצמך וקישורים להורדת מפות</li>'+
				'<li><a class="OSMWiki">Israel OSM Wiki Project</a> חוקים נפוצים של קהילת הממפים הישראלית של OSM</li>'+
				'<li><a class="OSMForum">Israel OSM Forum</a> היכן שניתן למצוא תשובות ולשאול שאלות לגבי המיפוי</li>'+
				'</ul>'+
				'<i>'+
				'<p align="left">'+
				'תודה על תרומתכם!<br>'+
				'הראל וזאב<br>'+
				'</p>'+
				'</i>'+
				'</div>';
				$("#descriptionToggle").text('מקרא');
				$("#InfoWrapper").removeClass('eng');
				$("#about").removeClass('eng');
				$("#search").removeClass('eng');
				$("#searchWindow").removeClass('eng');
				$("#edit").removeClass('eng');
				$("#myLocation").removeClass('eng');
				$("#InfoWrapper").text('אודות');
				$("#myLocation").text('מיקום נוכחי');
				$("#search").text('חיפוש');
				$("#edit").text('עריכה');
		}
		$("#about").append(text);
		GetLinks();
}

function toggleInfo() {
	var state = document.getElementById('description').className;
	var aboutState = $("#about").attr('class');
	var searchState = $("#searchWindow").attr('class');
   if ((aboutState == "eng") || (aboutState == ""))
   {
		$("#about").addClass('hide');
   }
   if ((searchState == "") || (searchState == "eng"))
   {
		$("#searchWindow").addClass('hide');
   }
   if (state == 'hide') {
   // Info anzeigen
		document.getElementById('description').className = '';
	}
	else {
		// Info verstecken
   	    document.getElementById('description').className = 'hide';
	}	
}		

function toggleSearch() {
	var legendState = $("#description").attr('class');
	var aboutState = $("#about").attr('class');
	var searchState = $("#searchWindow").attr('class');
   if ((aboutState == "eng") || (aboutState == ""))
   {
		$("#about").addClass('hide');
   }
   if ((legendState == "eng") || (legendState == ""))
   {
		$("#description").addClass('hide');
   }
   if ((searchState == 'eng hide') || (searchState == 'hide') || (searchState == 'hide eng'))
   {
   // Info anzeigen
		$("#searchWindow").removeClass('hide');
	}
	else {
		// Info verstecken
   	    $("#searchWindow").addClass('hide');
	}	
}

function toggleAbout(){
	var state = $("#about").attr('class');
	var infoState = $("#description").attr('class');
	var searchState = $("#searchWindow").attr('class');
	if (infoState == "")
	{
		$("#description").addClass('hide');
	}
	if ((searchState == "") || (searchState == "eng"))
	{
		$("#searchWindow").addClass('hide');
	}
	if ((state == 'eng hide') || (state == 'hide') || (state == 'hide eng'))
	{
		$("#about").removeClass('hide');
	}
	else
	{
		$("#about").addClass('hide');
	}
}

function onLocateClick() {
	map.locate({setView: true, maxZoom: 15});
}

function GetLinks(){
var links = document.getElementsByClassName('OSM');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "http://www.openstreetmap.org/";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('OruxMaps');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "https://play.google.com/store/apps/details?id=com.orux.oruxmaps";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('Github');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "https://github.com/HarelM/maperitive-rulesets/tree/master/IsraelHiking#israel-hiking-map";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('OSMWiki');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "http://wiki.openstreetmap.org/wiki/WikiProject_Israel";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('OSMForum');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "http://forum.openstreetmap.org/viewforum.php?id=33";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('JoinDropbox');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "http://db.tt/iB36k7K";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('DownloadOrux');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "https://googledrive.com/host/0B-qrsEBJWXhQUGVBM3lHZTF2eXc/";
		links[i].target = "_blank"
	}
	links = document.getElementsByClassName('DownloadOzi');
	for (var i = 0; i < links.length; ++i) {
		links[i].href = "https://www.dropbox.com/sh/h8ye52ahotghta1/tTeUkbTspw";
		links[i].target = "_blank"
	}
}

//HM Code
jQuery(window).load(function() {
	if (typeof document.getElementsByClassName != 'function') {
		document.getElementsByClassName = function() {
			var elms = document.getElementsByTagName('*');
			var ei = new Array();
			for (i=0;i<elms.length;i++) {
				if (elms[i].getAttribute('class')) {
					ecl = elms[i].getAttribute('class').split(' ');
					for (j=0;j<ecl.length;j++) {
						if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
							ei.push(elms[i]);
						}
					}
				} else if (elms[i].className) {
					ecl = elms[i].className.split(' ');
						for (j=0;j<ecl.length;j++) {
							if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
								ei.push(elms[i]);
							}
						}
				}
			}
		return ei;
		}
	}
			
	// Links for both hebrew and english info
	//---------------------------------------------------
	GetLinks();		
	map.on('locationfound', onLocationFound);
	var container = document.getElementById('container');
		var mapdiv = document.getElementById('map');
		var bHebrew = false;
				
		var isMobile = (((window.matchMedia) && (window.matchMedia('(max-device-width: 960px)').matches)) || (screen.width <= 960));
		var infos = document.getElementsByClassName('Infos');
		for (var i = 0; i < infos.length; ++i) {
			if (isMobile == true)
			{
				infos[i].style.width = '80%';
				infos[i].style.styleFloat = 'center';
				infos[i].style.cssFloat = 'center';
				infos[i].style.margin.left = '10%';
				infos[i].style.marginLeft = '10%';
				infos[i].style.margin.right = '10%';
				infos[i].style.marginRight = '10%';
				mapdiv.style.styleFloat = 'center';
				mapdiv.style.cssFloat = 'center';
				mapdiv.style.margin.left = '11%';
				mapdiv.style.marginLeft = '11%';
				mapdiv.style.margin.right = '11%';
				mapdiv.style.marginRight = '11%';
				// couldn't make the following order: header, map, info
			}
			else
			{
				infos[i].style.width = '18%';
				infos[i].style.margin.left = '1%';
				infos[i].style.marginLeft = '1%';
				infos[i].style.margin.right = '1%';
				infos[i].style.marginRight = '1%';
				infos[i].style.fontSize = '14px';
			}
		}
});
