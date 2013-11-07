/*!
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * Version: @gcaut.version@
 *
 */
(function() {
	'use strict';
	// get the language
	var url = window.location.toString(),
		pathRegex = new RegExp(/\/[^\/]+$/),
        locationPath = window.location.pathname.replace(pathRegex, '') + '/',
		language = 'en-min';
	
	if ((url.search(/_f\.htm/) > -1) || (url.search(/-fra\./) > -1) || (url.search(/-fr\./) > -1) || (url.search(/lang=fra/) > -1) || (url.search(/lang=fr/) > -1)) {
		language = 'fr-min';
	} else if ((url.search(/_e\.htm/) > -1) || (url.search(/-eng\./) > -1) || (url.search(/-en\./) > -1) || (url.search(/lang=eng/) > -1) || (url.search(/lang=en/) > -1)) {
		language = 'en-min';
	} else {
		console.log('language not set, English by default');
	}

    if (navigator.userAgent.indexOf("MSIE") !== -1) {
        var pos6 = navigator.userAgent.indexOf("MSIE 6.0");
        var pos7 = navigator.userAgent.indexOf("MSIE 7.0");
        var pos8 = navigator.userAgent.indexOf("MSIE 8.0");
        var pos9 = navigator.userAgent.indexOf("MSIE 9.0");
        if ((pos6 !== -1) || (pos7 !== -1) || (pos8 !== -1) || (pos9 !== -1)) {
            if (language === 'en-min') {
                alert("You are using IE 9 or less. This application will not work. Use a real browser!!!");
            } else {
                alert("Vous utilisez IE 9 ou moins. Cet application ne fonctionera pas. Utilisez un vrai fureteur!!!");
            }
        }
    } else {
        // load the require libraries		
        require({
            async: true,
            parseOnLoad: false,
            aliases: [['text', 'dojo/text']],
            packages: [
                {
                    name: 'jquery',
                    location: locationPath + 'distgcv/dependencies',
                    main: 'jquery.min'
                }, {
                    name: 'knockout',
                    location: locationPath + 'distgcv/dependencies',
                    main: 'knockout.min'
                }, {
                    name: 'jqueryui',
                    location: locationPath + '/distgcv/dependencies',
                    main: 'jqueryui.min'
                }, {
                    name: 'gcaut',
                    location: locationPath + 'distgcv',
                    main: 'gcaut-min'
                }, {
                    name: 'gcaut-i18n',
                    location: locationPath + 'distgcv/js',
                    main: language
                // }, {
                    // name: 'gcaut-sectionDefineServicesV',
                    // location: locationPath + 'distgcv/js/views',
                    // main: 'sectionDefineServicesV-min'
                }, {
                    name: 'gcaut-sectionDefineServicesVM',
                    location: locationPath + 'distgcv/js/viewmodels',
                    main: 'sectionDefineServicesVM-min'
                }, {
                    name: 'gcaut-addServiceV',
                    location: locationPath + 'distgcv/js/views',
                    main: 'addserviceV-min'
                }, {
                    name: 'gcaut-addServiceVM',
                    location: locationPath + 'distgcv/js/viewmodels',
                    main: 'addServiceVM-min'
                }, {
                    name: 'gcaut-showMessageV',
                    location: locationPath + 'distgcv/js/views',
                    main: 'showMessageV-min'
                }, {
                    name: 'gcaut-showMessageVM',
                    location: locationPath + 'distgcv/js/viewmodels',
                    main: 'showMessageVM-min'
                }

                //, {
                //    name: 'gcaut-pickServiceFromListV',
                //    location: locationPath + 'distgcv/js/views',
                //    main: 'pickServiceFromListV-min'
                //}, {
                //    name: 'gcaut-pickServiceFromListVM',
                //    location: locationPath + 'distgcv/js/viewmodels',
                //    main: 'pickServiceFromListVM-min'
                //}
            ]
        });
    
        define.amd.jQuery = true;

        require(['jquery', 'gcaut'], function($, gcaut) {
            return $(document).ready(function() {
                return gcaut.initialize();
            });
        });
    }

}).call(this);