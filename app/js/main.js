
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

// (function ($, Drupal, window, document, undefined) {

//   // To understand behaviors, see https://drupal.org/node/756722#behaviors
//   Drupal.behaviors.navigation = {
//     attach: function(context, settings) {
//       // initialise superfish
//       var navigation = $('.menu').superfish({
//         //popUpSelector: 'ul,.sf-mega', // within menu context
//         hoverClass: 'hover',
//         delay: 800,
//         cssArrows: false
//       });
//     }
//   };

// })(jQuery, Drupal, this, this.document);


var starter = {
  swipe: function() {
    var elem = document.getElementById('slider');

    if(elem) {
      // Slider Swipe JS API Scripting
      window.mySwipe = new Swipe(elem, {
        startSlide:      0,
        speed:           200,
        auto:            6000,
        continuous:      true,
        disableScroll:   false,
        stopPropagation: true,
        callback: function(pos) {

          var bullets = elem.children.item(1).children,
              i = bullets.length;

          while (i--) {
            bullets[i].className = ' ';
          }
          bullets[pos].className = 'on';
        },
        transitionEnd: function(index, elem) {}
      });
      var bullets = document.getElementById('pager').getElementsByTagName('li');

      if (window.jQuery) {
        (function($) {
          $.fn.Swipe = function(params) {
            return this.each(function() {
              $(this).data('Swipe', new Swipe($(this)[0], params));
            });
          };
          var $navLi = $('#pager li');
          $navLi.on('click', function() {
            window.mySwipe.slide(
            $(this).index() + 0, 200);
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
          });
          $('#pagerPrev').on('click', function() {
            mySwipe.prev();
            $navLi.removeClass('on');
            $navLi.eq(mySwipe.getPos() - 1).addClass('on');
          });
          $('#pagerNext').on('click', function() {
            mySwipe.next();
            $navLi.removeClass('on');
            $navLi.eq(mySwipe.getPos() - 1).addClass('on');
          });
        })(window.jQuery);
      }

    }

  },

};

jQuery(function($){

  starter.swipe();

});
