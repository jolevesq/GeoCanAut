/*
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * WMTS and WMS ESRI format related functions
 */
(function () {
	'use strict';
	define(['jquery-private',
			'knockout',
			'gcaut-func'
	], function($aut, ko, gcautFunc) {
		var readInfoWMS,
			readInfoWMTS;

		readInfoWMS = function(sender, _self, url, type, category) {
			var $srInfo, sr, wkid, minx, miny, maxx, maxy,
				layer, item, name, title,
				layers = [],
				sendLayers = sender.getElementsByTagName('Layer'),
				fullName = sendLayers[0].getElementsByTagName('Name')[0].innerHTML,
				len = sendLayers.length - 1,
				index = 0;

			while (index <= len) {
				item = sendLayers[index + 1];

				// check if it is a group. just add individual layers
				if (typeof $aut(item).attr('queryable') !== 'undefined') {

					layer = {};
					name = item.getElementsByTagName('Name')[0].innerHTML;
					title = item.getElementsByTagName('Title')[0].innerHTML;
					layer.name = name;
					layer.fullname = fullName;
					layer.url = url;
					layer.id = title;
					layer.scale = { min: ko.observable(-1).extend({ numeric: { precision: 0 } }),
									max: ko.observable(-1).extend({ numeric: { precision: 0 } }) };
					layer.isChecked = ko.observable(false);
					layer.isUse = ko.observable(false);
					layer.cluster = { enable: ko.observable(false),
									distance: ko.observable(50).extend({ numeric: { precision: 0 } }),
									label: ko.observable(false),
									symbol: ko.observable(false),
									maxsizeprop: ko.observable(50).extend({ numeric: { precision: 0 } }),
									maxdataprop: ko.observable(1000).extend({ numeric: { precision: 0 } }) };
					layer.type = type;
					layer.servLayers = [];

					// knockout checkbox and label binding
					layer.isChecked = ko.observable(false);
					layer.isUse = ko.observable(false);

					layers.push(layer);
				}

				index++;
			}

			// update knockout array
			_self.servLayers([]);
			_self.servLayers(layers);

			// update base layer info
			if (category === 'base') {
				$srInfo = $aut(sender.getElementsByTagName('BoundingBox')[1]);
				sr = $srInfo.attr('CRS');
				wkid = parseInt(sr.substring(sr.indexOf(':') + 1, sr.length), 10);
				_self.selectMapSR(
					_self.srType[gcautFunc.getSrTypeIndex(_self.srType, wkid)]);

				// the values are not at the right place, we need to switch
				minx = parseInt($srInfo.attr('miny'), 10);
				miny = parseInt($srInfo.attr('minx'), 10);
				maxx = parseInt($srInfo.attr('maxy'), 10);
				maxy = parseInt($srInfo.attr('maxx'), 10);
				_self.maxExtentMinX(minx);
				_self.maxExtentMinY(miny);
				_self.maxExtentMaxX(maxx);
				_self.maxExtentMaxY(maxy);
				_self.initExtentMinX(minx);
				_self.initExtentMinY(miny);
				_self.initExtentMaxX(maxx);
				_self.initExtentMaxY(maxy);

				// set empty lods
				_self.lods([]);
			}
		};

		readInfoWMTS = function(sender, _self, url, type) {
			var $srInfo, sr, wkid, minx, miny, maxx, maxy,
				lods, lenlods, ll, ur,
				layer,
				layers = [],
				sendLayers = sender.getElementsByTagName('Layer'),
				fullName = sender.getElementsByTagName('Title')[0].innerHTML;

			layer = {};
			layer.name = fullName;
			layer.fullname = fullName;
			layer.url = url;
			layer.id = fullName;
			layer.scale = { min: ko.observable(-1).extend({ numeric: { precision: 0 } }),
							max: ko.observable(-1).extend({ numeric: { precision: 0 } }) };
			layer.isChecked = ko.observable(false);
			layer.isUse = ko.observable(false);
			layer.type = type;
			layer.servLayers = [];

			// knockout checkbox and label binding
			layer.isChecked = ko.observable(false);
			layer.isUse = ko.observable(false);

			layers.push(layer);

			// update knockout array
			_self.servLayers([]);
			_self.servLayers(layers);

			// update base layer info
			$srInfo = $aut(sender.getElementsByTagName('BoundingBox')[0]);
			sr = $srInfo.attr('crs');
			wkid = parseInt(sr.substring(sr.indexOf('EPSG::') + 1, sr.length), 10);
			_self.selectMapSR(
			_self.srType[gcautFunc.getSrTypeIndex(_self.srType, wkid)]);

			// get value from bounding box
			minx = parseInt($srInfo.attr('miny'), 10);
			miny = parseInt($srInfo.attr('minx'), 10);
			maxx = parseInt($srInfo.attr('maxy'), 10);
			maxy = parseInt($srInfo.attr('maxx'), 10);
			_self.maxExtentMinX(minx);
			_self.maxExtentMinY(miny);
			_self.maxExtentMaxX(maxx);
			_self.maxExtentMaxY(maxy);
			_self.initExtentMinX(minx);
			_self.initExtentMinY(miny);
			_self.initExtentMaxX(maxx);
			_self.initExtentMaxY(maxy);

			// set empty lods
			_self.lods([]);
		};

		return {
			readInfoWMS: readInfoWMS,
			readInfoWMTS: readInfoWMTS
		};
	});
}());
