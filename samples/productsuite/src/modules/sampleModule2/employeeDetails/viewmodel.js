define(["Boiler"],function(e){var t=function(t){var n=this;this.employee=ko.observable(),this.backToList=function(){e.UrlController.goTo("employee/all")},this.setEmployee=function(e){if(e){var r=t.getSettings().urls.empdetails.replace("{empid}",e);$.getJSON(r,function(r){r.imageurl=t.getSettings().urls.empimages.replace("{empid}",e),n.employee(r)})}}};return t})