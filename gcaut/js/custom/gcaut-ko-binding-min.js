(function(){define(["jquery-private","knockout","jqueryui"],function(b,a){a.bindingHandlers.tooltip={init:function(f,g){var d={},e=a.utils.unwrapObservable(g()),c=b(f);a.utils.extend(d,a.bindingHandlers.tooltip.options);a.utils.extend(d,e);c.attr("title",d.content);c.tooltip(d);a.utils.domNodeDisposal.addDisposeCallback(f,function(){c.tooltip("destroy")})},options:{show:{effect:"slideDown",delay:2000},hide:{effect:"slideUp",delay:100},position:{my:"right+30 top+5"},tooltipClass:"gcviz-tooltip",trigger:"hover, focus"}};a.extenders.numeric=function(e,d){var c=a.computed({read:e,write:function(i){var h=e(),g=Math.pow(10,d),j=isNaN(i)?0:parseFloat(+i),f=Math.round(j*g)/g;if(f!==h){e(f)}else{if(i!==h){e.notifySubscribers(f)}}}}).extend({notify:"always"});c(e());return c};a.bindingHandlers.uiAutocomplete={init:function(e,f){var d=f()||{},c=b(e);c.autocomplete(d);a.utils.domNodeDisposal.addDisposeCallback(e,function(){c.autocomplete("destroy")})},update:function(d,e){var c=e()||{};b(d).autocomplete("option","source",c.source)}};a.bindingHandlers.uiSortable={init:function(f,g){var e=g()||{},d=b("#"+e.refresh),h=e.update,c=b(f);c.sortable(e);c.disableSelection();if(typeof d!=="undefined"){d.focus(function(){c.sortable("refresh")})}if(typeof h!=="undefined"){c.on("sortupdate",h)}a.utils.domNodeDisposal.addDisposeCallback(f,function(){c.sortable("destroy")})},update:function(d,e){var c=e()||{};b(d).sortable("destroy").sortable(c)}};a.bindingHandlers.uiAccordion={init:function(f,g){var e=g()||{},d=b("#"+e.refresh),c=b(f);c.accordion(e);if(typeof d!=="undefined"){d.focus(function(){c.accordion("refresh")})}a.utils.domNodeDisposal.addDisposeCallback(f,function(){c.accordion("destroy")})},update:function(d,e){var c=e()||{};b(d).accordion("destroy").accordion(c)}};a.bindingHandlers.uiDialog={init:function(g,h,i,e){var f=a.utils.unwrapObservable(h()),d={},c=b(g);a.utils.extend(d,a.bindingHandlers.uiDialog.options);a.utils.extend(d,f);if(typeof d.ok!=="undefined"){d.buttons[0].click=d.ok}if(typeof d.cancel!=="undefined"){d.buttons[1].click=d.cancel}c.dialog(d);e[f.openDialog].subscribe(j);function j(k){c.dialog(k?"open":"close")}a.utils.domNodeDisposal.addDisposeCallback(g,function(){c.dialog("destroy")})},options:{autoOpen:false,modal:true,resizable:false,draggable:false,show:"fade",hide:"fade",closeOnEscape:true,close:function(){},buttons:[{text:"Ok",click:function(){b(this).dialog("close")}},{text:"Cancel",click:function(){b(this).dialog("close")}}]},};a.bindingHandlers.imgLabel={init:function(e,f){var g,c,d=f()||{};b(e).text(d.text);if(d.img){b(e).prepend('<img class="gcaut-img-lbl" src="'+d.img+'"></img>')}else{if(d.imgs){g=d.imgs.split(";");c=g.length;while(c--){b(e).prepend('<img class="gcaut-img-lbl" src="'+g[c]+'"></img>')}}}}};a.bindingHandlers.passControl={init:function(e,f,g,d){var c=f()||{};d[c.elem].subscribe(h);function h(i){d[c.funct](i)}}}})}).call(this);