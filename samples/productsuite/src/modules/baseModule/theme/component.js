define(["Boiler","text!./view.html"],function(e,t){var n={red:"./src/modules/baseModule/theme/red/common.css",gray:"./src/modules/baseModule/theme/gray/common.css"},r=function(r){var i=null,s="themeStylesheet";return{activate:function(o){i=new e.ViewTemplate(o,t,null);var u=r.retreiveObject(s);u||(u="gray"),e.ViewTemplate.setStyleLink(n[u],s),$("#theme-selector a").bind("click",function(){var t=this.text.toLowerCase();e.ViewTemplate.setStyleLink(n[t],s),r.persistObject(s,t)})},deactivate:function(){i&&i.remove()}}};return r})