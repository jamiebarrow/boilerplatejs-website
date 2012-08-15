/*!
* pubsub.js
*
* A tiny, optimized, tested, standalone and robust pubsub implementation supporting different javascript environments
*
* @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
* @see https://github.com/federico-lox/pubsub.js
*/

(function(e){function t(){var t={},n=Function;return{publish:function(){var n=!0,r=arguments,i=t[r[0]];if(i){var s=i.length,o=r.length>1?Array.prototype.splice.call(r,1):[],u=0,a=function(){for(;u<s;u++)i[u].apply(e,o);i=e=o=null};n?a():setTimeout(a,0)}},subscribe:function(e,r){if(typeof e!="string")throw"invalid or missing channel";if(r instanceof n)return t[e]||(t[e]=[]),t[e].push(r),{channel:e,callback:r};throw"invalid or missing callback"},unsubscribe:function(e,r){e.channel&&e.callback&&(r=e.callback,e=e.channel);if(typeof e!="string")throw"invalid or missing channel";if(!(r instanceof n))throw"invalid or missing callback";var i=t[e],s=i instanceof Array?i.length:0;while(s--)i[s]===r&&i.splice(s,1)}}}e.PubSub=t})(this)