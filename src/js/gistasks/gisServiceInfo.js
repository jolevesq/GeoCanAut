/*
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * GIS service functions
 */
(function () {
	'use strict';
	define(['jquery-private',
			'gcaut-i18n',
			'esri/request'
			], function($aut, i18n, esriRequest) {

		var getResourceInfo,
			getEsriRendererInfo,
			getEsriServRendererInfo;

		getResourceInfo = function(url, layerType, success, error) {
			//http://resources.esri.com/help/9.3/arcgisserver/apis/javascript/ve/help/Getting%20Started/DiscoverMapServices.html
			var options;

			if (layerType === 1 || layerType === 3) {
				options = { url: url + '?request=GetCapabilities',
							handleAs: 'xml'
					};

				//TODO this section is use to mimic response when work in localhost
				var xmlhttp = new XMLHttpRequest();
				if (url === 'http://wms.ess-ws.nrcan.gc.ca/wms/toporama_fr') {
					xmlhttp.open('GET', 'wmsTest.xml', false);
				} else if (url === 'http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer') {
					xmlhttp.open('GET', 'wmsEsriTest.xml', false);
				} else if (url === 'http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3978/MapServer/WMTS') {
					xmlhttp.open('GET', 'wmtsEsriTest.xml', false);
				}
				xmlhttp.send();
				var xmlDoc = xmlhttp.responseXML;
				success(url, layerType, xmlDoc);

			} else if (layerType === 2 || layerType === 4 || layerType === 5) {
				options = { url: url,
							content: { f: 'json' },
							handleAs: 'json',
							callbackParamName: 'callback'
					};

				// TODO move it outside when wms is done testing
				options.load = function(response) {
					success(url, layerType, response);
				};
				options.error = error;
				esriRequest(options);
			}
		};

		getEsriRendererInfo = function(url, item) {
			var urlOut = url.substring(0, url.indexOf('MapServer')) + 'MapServer/layers',
				layer = url.substring(url.lastIndexOf('/') + 1, url.length);

			// if it is a basemap, layer will not be a number
			if (isNaN(layer)) {
				layer = 0;
			}

			esriRequest({
				url: urlOut,
				content: { f: 'json' },
				handleAs: 'json',
				callbackParamName: 'callback',
				load: function(response) {
					item.displaychild.symbol(JSON.stringify(response.layers[layer].drawingInfo.renderer));
				},
				error: function(err) {
					console.log('Not able to get renderer: ' + err);
				}
			});
		};

		getEsriServRendererInfo = function(items, url, id, success) {
			var urlOut = url.substring(0, url.indexOf('MapServer')) + 'MapServer/layers';

			esriRequest({
				url: urlOut,
				content: { f: 'json' },
				handleAs: 'json',
				callbackParamName: 'callback',
				load: function(response) {
					success(items, url, id, response.layers);
				},
				error: function(err) {
					console.log('Not able to get renderer: ' + err);
				}
			});
		};

		return {
			getResourceInfo: getResourceInfo,
			getEsriRendererInfo: getEsriRendererInfo,
			getEsriServRendererInfo: getEsriServRendererInfo
		};
	});
}());

