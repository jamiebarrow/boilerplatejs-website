/*
RequireJS i18n 1.0.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
Available via the MIT or new BSD license.
see: http://github.com/jrburke/requirejs for details
*/

(function(){function e(e,t,n,r,i,s){t[e]&&(n.push(e),(t[e]===!0||t[e]===1)&&r.push(i+e+"/"+s))}function t(e,t,n,r,i){t=r+t+"/"+i,require._fileExists(e.toUrl(t))&&n.push(t)}var n=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/,r={};define({version:"1.0.0",load:function(i,s,u,a){var a=a||{},f=n.exec(i),l=f[1],c=f[4],h=f[5],p=c.split("-"),d=[],v={},m,g,y="";f[5]?(l=f[1],i=l+h):(h=f[4],c=a.locale||(a.locale=typeof navigator=="undefined"?"root":(navigator.language||navigator.userLanguage||"root").toLowerCase()),p=c.split("-"));if(a.isBuild){d.push(i),t(s,"root",d,l,h);for(m=0;g=p[m];m++)y+=(y?"-":"")+g,t(s,y,d,l,h);s(d,function(){u()})}else s([i],function(t){var n=[];e("root",t,n,d,l,h);for(m=0;g=p[m];m++)y+=(y?"-":"")+g,e(y,t,n,d,l,h);s(d,function(){var e,i;for(e=n.length-1;e>-1&&(g=n[e]);e--){i=t[g];if(i===!0||i===1)i=s(l+g+"/"+h);var o=v,a=void 0;for(a in i)!(a in r)&&!(a in o)&&(o[a]=i[a])}u(v)})})}})})()