define(["./storage"],function(e){_.templateSettings={interpolate:/\{\{(.+?)\}\}/g};var t;(t=e.retreive("user-language"))&&require.config({locale:t});var n=function(){};return n.localize=function(e,t){if(!t)return e;var n=_.template(e);return n({nls:t})},n.setLanguage=function(t){e.persist("user-language",t),location.reload()},n.clearLanguage=function(){e.remove("user-language"),location.reload()},n})