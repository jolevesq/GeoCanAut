/*
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * WMTS and WMS format related functions
 */
(function () {
	'use strict';
	define(['jquery-private',
			'knockout',
			'gcaut-func'
	], function($aut, ko, gcautFunc) {
		var readInfo;

		readInfo = function(sender, _self, url, type, category) {
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
				$srInfo = $aut(sender.getElementsByTagName('BoundingBox'));
				sr = $srInfo.attr('SRS');
				wkid = parseInt(sr.substring(sr.indexOf(':') + 1, sr.length), 10);
				_self.selectMapSR(
				_self.srType[gcautFunc.getSrTypeIndex(_self.srType, wkid)]);

				minx = parseInt($srInfo.attr('minx'), 10);
				miny = parseInt($srInfo.attr('miny'), 10);
				maxx = parseInt($srInfo.attr('maxx'), 10);
				maxy = parseInt($srInfo.attr('maxy'), 10);
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

		return {
			readInfo: readInfo
		};
	});
}());
