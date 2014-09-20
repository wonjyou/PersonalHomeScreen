//------------------------------------------------------------------------
// Personalization variables 
//
// Make sure to update these two variables to your own
// The weather code can be found by looking up your address on weather.com
// And copying the location in the URL, like so:
// http://www.weather.com/weather/today/UKXX0085
//--------------------------------------------------------------------------
var your_address = '20 W Kinzie St, Chicago, IL 60654';
var weather_code = 'USIL0225';

function getDirections(){				
	var start = 'saddr='+your_address;
	var destination = 'daddr=' + document.form1.daddr.value; 
	var url = '';

	url = 'http://maps.google.com/maps?' + start + '&' + destination;	

	window.open(url,'directions','width=1024,height=768,scrollbars=yes'); 			
}

function dayName(index) {
	var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return dayArray[index];
}

function monthName(index) {
	var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return monthArray[index];
}

function displayDate(){
	var today = new Date();
	var day = today.getDay();
	var date = today.getDate();
	var month = today.getMonth();
	var year = today.getFullYear();  
	var dayTxt = dayName(day);
	var monthTxt = monthName(month);
	var d = new Date();
	var h = d.getHours();
	
	var html = dayTxt + "<br>" + "<span class='day'>" + date + "</span>" + "<br>" + monthTxt;
	$("#today").prepend(html);

	var greeting = "";
	
	if (h < 2) greeting = "Good morning! You're certainly up late.";
	else if (h < 3) greeting = "Good morning! Up early or working late?";
	else if (h < 7) greeting = "Good morning! Up bright and early!";
	else if (h < 12) greeting = "Good morning!";
	else if (h < 17) greeting = "Good afternoon!";
	else if (h < 23) greeting = "Good evening!";
	else greeting = "It's nappy time, dude!";
	
	$("#greetings").prepend(greeting);
}

function scrollToDiv( target ){

	var goalY = target.offset().top - 50;
	$('html, body').animate({scrollTop:goalY}, 300);		   
}

function DropDown(el) {
	this.dd = el;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			event.stopPropagation();
		});	
	}
}

function findMaxHeight( el ){
	var maxHeight = 0;

	el.each( function (index){
		var myHeight = $(this).height();

		if (myHeight > maxHeight){
			maxHeight = myHeight;
		}
	});	

	return maxHeight;
}

function resizePanels(){

	var $columns = $(".columns");
	var total = $columns.length;
	var firstRow = $columns.slice(0,4);
	var secondRow = $columns.slice(4,7);
	var thirdRow = $columns.slice(7, total);

	firstRow.find(".panel, .panel2, .panel3").css({"min-height" : findMaxHeight(firstRow)+"px"});		
	secondRow.find(".panel, .panel2, .panel3").css({"min-height" : findMaxHeight(secondRow)+"px"});	
	thirdRow.find(".panel, .panel2, .panel3").css({"min-height" : findMaxHeight(thirdRow)+"px"});	

}

$(document).ready(function($) {
	if ($(window).width() <= 420){

		$('.accordion-toggle').click(function(){
			$(this).next().slideToggle('fast', function(){scrollToDiv($(this));});				
			$(".accordion-content").not($(this).next()).slideUp('fast');		
		});
	}
	else{

		displayDate();

		Clock.start();


		$('#weather').weatherfeed([weather_code],{
			unit: 'f',
			image: true,
			country: false,
			highlow: true,
			wind: false,
			humidity: true,
			visibility: false,
			sunrise: false,
			sunset: false,
			forecast: false,
			link: true
		});
		
		resizePanels();
		$( window ).resize(function() {
		  resizePanels();
		});
	}
	
		
	$(".nav-trigger").click (function(){
		$('nav.sidebar').toggleClass("slide-from-right");					
		$('body').toggleClass("cbp-spmenu-push-toleft");					
	});
	
	var dd = new DropDown( $('#dd') );

	$(document).click(function() {					
		$('.wrapper-dropdown-5').removeClass('active');
	});
});

