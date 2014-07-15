require.config({
  baseUrl: "./js/app",
  paths: {
      "jquery": "../libs/jquery",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone",
      "restApiServer": "../app/config/restApiServer",
      "jasminejquery": "../libs/plugins/jasmine-jquery",
      "text": "../libs/plugins/text",
      "datepicker": "../libs/plugins/jquery.datePicker",
  },

  shim: {
      "backbone": {
        "deps": ["underscore", "jquery"],
        "exports": "Backbone"
      },
      "jasminejquery": ["jquery"]
  }

});
