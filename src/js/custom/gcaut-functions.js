/*
 *
 * GeoCanAut tools / Outil GéoCanAut
 * geocanaut.github.io/geocanaut/License-eng.txt / geocanaut.github.io/geocanaut/Licence-fra.txt
 *
 * Globals functions
 */
(function () {
    'use strict';
    define([], function() {

        var debounce,
            subscribeTo,
            getListCB,
            getListCBCust,
            getSrType,
            getSrTypeIndex,
            getListValue,
            checkFormatURL,
            getObject,
            getElemValueVM,
            setElemValueVM,
            setVM,
            vmObject,
            getUUID,
            checkDuplicate,
            setUnique,
            expandAll;

        debounce = function(func, threshold, execAsap) {

            var timeout;

            return function debounced () {
                var obj = this,
                    args = arguments;

                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                }
                else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

        subscribeTo = function(vm, value, funct) {
            vmObject[vm][value].subscribe(funct);
        };

        getListCB = function(val) {
            var i = 1,
                typeArr = [],
                array = val.split(';'),
                len = array.length;

            array = array.reverse();
            while (len--) {
                typeArr.push({ id: i, val: array[len] });
                i++;
            }

            return typeArr;
        };

        getListCBCust = function(comp, val) {
            var id = comp.reverse(),
                typeArr = [],
                array = val.split(';'),
                len = array.length;

            array = array.reverse();
            while (len--) {
                typeArr.push({ id: id[len], val: array[len] });
            }

            return typeArr;
        };

        getSrType = function(val) {
            var items, item,
                typeArr = [],
                array = val.split(';'),
                len = array.length;

            array = array.reverse();
            while (len--) {
                item = array[len];
                items = item.split(' - ');
                typeArr.push({ id: parseInt(items[0], 10), val: item });
            }

            return typeArr;
        };

        getSrTypeIndex = function(array, val) {
            var len = array.length,
                rev = array.reverse();

            while (len--) {
                if (rev[len].id === val) {
                    return len;
                }
            }
        };

        getListValue = function(array, id) {
            var item,
                len = array.length;

            while (len--) {
                item = array[len];
                if (item.id === id) {
                    return item.val;
                }
            }
        };

        checkFormatURL = function(url, type) {
            var regObj,
                flag = false,
                regexp = '(^(http|https):\\/\\/)';

            // create regex from type
            if (type === 2 || type === 4 || type === 5) {
                // esri cache or dynamic
                regexp += '*(/rest/services/)*\/(MapServer)';
            }

            regObj = new RegExp(regexp);
            if (regObj.test(url)) {
                flag = true;
            }

            return flag;
        };

        getObject = function(array, field, text) {
            var item,
                value = null,
                len = array.length;

            while (len--) {
                item = array[len];
                if (item[field] === text) {
                    value = item;
                }
            }

            return value;
        };

        getElemValueVM = function(name, element) {
            return vmObject[name][element]();
        };

        setElemValueVM = function(name, element, val) {
            return vmObject[name][element](val);
        };

        setVM = function(vm) {
            vmObject = vm;
        };

        // http://slavik.meltser.info/?p=142
        getUUID = function() {
            function _p8(s) {
                var p = (Math.random().toString(16) + '000000000').substr(2,8);
                return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        };

        checkDuplicate = function(array, value) {
            var len = array.length,
                flag = false;

            while (len--) {
                if (array[len] === value) {
                    flag = true;
                }
            }

            return flag;
        };

        setUnique = function(list) {
            var result = [];

            $.each(list, function(i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });

            return result;
        };

        expandAll = function(items, action) {
            var content = items.find('.ui-accordion-content'),
                head = items.find('.ui-accordion-header'),
                icon = head.find('.ui-accordion-header-icon');

            if (action === 'show') {
                content.show();
                icon.addClass('ui-icon-triangle-1-s');
                icon.removeClass('ui-icon-triangle-1-e');
                content.addClass('ui-accordion-content-active');
                head.addClass('ui-accordion-header-active ui-state-active ui-corner-top');
                head.removeClass('ui-corner-all');
            } else {
                content.hide();
                icon.removeClass('ui-icon-triangle-1-s');
                icon.addClass('ui-icon-triangle-1-e');
                content.removeClass('ui-accordion-content-active');
                head.removeClass('ui-accordion-header-active ui-state-active ui-corner-top');
                head.addClass('ui-corner-all');
                items.accordion('option', 'active', false);
            }
        };

        return {
            debounce: debounce,
            subscribeTo: subscribeTo,
            getListCB: getListCB,
            getListCBCust: getListCBCust,
            getSrType: getSrType,
            getSrTypeIndex: getSrTypeIndex,
            getListValue: getListValue,
            checkFormatURL: checkFormatURL,
            getObject: getObject,
            getElemValueVM: getElemValueVM,
            setElemValueVM: setElemValueVM,
            setVM: setVM,
            getUUID: getUUID,
            checkDuplicate: checkDuplicate,
            setUnique: setUnique,
            expandAll: expandAll
        };
    });
}());
