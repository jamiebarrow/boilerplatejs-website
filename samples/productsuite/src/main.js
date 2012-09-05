/*
 RequireJS text 0.27.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/

/*
RequireJS i18n 1.0.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
Available via the MIT or new BSD license.
see: http://github.com/jrburke/requirejs for details
*/

/**
 * @license RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

define("core/helpers/storage",[],function(){var e=function(){};return e.persist=function(e,t){amplify.store(e,t)},e.retreive=function(e){return amplify.store(e)},e.remove=function(e){return amplify.store(e,null)},e}),define("core/helpers/localizer",["./storage"],function(e){_.templateSettings={interpolate:/\{\{(.+?)\}\}/g};var t;(t=e.retreive("user-language"))&&require.config({locale:t});var n=function(){};return n.localize=function(e,t){if(!t)return e;var n=_.template(e);return n({nls:t})},n.setLanguage=function(t){e.persist("user-language",t),location.reload()},n.clearLanguage=function(){e.remove("user-language"),location.reload()},n}),define("core/helpers/logger",[],function(){var e=function(){this.info=function(e){console&&console.log(e)},this.error=function(e,t){console&&(console.log("ERROR : "+e),console.error(t))}};return e}),define("core/helpers/mediator",[],function(){var e=function(){var e=new PubSub;return{notify:function(t,n){e.publish(t,n)},listen:function(t,n){e.subscribe(t,n)}}};return e}),define("core/helpers/router",[],function(){var e=function(){var e=crossroads.create();return e.normalizeFn=crossroads.NORM_AS_OBJECT,{addRoute:function(t,n){e.addRoute(t,n)},init:function(){function t(t,n){e.parse(t)}hasher.initialized.add(t),hasher.changed.add(t),hasher.isActive()||hasher.init()}}};return e.routeTo=function(e){hasher.setHash(e)},e}),define("core/helpers/settings",[],function(){var e=function(e){var t=!0,n={};return{load:function(e){_.extend(n,e)},items:function(){return t&&e?_.extend(_.clone(e.items()),n):n},chainSettings:function(e){t=e}}};return e}),define("core/helpers/styler",[],function(){var e=function(e){var t=document.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=e,document.getElementsByTagName("head")[0].appendChild(t)},t=function(){};return t.attachCssLink=function(t,n){if(n){var r=document.getElementById(n);r?r.href=t:e(t)}else{var i=document.getElementsByTagName("link");for(var s=0;s<i.length;s++)if(i[s].href&&i[s].href.indexOf(t)!=-1)return;e(t)}},t.attachCssText=function(e,t){var n=document.getElementById(e);n&&n.parentNode.removeChild(n);var r=document.createElement("style");r.type="text/css",r.setAttribute("id",e),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t)),document.getElementsByTagName("head")[0].appendChild(r)},t.attachScopedCss=function(e,t){t&&(styleElement=$("<style type='text/css' scoped='scoped'>"+t+"</style>"),e.prepend(styleElement))},t}),define("core/helpers/_helpers_",["require","./localizer","./logger","./mediator","./router","./settings","./storage","./styler"],function(e){return{Localizer:e("./localizer"),Logger:e("./logger"),Mediator:e("./mediator"),Router:e("./router"),Settings:e("./settings"),Storage:e("./storage"),Styler:e("./styler")}}),define("core/context",["./helpers/_helpers_"],function(e){var t=function(t){this.parentContext=t,this.mediator=this.parentContext?this.parentContext.mediator:new e.Mediator,this.settings=this.parentContext?new e.Settings(this.parentContext.settings):new e.Settings};return t.prototype.getSettings=function(){return this.settings.items()},t.prototype.addSettings=function(e){this.settings.load(e)},t.prototype.notify=function(e,t){this.mediator.notify(e,t)},t.prototype.listen=function(e,t){this.mediator.listen(e,t)},t.prototype.persistObject=function(t,n){e.Storage.persist(t,n)},t.prototype.retreiveObject=function(t){return e.Storage.retreive(t)},t.prototype.removeObject=function(t){return e.Storage.remove(t)},t.prototype.setLanguage=function(t){return e.Localizer.setLanguage(t)},t.prototype.clearLanguage=function(){return e.Localizer.clearLanguage()},t.prototype.getParentContext=function(){return this.parentContext},t.prototype.loadChildContexts=function(e){for(var t=0;t<e.length;t++){var n=e[t];new n(this)}},t}),define("core/dom-controller",[],function(){var DomController=function(scope){var self=this;return self.handles={},{addRoutes:function(e){_.extend(self.handles,e)},start:function(){for(path in self.handles)scope.find(path).each(function(index){var paramString=$(this).attr("params"),params=paramString?eval("({"+paramString+"})"):{};$(this).trigger("DEACTIVATE_HANDLERS"),$(this).bind("DEACTIVATE_HANDLERS",function(){(function(e){e.deactivate()})(self.handles[path])}),self.handles[path].activate($(this),params)})}}};return DomController}),define("core/url-controller",["./helpers/_helpers_"],function(e){var t=function(t){function i(e){this.handle=e;var n=this;this.activate=function(e){t.trigger("DEACTIVATE_HANDLERS"),n.handle.activate(t,e)},this.deactivate=function(){jQuery.isFunction(n.handle.deactivate)&&n.handle.deactivate()}}var n={},r=new e.Router;return t.bind("DEACTIVATE_HANDLERS",function(){for(handler in n)n[handler].deactivate()}),{addRoutes:function(e){for(path in e){var t=new i(e[path]);r.addRoute(path,t.activate),n[path]=t}},start:function(){r.init()}}};return t.goTo=function(t){e.Router.routeTo(t)},t}),define("core/view-template",["./helpers/_helpers_"],function(e){var t=function(e,t,n,r){this.createView(e,t,n,r)};return t.setStyleText=function(t,n){e.Styler.attachCssText(t,n)},t.setStyleLink=function(t,n){e.Styler.attachCssLink(t,n)},t.prototype.getElementId=function(){return this.viewId},t.prototype.getJQueryElement=function(){return this.jQueryElement},t.prototype.getDomElement=function(){return this.jQueryElement.get(0)},t.prototype.appendTo=function(e){this.jQueryElement.appendTo(e)},t.prototype.remove=function(){this.jQueryElement.remove()},t.prototype.hide=function(){this.jQueryElement.hide()},t.prototype.show=function(){this.jQueryElement.show()},t.prototype.createView=function(t,n,r,i){n=e.Localizer.localize(n,r),this.viewId=_.uniqueId(["bpjscontainer_"]),this.jQueryElement=$("<span id='"+this.viewId+"'>"+n+"</span>"),e.Styler.attachScopedCss(this.jQueryElement,i),t&&t.append(this.jQueryElement)},t}),define("Boiler",["require","./core/context","./core/dom-controller","./core/url-controller","./core/view-template","./core/helpers/_helpers_"],function(e){return{Context:e("./core/context"),DomController:e("./core/dom-controller"),UrlController:e("./core/url-controller"),ViewTemplate:e("./core/view-template"),Helpers:e("./core/helpers/_helpers_")}}),define("settings",{appName:"BoilerplateJS"}),function(){var e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],t=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,n=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,r=typeof location!="undefined"&&location.href,i=r&&location.protocol&&location.protocol.replace(/\:/,""),s=r&&location.hostname,o=r&&(location.port||void 0),u=[];define("text",[],function(){var a,f,l;return typeof window!="undefined"&&window.navigator&&window.document?f=function(e,t){var n=a.createXhr();n.open("GET",e,!0),n.onreadystatechange=function(){n.readyState===4&&t(n.responseText)},n.send(null)}:typeof process!="undefined"&&process.versions&&process.versions.node?(l=require.nodeRequire("fs"),f=function(e,t){t(l.readFileSync(e,"utf8"))}):typeof Packages!="undefined"&&(f=function(e,t){var n=new java.io.File(e),r=java.lang.System.getProperty("line.separator"),n=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(n),"utf-8")),i,s,o="";try{i=new java.lang.StringBuffer,(s=n.readLine())&&s.length()&&s.charAt(0)===65279&&(s=s.substring(1));for(i.append(s);(s=n.readLine())!==null;)i.append(r),i.append(s);o=String(i.toString())}finally{n.close()}t(o)}),a={version:"0.27.0",strip:function(e){if(e){var e=e.replace(t,""),r=e.match(n);r&&(e=r[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var t,n,r;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(n=0;n<3;n++){r=e[n];try{t=new ActiveXObject(r)}catch(i){}if(t){e=[r];break}}if(!t)throw Error("createXhr(): XMLHttpRequest not available");return t},get:f,parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),e=e.substring(n+1,e.length),n=e.indexOf("!");return n!==-1&&(t=e.substring(n+1,e.length),t=t==="strip",e=e.substring(0,n)),{moduleName:r,ext:e,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,n,r){var i=a.xdRegExp.exec(e),s;return i?(e=i[2],i=i[3],i=i.split(":"),s=i[1],i=i[0],(!e||e===t)&&(!i||i===n)&&(!s&&!i||s===r)):!0},finishLoad:function(e,t,n,r,i){n=t?a.strip(n):n,i.isBuild&&i.inlineText&&(u[e]=n),r(n)},load:function(e,t,n,u){var f=a.parseName(e),l=f.moduleName+"."+f.ext,c=t.toUrl(l),h=u&&u.text&&u.text.useXhr||a.useXhr;!r||h(c,i,s,o)?a.get(c,function(t){a.finishLoad(e,f.strip,t,n,u)}):t([l],function(e){a.finishLoad(f.moduleName+"."+f.ext,f.strip,e,n,u)})},write:function(e,t,n){if(t in u){var r=a.jsEscape(u[t]);n.asModule(e+"!"+t,"define(function () { return '"+r+"';});\n")}},writeFile:function(e,t,n,r,i){var t=a.parseName(t),s=t.moduleName+"."+t.ext,o=n.toUrl(t.moduleName+"."+t.ext)+".js";a.load(s,n,function(){var t=function(e){return r(o,e)};t.asModule=function(e,t){return r.asModule(e,o,t)},a.write(e,s,t,i)},i)}}})}(),define("text!modules/baseModule/mainMenu/view.html",[],function(){return'<div class="black-title-with-bullet">\r\n    <span>Main Menu</span>\r\n</div>\r\n<ul>\r\n    <span class="menu-item" id="home"><a href="#">{{nls.home}}</a></span>\r\n</ul>\r\n<ul>\r\n    <span class="menu-item" id="product-module-a">{{nls.productmodulea}}</span>\r\n    <li>\r\n        <a href="#clickcounter">{{nls.clickcounter}}</a>\r\n    </li>\r\n    <li>\r\n        <a href="#departments">{{nls.departments}}</a>\r\n    </li>\r\n</ul>\r\n<ul>\r\n    <span class="menu-item" id="product-module-b">{{nls.productmoduleb}}</span>\r\n    <li>\r\n        <a href="#sales">{{nls.salesdashboard}}</a>\r\n    </li>\r\n    <li>\r\n        <a href="#employee/all">{{nls.employees}}</a>\r\n    </li>\r\n</ul>'}),function(){function e(e,t,n,r,i,s){t[e]&&(n.push(e),(t[e]===!0||t[e]===1)&&r.push(i+e+"/"+s))}function t(e,t,n,r,i){t=r+t+"/"+i,require._fileExists(e.toUrl(t))&&n.push(t)}var n=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/,r={};define("i18n",{version:"1.0.0",load:function(i,s,u,a){var a=a||{},f=n.exec(i),l=f[1],c=f[4],h=f[5],p=c.split("-"),d=[],v={},m,g,y="";f[5]?(l=f[1],i=l+h):(h=f[4],c=a.locale||(a.locale=typeof navigator=="undefined"?"root":(navigator.language||navigator.userLanguage||"root").toLowerCase()),p=c.split("-"));if(a.isBuild){d.push(i),t(s,"root",d,l,h);for(m=0;g=p[m];m++)y+=(y?"-":"")+g,t(s,y,d,l,h);s(d,function(){u()})}else s([i],function(t){var n=[];e("root",t,n,d,l,h);for(m=0;g=p[m];m++)y+=(y?"-":"")+g,e(y,t,n,d,l,h);s(d,function(){var e,i;for(e=n.length-1;e>-1&&(g=n[e]);e--){i=t[g];if(i===!0||i===1)i=s(l+g+"/"+h);var o=v,a=void 0;for(a in i)!(a in r)&&!(a in o)&&(o[a]=i[a])}u(v)})})}})}(),define("modules/baseModule/mainMenu/nls/resources",{root:{home:"Home",productmodulea:"Product Module A",productmoduleb:"Product Module B",departments:"Knockout MVVM",clickcounter:"Click Counter",salesdashboard:"Complex Dashboard",employees:"List-Detail Panels"},sv:!0}),define("path",{stringEndsWith:function(e,t){return e.indexOf(t,e.length-t.length)!==-1},load:function(e,t,n,r){var i=t.toUrl(e);!this.stringEndsWith(e,".js")&&this.stringEndsWith(i,".js")&&(i=i.substring(0,i.length-3)),n(i)}}),define("modules/baseModule/mainMenu/component",["require","Boiler","text!./view.html","i18n!./nls/resources","path!./style.css"],function(e,t,n,r,i){var s=function(e){var s=null;return{activate:function(e){s=new t.ViewTemplate(e,n,r),t.ViewTemplate.setStyleLink(i)},deactivate:function(){s&&s.remove()}}};return s}),define("text!modules/baseModule/language/view.html",[],function(){return'<ul class="horizontal-list">\r\n    <li>Language | </li>\r\n    <li>\r\n        <a class="en" id="langEn">English</a>\r\n    </li>\r\n    <li>\r\n        <a class="sv" id="langSv">Swedish</a>\r\n    </li>\r\n</ul>'}),define("modules/baseModule/language/component",["require","Boiler","text!./view.html"],function(e,t,n){var r=function(e){var r=null;return{activate:function(i){r=new t.ViewTemplate(i,n,null),$("#langEn").click(function(t){e.setLanguage("en")}),$("#langSv").click(function(t){e.setLanguage("sv")}),$("#clearLang").click(function(t){e.clearLanguage()})},deactivate:function(){r&&r.remove()}}};return r}),define("text!modules/baseModule/theme/view.html",[],function(){return'<ul class="horizontal-list" id="theme-selector">\n	<li>Select a theme | </li>\n    <li><a>Gray</a></li>\n    <li><a>Red</a></li>\n</ul>'}),define("modules/baseModule/theme/component",["Boiler","text!./view.html"],function(e,t){var n={red:"./src/modules/baseModule/theme/red/common.css",gray:"./src/modules/baseModule/theme/gray/common.css"},r=function(r){var i=null,s="themeStylesheet";return{activate:function(o){i=new e.ViewTemplate(o,t,null);var u=r.retreiveObject(s);u||(u="gray"),e.ViewTemplate.setStyleLink(n[u],s),$("#theme-selector a").bind("click",function(){var t=this.text.toLowerCase();e.ViewTemplate.setStyleLink(n[t],s),r.persistObject(s,t)})},deactivate:function(){i&&i.remove()}}};return r}),define("text!modules/baseModule/landingPage/view.html",[],function(){return'<div class="portlet-blue">\r\n    <div class="title"><span>Welcome to BoilerplateJS!</span></div>\r\n    <div class="content">\r\n        <p>\r\n            Congratulations! You are one step closer to creating your next big Javascript application!\r\n            This demo shows you some of the common user scenarios that you can implement with BoilerplateJS.\r\n            Checkout the product modules\r\n            by navigating through the left navigation pane.\r\n        </p>\r\n\r\n        <h4>Product Module A</h4>\r\n\r\n        <p>The panels under this section show the usage of KnockoutJS with BoilerplateJS.</p>\r\n        <a href="#clickcounter">Click Counter</a> is a simple adaptation of knockoutJS’s <a\r\n            href="http://knockoutjs.com/examples/clickCounter.html" target="_blank">Click Counter example</a>.<br/>\r\n        <a href="#departments">Knockout MVVM</a> shows a more complex usage of knockoutJS’s MVVM\r\n        architecture and its data bindings. The data for this panel is loaded from the server.\r\n\r\n        <h4>Product Module B</h4>\r\n\r\n        <p>The panels under this section show the usage some of the advanced patterns.</p>\r\n        <a href="#sales">Complex Dashboard</a> uses a shared view model. There are two views in\r\n        this dashboard that use the same shared view model, which enables them to respond to changes among the\r\n        views.<br/>\r\n        <a href="#employee/all">The List-Detail panels</a> show a list view and a detail view\r\n        together with URL based navigation.\r\n\r\n        <h4>Languages and Themes</h4>\r\n\r\n        <p>Languages and Themes are two feature plugins that we developed for BoilerplateJS.</p>\r\n\r\n        <p>We realized that for some applications, multilingual support is essential.\r\n            On this demo we use RequireJS’s <a href="http://requirejs.org/docs/api.html#i18n" target="_blank">i18n\r\n                plugin</a>\r\n            to manage two language packs.</p>\r\n\r\n        <p>Presentation and styling should be separate from the rest of the logic of your code. Careful thought went\r\n            into designing\r\n            BoilerplateJS’s style sheet structure which allows us to change between themes seamlessly. Try changing\r\n            into different\r\n            themes from the top combo box.</p>\r\n\r\n        <p>We strongly believe loose coupling is the key to maintainable and adaptable code,\r\n            and that’s why we do not want to tie you up with a specific technology or library.\r\n            To prove this point, we’ve implemented the language and themes modules using pure jQuery, and no\r\n            Knockout bindings!</p>\r\n    </div>\r\n</div>\r\n\r\n'}),define("modules/baseModule/landingPage/component",["Boiler","text!./view.html"],function(e,t){var n=function(n){var r=null;this.activate=function(n,i){r||(r=new e.ViewTemplate(n,t)),r.show()},this.deactivate=function(){r&&r.hide()}};return n}),define("text!modules/baseModule/footer/view.html",[],function(){return'<div class="wrapper">\n    <div class="content">Released under MIT License</div>\n</div>\n'}),define("modules/baseModule/footer/component",["Boiler","text!./view.html"],function(e,t){var n=function(n){var r=null;this.activate=function(n){r||(r=new e.ViewTemplate(n,t)),r.show()},this.deactivate=function(){r&&r.hide()}};return n}),define("modules/baseModule/module",["Boiler","./mainMenu/component","./language/component","./theme/component","./landingPage/component","./footer/component"],function(e,t,n,r,i,s){var o=function(o){var u=new e.Context(o),a=new e.DomController($("#page-content"));a.addRoutes({".main-menu":new t(u),".language":new n(u),".theme":new r(u),".footer":new s(u)}),a.start();var a=new e.UrlController($(".appcontent"));a.addRoutes({"/":new i}),a.start()};return o}),define("modules/sampleModule1/settings",["path!../../../server/"],function(e){return{urls:{departments:e+"departments.txt"}}}),define("text!modules/sampleModule1/departments/view.html",[],function(){return'<div class="portlet-blue">\r\n    <div class="title"><span>{{nls.title}}</span></div>\r\n    <div class="content">\r\n        <div class="input-field"><span>{{nls.createnew}}: </span><input class="txtbox-input " type="text"\r\n                                                                        data-bind=\'value:itemToAdd, valueUpdate: "afterkeydown"\'/>\r\n            <button data-bind="enable: itemToAdd().length > 0, click: addItem"/>\r\n            {{nls.adddept}}</button>\r\n        </div>\r\n\r\n        <div class="sub-title">{{nls.deptlist}}</div>\r\n        <div class="input-field"><select class="select-input" multiple="multiple"\r\n                                         data-bind="options:allItems, selectedOptions:selectedItems"></select></div>\r\n        <div>\r\n            <button data-bind="click: removeSelected, enable: selectedItems().length > 0">\r\n                {{nls.remove}}\r\n            </button>\r\n            <button data-bind="click: sortItems, enable: allItems().length > 1">\r\n                {{nls.sort}}\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>'}),define("modules/sampleModule1/departments/viewmodel",[],function(){var e="Boiler Department",t=function(t){var n=this;this.itemToAdd=ko.observable(e),this.allItems=ko.observableArray([]),this.selectedItems=ko.observableArray(),this.initialize=function(r){r?this.itemToAdd(r):this.itemToAdd(e),$.getJSON(t.getSettings().urls.departments,function(e){n.allItems(e)})},this.addItem=function(){this.itemToAdd()!=""&&this.allItems.indexOf(this.itemToAdd())<0&&this.allItems.push(this.itemToAdd()),this.itemToAdd("")},this.removeSelected=function(){this.allItems.removeAll(this.selectedItems()),this.selectedItems([])},this.sortItems=function(){this.allItems.sort()}};return t}),define("modules/sampleModule1/departments/nls/resources",{root:{title:"Manage Drepartments",deptlist:"Department List",createnew:"Create a new department",adddept:"Add Dept",remove:"Remove",sort:"Sort"},sv:!0}),define("modules/sampleModule1/departments/component",["Boiler","text!./view.html","./viewmodel","i18n!./nls/resources","path!./style.css"],function(e,t,n,r,i){var s=function(s){var o,u=null;this.activate=function(a,f){o||(o=new e.ViewTemplate(a,t,r),e.ViewTemplate.setStyleLink(i),u=new n(s),ko.applyBindings(u,o.getDomElement())),u.initialize(f.name),o.show()},this.deactivate=function(){o&&o.hide()}};return s}),define("modules/sampleModule1/clickCounter/viewmodel",[],function(){var e=function(e){this.numberOfClicks=ko.observable(0),this.registerClick=function(){this.numberOfClicks(this.numberOfClicks()+1)},this.resetClicks=function(){this.numberOfClicks(0)},this.hasClickedTooManyTimes=ko.computed(function(){return this.numberOfClicks()>=3},this)};return e}),define("text!modules/sampleModule1/clickCounter/view.html",[],function(){return"<div class=\"portlet-blue\">\r\n    <div class=\"title\"><span>Click Counter</span></div>\r\n    <div class=\"content\">\r\n        <div>You've clicked <span data-bind='text: numberOfClicks'>&nbsp;</span> times</div>\r\n        <br/>\r\n        <button data-bind='click: registerClick, disable: hasClickedTooManyTimes'>Click me</button>\r\n        <div data-bind='visible: hasClickedTooManyTimes'>\r\n            <div class=\"error\">That's too many clicks! Please stop before you wear out your fingers.</div>\r\n            <br/><br/>\r\n            <button data-bind='click: resetClicks'>Reset clicks</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n"}),define("modules/sampleModule1/clickCounter/component",["Boiler","./viewmodel","text!./view.html"],function(e,t,n){var r=function(r){var i,s=null;this.activate=function(o,u){s||(s=new e.ViewTemplate(o,n,null),i=new t(r),ko.applyBindings(i,s.getDomElement())),s.show()},this.deactivate=function(){s&&s.hide()}};return r}),define("modules/sampleModule1/module",["Boiler","./settings","./departments/component","./clickCounter/component"],function(e,t,n,r){var i=function(i){var s=new e.Context(i);s.addSettings(t);var o=new e.UrlController($(".appcontent"));o.addRoutes({"departments/:name:":new n(s),clickcounter:new r(s)}),o.start()};return i}),define("modules/sampleModule2/settings",["path!../../../server/"],function(e){return{urls:{empimages:e+"{empid}.png",empdetails:e+"{empid}.txt",yearlysales:e+"yearly-sales.txt",employees:e+"employees.txt"}}}),define("text!modules/sampleModule2/employeeList/view.html",[],function(){return'<div class="portlet-blue">\r\n\r\n    <div class="title"><span>Sales Person List</span>\r\n    </div>\r\n    <div class="content">\r\n        <table cellpadding="0" cellspacing="0">\r\n            <thead>\r\n            <tr>\r\n                <th>First name</th>\r\n                <th>Last Name</th>\r\n                <th>Average Sales</th>\r\n            </tr>\r\n            </thead>\r\n\r\n            <tbody data-bind="foreach:salesPersons">\r\n            <tr>\r\n                <td><a href="#" data-bind="text: firstName, click:$root.personClicked"></a></td>\r\n                <td><a href="#" data-bind="text: lastName, click:$root.personClicked"></a></td>\r\n                <td><a href="#" data-bind="text: averageSales, click:$root.personClicked"></a></td>\r\n            </tr>\r\n            </tbody>\r\n\r\n        </table>\r\n    </div>\r\n</div>\r\n'}),define("modules/sampleModule2/employeeList/viewmodel",["Boiler"],function(e){var t=function(t){var n=this;this.salesPersons=ko.observableArray(),this.personClicked=function(t){e.UrlController.goTo("employee/"+t.id)},$.getJSON(t.getSettings().urls.employees,function(e){n.salesPersons(e)})};return t}),define("modules/sampleModule2/employeeList/component",["Boiler","text!./view.html","./viewmodel"],function(e,t,n){var r=function(r){var i,s=null;this.activate=function(o,u){s||(i=new n(r),s=new e.ViewTemplate(o,t),ko.applyBindings(i,s.getDomElement())),s.show()},this.deactivate=function(){s&&s.hide()}};return r}),define("text!modules/sampleModule2/employeeDetails/view.html",[],function(){return'<div class="portlet-gray">\r\n\r\n    <div class="title"><span>Sales Person Details</span>\r\n    </div>\r\n\r\n    <div class="content">\r\n        <table data-bind="with:employee">\r\n            <tbody>\r\n            <tr>\r\n                <td rowspan="7" width="150"><img data-bind="attr : {src: imageId}"/></td>\r\n            </tr>\r\n            <tr>\r\n                <td>ID</td>\r\n                <td><strong data-bind="text: id"></strong></td>\r\n            </tr>\r\n            <tr>\r\n                <td>First name</td>\r\n                <td><strong data-bind="text: firstName"></strong></td>\r\n            </tr>\r\n            <tr>\r\n                <td>Last name</td>\r\n                <td><strong data-bind="text: lastName"></strong></td>\r\n            </tr>\r\n            <tr>\r\n                <td>Age</td>\r\n                <td><strong data-bind="text: age"></strong></td>\r\n            </tr>\r\n            <tr>\r\n                <td>Email</td>\r\n                <td><strong data-bind="text: email"></strong></td>\r\n            </tr>\r\n            <tr>\r\n                <td>Average Sales</td>\r\n                <td><strong data-bind="text: averageSales"></strong></td>\r\n            </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n        <a data-bind="click:backToList" href=""> << Back to list</a>\r\n    </div>\r\n\r\n</div>'}),define("text!modules/sampleModule2/employeeDetails/style.css",[],function(){return"#salesperson-details {\r\n	display: block;\r\n	margin-left: auto;\r\n	margin-right: auto;\r\n}\r\n"}),define("modules/sampleModule2/employeeDetails/viewmodel",["Boiler"],function(e){var t=function(t){var n=this;this.employee=ko.observable(),this.backToList=function(){e.UrlController.goTo("employee/all")},this.setEmployee=function(e){if(e){var r=t.getSettings().urls.empdetails.replace("{empid}",e);$.getJSON(r,function(r){r.imageurl=t.getSettings().urls.empimages.replace("{empid}",e),n.employee(r)})}}};return t}),define("modules/sampleModule2/employeeDetails/component",["Boiler","text!./view.html","text!./style.css","./viewmodel"],function(e,t,n,r){var i=function(i){var s,o=null;this.activate=function(u,a){o||(s=new r(i,a.id),o=new e.ViewTemplate(u,t,null,n),ko.applyBindings(s,o.getDomElement())),s.setEmployee(a.id),o.show()},this.deactivate=function(){o&&o.hide()}};return i}),define("text!modules/sampleModule2/salesDashboard/view.html",[],function(){return'<div>\n	<div id="tree">\n	</div>\n	<div id="chart">\n	</div>\n</div>\n'}),define("modules/sampleModule2/salesDashboard/chartBinding",[],function(){var e=function(e,t){if(t.dataItems.length>0){var n={lines:{show:!0},points:{show:!0},xaxis:{ticks:t.tickLabels}},r=[{label:t.label,data:t.dataItems}];$.plot(e,r,n)}};ko.bindingHandlers.flotChart={init:function(t,n){e(t,n())},update:function(t,n){e(t,n())}}}),define("modules/sampleModule2/salesDashboard/viewmodel",["./chartBinding","path!./treeViewPanel/jstreestyle/"],function(e,t){var n=function(e){var n=this;this.salesInfo=ko.observableArray(),this.selectedDept=ko.observable(""),this.selectedData=ko.observableArray(),this.chartData=ko.computed(function(){var e=_.map(n.selectedData().values,function(e,t){return[t,e.month]}),t=_.map(n.selectedData().values,function(e,t){return[t,e.sales]}),r=n.selectedDept()+" - "+n.selectedData().year;return{tickLabels:e,dataItems:t,label:r}}),this.drawTree=function(){$.jstree._themes=t,$("#treeView").jstree({themes:{theme:"apple"},plugins:["themes","html_data"],core:{initially_open:["salesDept"]}})},this.yearClicked=function(e,t){n.selectedDept(e),n.selectedData(t)},$.getJSON(e.getSettings().urls.yearlysales,function(e){n.salesInfo(e),n.selectedDept(e[0].name),n.selectedData(e[0].years[0])})};return n}),define("text!modules/sampleModule2/salesDashboard/chartViewPanel/view.html",[],function(){return'<div class="portlet-gray width_3_quarter right">\r\n\r\n    <div class="title"><span>Anunual Sales Graph - <strong data-bind="text: selectedDept"></strong> Department</span>\r\n    </div>\r\n    <div class="content">\r\n        <div id="chart-placeholder" data-bind="flotChart: chartData()"></div>\r\n\r\n\r\n        <div class="sub-title">Sales for the Year <strong\r\n                data-bind="text: selectedData().year"></strong></div>\r\n\r\n\r\n        <table cellpadding="0" cellspacing="0">\r\n            <tr>\r\n                <th>Month</th>\r\n                <th>Sales</th>\r\n            </tr>\r\n            </thead>\r\n\r\n            <tbody data-bind="foreach:selectedData().values">\r\n            <tr>\r\n                <td data-bind="text: month"></td>\r\n                <td data-bind="text: sales"></td>\r\n            </tr>\r\n            </tbody>\r\n\r\n        </table>\r\n    </div>\r\n\r\n</div>'}),define("text!modules/sampleModule2/salesDashboard/chartViewPanel/style.css",[],function(){return"#chart-placeholder table{\n	width:auto;\n}\n#chart-placeholder {\n	height: 200px;\n}\n"}),define("modules/sampleModule2/salesDashboard/chartViewPanel/component",["Boiler","text!./view.html","text!./style.css"],function(e,t,n){var r=function(r){new e.ViewTemplate(r,t,null,n)};return r}),define("text!modules/sampleModule2/salesDashboard/treeViewPanel/view.html",[],function(){return'<div class="portlet-blue width_quarter left">\r\n    <div class="title"><span>Sales Departments</span></div>\r\n\r\n    <div class="content">\r\n        <div id="treeView">\r\n            <ul id="salesInfo" data-bind="foreach:{data : salesInfo ,afterRender: drawTree }">\r\n                <li class="department">\r\n				<span\r\n                        data-bind="text: name"></span>\r\n                    <ul id="salesDept" data-bind="foreach: years">\r\n                        <li class="years">\r\n                            <a href="#"\r\n                               data-bind="text: year, click:function(data, event) { $root.yearClicked($parent.name,data); }"></a>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>'}),define("text!modules/sampleModule2/salesDashboard/treeViewPanel/style.css",[],function(){return"#treeView {\n	width: 90%;\n	float: left;\n}\n"}),define("modules/sampleModule2/salesDashboard/treeViewPanel/component",["Boiler","text!./view.html","text!./style.css"],function(e,t,n){var r=function(r){new e.ViewTemplate(r,t,null,n)};return r}),define("modules/sampleModule2/salesDashboard/component",["Boiler","text!./view.html","./viewmodel","./chartViewPanel/component","./treeViewPanel/component"],function(e,t,n,r,i){var s=function(s){var o,u=null;this.activate=function(a,f){o||(u=new n(s),o=new e.ViewTemplate(a,t),new i(o.getJQueryElement()),new r(o.getJQueryElement()),ko.applyBindings(u,o.getDomElement())),o.show()},this.deactivate=function(){o&&o.hide()}};return s}),define("modules/sampleModule2/module",["Boiler","./settings","./employeeList/component","./employeeDetails/component","./salesDashboard/component"],function(e,t,n,r,i){var s=function(s){var o=new e.Context(s);o.addSettings(t);var u=new e.UrlController($(".appcontent"));u.addRoutes({"employee/all":new n(o),"employee/{id}":new r(o),sales:new i(o)}),u.start()};return s}),define("modules/modules",["require","./baseModule/module","./sampleModule1/module","./sampleModule2/module"],function(e){return[e("./baseModule/module"),e("./sampleModule1/module"),e("./sampleModule2/module")]}),define("application",["Boiler","./settings","./modules/modules"],function(e,t,n){var r=function(){var r=new e.Context;r.addSettings(t),r.loadChildContexts(n)};return r}),define("domReady",[],function(){function u(e){var t;for(t=0;t<e.length;t++)e[t](n)}function a(){var e=r;t&&e.length&&(r=[],u(e))}function f(){t||(t=!0,o&&clearInterval(o),a())}function c(e){return t?e(n):r.push(e),c}var e=typeof window!="undefined"&&window.document,t=!e,n=e?document:null,r=[],i,s,o;if(e){if(document.addEventListener)document.addEventListener("DOMContentLoaded",f,!1),window.addEventListener("load",f,!1);else if(window.attachEvent){window.attachEvent("onload",f),s=document.createElement("div");try{i=window.frameElement===null}catch(l){}s.doScroll&&i&&window.external&&(o=setInterval(function(){try{s.doScroll(),f()}catch(e){}},30))}(document.readyState==="complete"||document.readyState==="interactive")&&f()}return c.version="2.0.0",c.load=function(e,t,n,r){r.isBuild?n(null):c(n)},c}),require.config({paths:{text:"../libs/require/text",order:"../libs/require/order",i18n:"../libs/require/i18n",domReady:"../libs/require/domReady",path:"../libs/require/path",Boiler:"./core/_boiler_"}}),require(["./application","domReady"],function(e,t){t(function(){new e})}),define("main",function(){})