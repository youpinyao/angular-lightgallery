require('./dist/css/lightgallery.css');
const $ = require('jquery');
const LightGallery = require('./dist/js/lightgallery');
require('./lib/js/lg-fullscreen');
require('./lib/js/lg-zoom');
require('./lib/js/lg-pager');
require('./lib/js/lg-autoplay');
require('./lib/js/lg-share');

angular.module('ngLightgallery', [])
  .directive('lightGallery', lightGallery)
  .factory('$lightGallery', lightGalleryService);

lightGallery.$inject = ['$lightGallery'];

function lightGallery($lightGallery) {
  return {
    restrict: 'EA',
    link: link,
    scope: {
      lightGalleryConfig: '@'
    }
  };

  function link(scope, element, attrs, ctrl) {
    $lightGallery.LightGallery(element[0], attrs.lightGalleryConfig || $lightGallery.defaultConfig);
  }
}

lightGalleryService.$inject = [];

function lightGalleryService() {
  return {
    preview: preview,
    LightGallery: LightGallery,
    trigger: trigger,
    defaultConfig: {
      download: false,
      mousewheel: true,
      share: false,
    }
  };

  function trigger(el, event) {
    if (document.createEvent) {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent(event, true, false);
      el.dispatchEvent(evObj);
    } else if (document.createEventObject) {
      el.fireEvent('on' + event);
    }
  }

  function preview(images) {
    if (!images) {
      console.warn('请传入图片链接');
      return;
    }
    if (typeof images === 'string') {
      images = [images];
    }

    let div = $('<div></div>');
    div.css({
      width: 0,
      height: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    });

    $('body').append(div);

    images.forEach(function (d) {
      div.append('<div data-src="' + d + '"></div>');
    });

    this.LightGallery(div[0], this.defaultConfig);
    this.trigger(div.find('div').eq(0).get(0), 'click');

    div.bind('onBeforeClose', e => {
      div.remove();
    });
  }
}
