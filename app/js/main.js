
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
  shoppingCart: function() {

    // Set rates + misc
    var taxRate = 0.20;
    var shippingCost = 20.00;
    var shippingRate = 400.00;
    var fadeTime = 300;

    // Assign actions
    $('.shopCart__qtyQuantity').change( function() {
      updateQuantity(this);
    });

    $('.shopCart__remove').click( function() {
      removeItem(this);
    });

    // Recalculate cart
    function recalculateCart() {

      var subtotal = 0;

      // Sum up row totals
      $('.shopCart__tableItem').each(function () {
        subtotal += parseFloat($(this).find('.shopCart__cost .price').text());
      });

      // Calculate totals
      var tax = subtotal * taxRate;
      var shipping = (subtotal >= shippingRate ? shippingCost : 0);
      var total = subtotal + tax + shipping;

      // Update totals display
      $('.total--value').fadeOut(fadeTime, function() {

        var totalProducts = $('.shopCart__tableItem').length;
        var totalItems = (totalProducts >= 2) ? totalProducts + '&nbsp;items' : totalProducts + '&nbsp;item';
        var totalShipping = (shipping === 0) ? 'Free' : '<span class="price">' + shipping.toFixed(2) + '</span><span class="currency">€</span>';

        $('#total-items').html(totalItems);

        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(totalShipping);
        $('#cart-total').html(total.toFixed(2));
        if(total === 0) {
          $('.btn--checkout').fadeOut(fadeTime);
        }
        else {
          $('.btn--checkout').fadeIn(fadeTime);
        }
        $('.total--value').fadeIn(fadeTime);
      });
    }
    // Update quantity
    function updateQuantity(quantityInput) {
      // Calculate line price
      var productRow = $(quantityInput).parent().parent().parent();
      var price = parseFloat(productRow.find('.shopCart__price .price').text());
      var quantity = $(quantityInput).val();
      var linePrice = price * quantity;

      // Update line price display and recalc cart totals
      productRow.find('.shopCart__cost .price').each(function () {
        $(this).fadeOut(fadeTime, function() {
          $(this).text(linePrice.toFixed(2));
          recalculateCart();
          $(this).fadeIn(fadeTime);
        });
      });
    }

    // Remove item from cart
    function removeItem(removeButton) {
      // Remove row from DOM and recalc cart total
      var productRow = $(removeButton).parent().parent();
      productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
      });
    }
  }
};

jQuery(function($){

  starter.swipe();
  starter.shoppingCart();

});
