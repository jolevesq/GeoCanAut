/*!
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * Version: v0.0.1-development Build: 2014-06-04- 05:02 PM
 */
var locationPath;(function(){define(["jquery-private","jqueryui","gcaut-i18n","gcaut-vm-projheader","esri/config"],function(d,f,e,h,c){var b,a,g;b=function(){var j=document.getElementById("projectHeader"),i=$("#gcauttabs");d.extend(true,d,$);a();d.ajax({url:locationPath+"gcaut/config/gcaut-default.json",crossDomain:false,dataType:"json",async:false,success:function(k){c.defaults.io.proxyUrl=k.proxy;c.defaults.io.alwaysUseProxy=false;g(k.services);i.removeAttr("style");i.tabs({heightStyle:"auto",collapsible:true,active:false,disabled:true});$("#gcautmaptabs").tabs({heightStyle:"auto"});$("#gcauttoolstabs").tabs({heightStyle:"auto"});h.initialize(j,k)},error:function(){console.log("Error in gcaut-default.json")}})};a=function(){var m=document.getElementsByTagName("meta"),k=m.length;while(k--){if(m[k].getAttribute("property")==="location"){locationPath=m[k].getAttribute("content")}}if(typeof locationPath==="undefined"){var j=window.location.toString(),l=j.search("GeoCanAut");if(l!==-1){locationPath=j.substring(0,j.search("GeoCanAut"))+"GeoCanAut/"}}};g=function(i){if(typeof localStorage.servnameWMS==="undefined"){localStorage.setItem("servnameWMS",i.wms)}if(typeof localStorage.servnameWMTS==="undefined"){localStorage.setItem("servnameWMTS",i.wmts)}if(typeof localStorage.servnameCacheREST==="undefined"){localStorage.setItem("servnameCacheREST",i.esritiled)}if(typeof localStorage.servnameDynamicREST==="undefined"){localStorage.setItem("servnameDynamicREST",i.esridynamic)}};return{initialize:b}})}).call(this);