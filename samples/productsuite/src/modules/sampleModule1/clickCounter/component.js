define(["Boiler","text!./view.html","./clickme/component","./lottery/component"],function(e,t,n,r){var i=function(i){var s=null;this.activate=function(o,u){if(!s){s=new e.ViewTemplate(o,t,null);var a=new n(i);a.initialize($("#clickme"));var f=new r(i);f.initialize($("#lottery"))}s.show()},this.deactivate=function(){s&&s.hide()}};return i})