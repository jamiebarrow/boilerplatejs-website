define(["Boiler","./viewmodel","text!./view.html"],function(e,t,n){var r=function(r){var i,s=null;this.activate=function(o,u){s||(s=new e.ViewTemplate(o,n,null),i=new t(r),ko.applyBindings(i,s.getDomElement())),s.show()},this.deactivate=function(){s&&s.hide()}};return r})