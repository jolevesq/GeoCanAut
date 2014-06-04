/*
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * GIS map functions
 */
(function () {
	'use strict';
	define(['jquery-private',
			'gcaut-func',
			'esri/map',
			'esri/layers/FeatureLayer',
			'esri/layers/ArcGISTiledMapServiceLayer',
			'esri/layers/ArcGISDynamicMapServiceLayer',
			'esri/layers/WMSLayer',
			'esri/geometry/Extent'
			], function($aut, func, esriMap, esriFL, esriRestC, esriRestD, esriWMS, esriExt) {

		var createMap,
			createLayer;

		createMap = function(id, typeLayer, layer, extent, wkid, size, holder) {
			var map,
				options,
				width = size.width,
				height = size.height,
				mapExtent = new esriExt({ 'xmin': extent[0], 'ymin': extent[1],
										'xmax': extent[2], 'ymax': extent[3],
										'spatialReference': { 'wkid': wkid } });

			options = {
				extent: mapExtent,
				spatialReference: { 'wkid': wkid },
				logo: false,
				showAttribution: false,
				wrapAround180: true,
				smartNavigation: false
			};

			// create map
			$aut('#map_extent').prepend('<div id="' + id + '" style="border-style: solid;"></div>');
			$aut('#' + id).width(width).height(height);
			map = new esriMap(id, options);
			map.addLayer(createLayer(typeLayer, layer, map.extent));

			// set map size here because API will not take it from the html div
			$aut('#' + id + 'root').width(width).height(height);
			map.width = width;
			map.height = height;

			map.on('extent-change', func.debounce(function(evt) {
				var extent = evt.extent;

				holder[0](extent.xmin);
				holder[1](extent.ymin);
				holder[2](extent.xmax);
				holder[3](extent.ymax);

			}, 1000, false));

			// make sure value in holder are initialize
			map.setExtent(map.extent);
		};

		createLayer = function(type, base, extent) {
			var layer, options, resourceInfo,
				url = base.url;

			if (type === 2) {
				layer = new esriRestC(url);
			} else if (type === 3) {
				options = base.options;
				resourceInfo = {
					extent: extent,
					layerInfos: options.layerinfos
				};

				layer = new esriWMS(url, {
					resourceInfo: resourceInfo,
					visibleLayers: options.visiblelayers
				});
			} else if (type === 4) {
				layer = new esriRestD(url);
			} else if (type === 5) {
				layer = new esriFL(url, {
                    mode: esriFL.MODE_ONDEMAND,
                    outFields: ['*']
				});
			}

			return layer;
		};

		return {
			createMap: createMap
		};
	});
}());
