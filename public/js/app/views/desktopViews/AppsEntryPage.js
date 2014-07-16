define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/desktopTemplates/appsEntryView.html',
  'text!templates/desktopTemplates/cityWeatherView.html',
  'text!templates/desktopTemplates/mycityWeatherView.html',
  'models/city',
  'models/mycity'
], function($, _, Backbone, appsEntryTemplate, cityWeatherTemplate, mycityWeatherTemplate, city, mycity){
  var AppsEntryView = Backbone.View.extend({
    el: $('body'),
    initialize: function (){},
    render: function(){
        $(this.el).html(_.template( appsEntryTemplate, {}));
        this.addCities();
    },
    events:{
        'click #ShowWetherInfo'     : 'showCityData',
        'click #CityOptions option' : 'HideErrorMsg',
        'click #MycityWeather'      : 'getLocation'
     },
    HideErrorMsg : function () {
        $(".CitySelectionErr").hide();
    },
    getLocation: function () {
        var that=this;
        $(".weatherInfoContainer").html("");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                   var mycityData = new mycity();
                   mycityData.fetch({
    		        url: "http://api.openweathermap.org/data/2.5/forecast?lat="+position.coords.latitude+"&lon="+position.coords.longitude,
	    	        success: function() { 
                              $(".weatherInfoContainer").append(_.template(mycityWeatherTemplate, {data:mycityData.toJSON()}));
                        }
                   });
            });
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    },
    addCities: function () {
        var cities = [{id:1259229,name:"Pune",country:"IN"},{id:6619347,name:"Navi Mumbai",country:"IN"},
                      {id:1275339,name:"Mumbai",country:"IN"},{id:1264527,name:"Chennai",country:"IN"},
                        {id:4321929,name:"Delhi",country:"IN"},{id:1275004,name:"Kolkata",country:"IN"},
                        {id:1274693,name:"Chandrapur",country:"IN"},{id:1258526,name:"Ranchi",country:"IN"},
                        {id:1176734,name:"Hyderabad",country:"IN"},{id:1253102,name:"Vishakhapatnam",country:"IN"},
                        {id:1253182,name:"Vikarabad",country:"IN"},{id:1275841,name:"Bhopal",country:"IN"},
                        {id:1253184,name:"Vijayawada",country:"IN"},{id:1263780,name:"Mangalore",country:"IN"},
                        {id:1269743,name:"Indore",country:"IN"},{id:1262180,name:"Nagpur",country:"IN"},
                        {id:1253573,name:"Vadodara",country:"IN"},{id:1256237,name:"Shimla",country:"IN"},
                        {id:1254360,name:"Tirupati",country:"IN"},{id:1262321,name:"Mysore",country:"IN"},
                        {id:1271715,name:"Gandhinagar",country:"IN"},{id:1260607,name:"Panaji",country:"IN"},
                        {id:1269321,name:"Jammu",country:"IN"},{id:1278149,name:"Aurangabad",country:"IN"},
                        {id:1275817,name:"Bhubaneshwar",country:"IN"},{id:1278710,name:"Amritsar",country:"IN"},
                        {id:1265014,name:"Latur",country:"IN"},{id:1252942,name:"Wardha",country:"IN"},
                        {id:1264733,name:"Lucknow",country:"IN"},{id:1269515,name:"Jaipur",country:"IN"}];
        cities.sort(this.SortByName);
        $.each(cities,function(i,city){
             $("#CityOptions").append("<option id="+city.id+" value="+city.name+">"+city.name+"</option>");
        });
    },
    SortByName: function(a, b) {
         var aName = a.name.toLowerCase();
         var bName = b.name.toLowerCase(); 
         return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    },
    showCityData: function () {
       var that = this;
       var cities = [];
       $(".weatherInfoContainer").html("");
       if($("#CityOptions :selected").length === 0){
            $(".CitySelectionErr").show();
       }else{
            $("#CityOptions :selected").each(function(i,city){
                  cities.push($(this).attr("id"));
            });
       }
       this.cityData = new city();
       $.each(cities,function(i,id){
            that.cityData.fetch({
    	          url: "http://api.openweathermap.org/data/2.5/forecast/daily?id="+ id +"&cnt=14&APPID=32e54c52a5dbc89866056c0d07cc567d",
                  success: function() { 
                      $(".weatherInfoContainer").append(_.template(cityWeatherTemplate, {data:that.cityData.toJSON()}));
                }
            });
       });
    }
  });
  return AppsEntryView;
});
