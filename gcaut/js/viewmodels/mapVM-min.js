/*!
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 *  Project header view model widget
 */
(function(){define(["jquery-private","knockout","jqueryui","gcaut-i18n","gcaut-func","gcaut-esri","gcaut-esriwms","gcaut-wms","gcaut-gismap","gcaut-gisservinfo"],function(k,l,a,n,j,o,m,i,g,c){var d,h,e,f,b;d=function(p,r){var q=function(F,t){var y=this,E=locationPath+"gcaut/images/projNew.png",H=locationPath+"gcaut/images/mapValidate.png",w=locationPath+"gcaut/images/mapExtent.png",A=locationPath+"gcaut/images/projDelete.gif",I=locationPath+"gcaut/images/mapCheckAll.png",s=locationPath+"gcaut/images/mapUncheckAll.png",G=j.getSrType(n.getDict("%map-sr")),C=j.getListCB(n.getDict("%map-basetypelist")),x=j.getListCB(n.getDict("%map-layertypelist")),D=t.size,J=t.map,z=J.layers,v=J.extentmax,B=J.extentinit,u=J.lods;y.imgNew=E;y.imgValid=H;y.imgExtent=w;y.imgDelete=A;y.imgCheckAll=I;y.imgUncheckAll=s;y.tpNew=n.getDict("%projheader-tpnewmap");y.hiddenLayer=l.observable("gcaut-hidden");y.hiddenMap=l.observable("gcaut-hidden");y.errormsg=l.observable("gcaut-message-error");y.errortextbase=l.observable();y.errortextlayer=l.observable();y.msgHeight=n.getDict("%map-msgheight");y.msgWidth=n.getDict("%map-msgwidth");y.lblRemove=n.getDict("%remove");y.lblMapSize=n.getDict("%size");y.lblMapHeight=n.getDict("%height");y.lblMapWidth=n.getDict("%width");y.lblLink=n.getDict("%map-link");y.lblResol=n.getDict("%map-resolution");y.lblLods=n.getDict("%map-lods");y.lblLevel=n.getDict("%map-level");y.lblBasemap=n.getDict("%map-basemap");y.lblMapSR=n.getDict("%map-spatialref");y.lblUrlGeomServer=n.getDict("%map-urlgeomserver");y.lblUrlProxy=n.getDict("%map-urlproxy");y.lblUrlDownload=n.getDict("%map-urldownload");y.lblExtentMax=n.getDict("%map-extentmax");y.lblExtentInit=n.getDict("%map-extentinit");y.lblExtentMinX=n.getDict("%map-extentminx");y.lblExtentMinY=n.getDict("%map-extentminy");y.lblExtentMaxX=n.getDict("%map-extentmaxx");y.lblExtentMaxY=n.getDict("%map-extentmaxy");y.lblSelectItem=n.getDict("%selectItem");y.lblAddLayer=n.getDict("%map-addlayer");y.lblLayerType=n.getDict("%map-layertype");y.lblLayerURL=n.getDict("%map-layerurl");y.lblSetExtent=n.getDict("%map-setextent");y.lblScale=n.getDict("%map-scale");y.lblScaleMin=n.getDict("%minimum");y.lblScaleMax=n.getDict("%maximum");y.lblCluster=n.getDict("%map-lblcluster");y.lblClusterEnable=n.getDict("%map-lblclusterenable");y.lblClusterDist=n.getDict("%map-lblclusterdist");y.lblClusterLabel=n.getDict("%map-lblclusterlabel");y.lblClusterSymbol=n.getDict("%map-lblclustersymbol");y.lblClusterSize=n.getDict("%map-lblclustersize");y.lblClusterData=n.getDict("%map-lblclusterdata");y.txtLayerErr=n.getDict("%map-layererror");y.focusMapHeight=l.observable(true);y.isLayerDialogOpen=l.observable();y.isExtentDialogOpen=l.observable();y.extentType=l.observable();y.baseURL=l.observable();y.layerURL=l.observable();y.availServBase=l.observableArray([]);y.availServLayer=l.observableArray([]);y.urlGeomServer=l.observable(J.urlgeomserv);y.urlProxy=l.observable(J.urlproxy);y.urlDownload=l.observable(J.urldownload);y.mapHeightValue=l.observable(D.height).extend({numeric:{precision:0,validation:{min:400,max:2000,id:"msg_height",msg:y.msgHeight}}});y.mapWidthValue=l.observable(D.width).extend({numeric:{precision:0,validation:{min:500,max:2000,id:"msg_width",msg:y.msgWidth}}});y.isLink=l.observable(J.link);y.setExtentMinX=l.observable().extend({numeric:{precision:5}});y.setExtentMinY=l.observable().extend({numeric:{precision:5}});y.setExtentMaxX=l.observable().extend({numeric:{precision:5}});y.setExtentMaxY=l.observable().extend({numeric:{precision:5}});y.selectedType=l.observable(0);y.bases=l.observableArray();y.baseType=C;y.selectBaseLayerType=l.observable();setTimeout(function(){y.bases(J.bases);y.selectBaseLayerType(C[1])},750);y.srType=G;y.isLods=l.observable(u.enable);y.lods=l.observableArray(u.values);y.selectMapSR=l.observable(G[j.getSrTypeIndex(G,J.sr.wkid)]);y.maxExtentMinX=l.observable(v.xmin).extend({numeric:{precision:5}});y.maxExtentMinY=l.observable(v.ymin).extend({numeric:{precision:5}});y.maxExtentMaxX=l.observable(v.xmax).extend({numeric:{precision:5}});y.maxExtentMaxY=l.observable(v.ymax).extend({numeric:{precision:5}});y.initExtentMinX=l.observable(B.xmin).extend({numeric:{precision:5}});y.initExtentMinY=l.observable(B.ymin).extend({numeric:{precision:5}});y.initExtentMaxX=l.observable(B.xmax).extend({numeric:{precision:5}});y.initExtentMaxY=l.observable(B.ymax).extend({numeric:{precision:5}});y.isLayer=l.observable(false);y.layers=l.observableArray(J.layers).extend({rateLimit:{method:"notifyWhenChangesStop",timeout:500}});y.layerType=x;y.selectLayerType=l.observable();y.servLayers=l.observableArray();y.selectBaseLayerType.subscribe(function(K){return y.availServBase(y.setServName(K.id))});y.selectLayerType.subscribe(function(K){return y.availServLayer(y.setServName(K.id))});l.utils.arrayForEach(y.lods(),function(K){K.isChecked=l.observable(K.check)});y.checkLods=function(K){l.utils.arrayForEach(y.lods(),function(L){L.isChecked(K)})};l.utils.arrayForEach(y.layers(),function(L){var M=L.scale,K=L.cluster;M.min=l.observable(M.min).extend({numeric:{precision:0}});M.max=l.observable(M.max).extend({numeric:{precision:0}});K.enable=l.observable(K.enable);K.distance=l.observable(K.distance).extend({numeric:{precision:0}});K.label=l.observable(K.label);K.symbol=l.observable(K.symbol);K.maxsizeprop=l.observable(K.maxsizeprop).extend({numeric:{precision:0}});K.maxdataprop=l.observable(K.maxdataprop).extend({numeric:{precision:0}})});h(l,F);y.init=function(){y.layers.valueHasMutated();return{controlsDescendantBindings:true}};y.bind=function(){h(l,k("#map_addlayer")[0]);h(l,k("#map_extent")[0]);h(l,F);l.applyBindings(y,F)};y.getLayerType=function(K){return j.getListValue(y.layerType,K.type)};y.dialogLayerOk=function(){y.updateLayers(y.servLayers(),z,y.selectedType());y.dialogLayerCancel()};y.dialogLayerCancel=function(){y.baseURL("");y.layerURL("");y.hiddenLayer("gcaut-hidden");y.isLayerDialogOpen(false)};y.updateLayers=function(O,U,V){var S,Z,L,R,M,K,Q=O,N=y.isLayer()?"layer":"base",T=Q.length;if(V===2||V===4){S=Q[0];R=S.url.indexOf("MapServer")-1;L=S.url.substring(0,R);M=L.lastIndexOf("/")+1;L=L+"/MapServer";K=L.substring(M,R);if(N==="base"){y.bases.push({label:K,id:j.getUUID(),type:S.type,url:L})}else{y.layers.push({label:K,id:j.getUUID(),type:S.type,url:L,scale:S.scale,cluster:S.cluster})}}else{if(V===5){while(T--){S=Q[T];R=S.url.indexOf("MapServer")-1;L=S.url.substring(0,R);M=L.lastIndexOf("/")+1;K=L.substring(M,R);Z=S.servLayers;if(Z.length===0){if(S.isChecked()){y.layers.push({label:K+"***"+S.fullname,id:j.getUUID(),type:S.type,url:S.url,scale:S.scale,cluster:S.cluster})}}else{y.updateLayers(Z,U,V)}}}else{if(V===3){var P,Y=[],W=[],X={};while(T--){S=Q[T];if(S.isChecked()){K=S.name;P={};W.push(K);P.name=K;P.title=S.id;Y.push(P)}}X.layerinfos=Y;X.visiblelayers=W;S=Q[0];y.bases.push({label:S.fullname,id:j.getUUID(),type:S.type,url:S.url,options:X})}}}};y.checkAll=function(N,M){var L,K=N.length;while(K--){L=N[K];L.isUse(M);L.isChecked(M);f(L,1)}return true};y.cascadeCheck=function(L,M){var K=!M.isChecked();M.isUse(K);e(L,K);f(M,0);return true};e=function(N,P){var O,L,K=N.length-1,M=0;while(M!==K){L=false;O=N[M];M++;l.utils.arrayForEach(O.servLayers,function(Q){if(Q.isUse()){L=true}});if(L){O.isUse(true)}else{O.isUse(P)}}};f=function(L,M){var K=M?!L.isChecked():L.isChecked();l.utils.arrayForEach(L.servLayers,function(N){N.isUse(!K);N.isChecked(!K);f(N,1)})};y.dialogExtentOk=function(){var K=y.extentType();if(K==="max"){y.maxExtentMinX(y.setExtentMinX());y.maxExtentMinY(y.setExtentMinY());y.maxExtentMaxX(y.setExtentMaxX());y.maxExtentMaxY(y.setExtentMaxY())}else{y.initExtentMinX(y.setExtentMinX());y.initExtentMinY(y.setExtentMinY());y.initExtentMaxX(y.setExtentMaxX());y.initExtentMaxY(y.setExtentMaxY())}y.dialogExtentCancel()};y.dialogExtentCancel=function(){k("#map_setExtent").remove();y.hiddenMap("gcaut-hidden");y.isExtentDialogOpen(false)};y.setExtent=function(N){var M=[],L={width:y.mapWidthValue(),height:y.mapHeightValue()},K=[y.setExtentMinX,y.setExtentMinY,y.setExtentMaxX,y.setExtentMaxY];y.extentType(N);y.isExtentDialogOpen(true);y.hiddenMap("");if(N==="init"){M=[y.initExtentMinX(),y.initExtentMinY(),y.initExtentMaxX(),y.initExtentMaxY()]}else{M=[y.maxExtentMinX(),y.maxExtentMinY(),y.maxExtentMaxX(),y.maxExtentMaxY()]}g.createMap("map_setExtent",y.selectBaseLayerType().id,y.bases()[0],M,y.selectMapSR().id,L,K)};y.setServName=function(L){var K;if(L===1){K=localStorage.servnameWMTS.split(";")}else{if(L===2){K=localStorage.servnameCacheREST.split(";")}else{if(L===3){K=localStorage.servnameWMS.split(";")}else{if(L===4){K=localStorage.servnameDynamicREST.split(";")}else{if(L===5){K=localStorage.servnameDynamicREST.split(";")}}}}}return K};y.removeLayer=function(K){if(K==="base"){y.bases.remove(this)}else{y.layers.remove(this)}};y.setURL=function(K,L){if(y.bases().length===0){y.baseURL(L.item.value)}else{y.layerURL(L.item.value)}return false};y.validateURL=function(M){var N,K,L;if(M==="base"){y.isLayer(false);K=y.baseURL();L=y.selectBaseLayerType().id}else{y.isLayer(true);K=y.layerURL();L=y.selectLayerType().id}N=j.checkFormatURL(K,L);if(M==="base"){y.errortextbase("")}else{y.errortextlayer("")}if(N){c.getResourceInfo(K,L,y.readServInfo,function(){M==="base"?y.errortextbase(y.txtLayerErr):y.errortextlayer(y.txtLayerErr)})}else{M==="base"?y.errortextbase(y.txtLayerErr):y.errortextlayer(y.txtLayerErr)}};y.readServInfo=function(K,M,L){var O,P=[],N=y.isLayer()?"layer":"base";y.selectedType(M);if(L.hasOwnProperty("error")){N==="base"?y.errortextbase(y.txtLayerErr):y.errortextlayer(y.txtLayerErr)}else{if(M===2||M===4||M===5){o.readInfo(L,y,K,M,N)}else{if(M===3){if(typeof k(L.getElementsByTagName("WMS_Capabilities")).attr("xmlns:esri_wms")!=="undefined"){m.readInfoWMS(L,y,K,M,N)}else{i.readInfo(L,y,K,M,N)}}else{if(M===1){m.readInfoWMTS(L,y,K,M)}}}if(N==="base"){P=y.availServBase()}else{P=y.availServLayer()}if(!j.checkDuplicate(P,K)){P.push(K);O=P.join(";");if(M===1){localStorage.setItem("servnameWMTS",O)}else{if(M===2){localStorage.setItem("servnameCacheREST",O)}else{if(M===3){localStorage.setItem("servnameWMS",O)}else{if(M===4){localStorage.setItem("servnameDynamicREST",O)}else{if(M===5){localStorage.setItem("servnameDynamicREST",O)}}}}}}y.isLayerDialogOpen(true);y.hiddenLayer("")}};y.updateOrder=function(){var N,M=k("#layersoptions").find(".layeroption-title"),K=M.length,L=[];while(K--){N=k(M[K]).attr("id");L.push(j.getObject(y.layers(),"id",N))}y.layers(L.reverse())};y.updateType=function(K){(K.cluster.enable())?K.type=5:K.type=6;return true};y.write=function(){var K;K='"mapframe": {"size": {"height": '+y.mapHeightValue()+',"width": '+y.mapWidthValue()+'},"map": {"urlgeomserv": "'+y.urlGeomServer()+'","urlproxy": "'+y.urlProxy()+'","urldownload": "'+y.urlDownload()+'","sr": {"wkid": '+y.selectMapSR().id+'},"extentmax": {"xmin": '+y.maxExtentMinX()+',"ymin": '+y.maxExtentMinY()+',"xmax": '+y.maxExtentMaxX()+',"ymax": '+y.maxExtentMaxY()+'},"extentinit": {"xmin": '+y.initExtentMinX()+',"ymin": '+y.initExtentMinY()+',"xmax": '+y.initExtentMaxX()+',"ymax": '+y.initExtentMaxY()+'},"lods": {"enable": '+y.isLods()+',"values": '+JSON.stringify(l.toJS(y.lods())).replace(/isChecked/g,"check")+'},"link": '+y.isLink()+',"bases": '+JSON.stringify(l.toJS(y.bases()))+',"layers": '+JSON.stringify(l.toJS(y.layers()))+"}}";return K};y.init()};b=new q(p,r);l.applyBindings(b,p);return b};h=function(p,q){p.cleanNode(k("#map_addlayer")[0]);p.cleanNode(k("#map_extent")[0]);p.cleanNode(q);k("#layers").empty()};return{initialize:d,clean:h}})}).call(this);