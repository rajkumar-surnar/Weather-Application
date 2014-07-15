define([
  'underscore',
  'backbone',
  'models/city'
], function(_, Backbone,City){
   
  var Cities = Backbone.Collection.extend({

    model: City,
    initialize : function(models, options) {
      this.query = options.query;
    },
    url : function() {
       return "http://api.openweathermap.org/data/2.5/forecast/daily?id="+ this.query +"&cnt=14&APPID=xxxxx"
    }, 
    parse : function(data) {
      return data;
    }	 
  });
   
  return Cities ;
  
});
