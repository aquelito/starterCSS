/* ========================================================================
 * Bootstrap: Shopping.js v3.2.0
 * http://getbootstrap.com/javascript/#Shopping
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


  shoppingCart: function() {

    // Set rates + misc
    var taxRate = 0.20;
    var shippingCost = 20.00;
    var shippingRate = 400.00;
    var fadeTime = 300;

    // Assign actions
    $('.shopCart__qtyQuantity').change(function() {
      updateQuantity(this);
    });

    $('.shopCart__remove').click(function() {
      removeItem(this);
    });

    // Recalculate cart
    function recalculateCart() {

      var subtotal = 0;

      // Sum up row totals
      $('.shopCart__tableItem').each(function() {
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
      productRow.find('.shopCart__cost .price').each(function() {
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



+function ($) {
  'use strict';

  // SHOPPING PUBLIC CLASS DEFINITION
  // ================================

  var Shopping = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Shopping.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Shopping.VERSION  = '3.2.0'

  Shopping.DEFAULTS = {
    toggle: true
  }

  Shopping.prototype.dimension = function () {

  }

  Shopping.prototype.show = function () {

  }

  Shopping.prototype.toggle = function () {

  }


  // SHOPPING PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.Shopping')
      var options = $.extend({}, Shopping.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.Shopping', (data = new Shopping(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.Shopping

  $.fn.shopping             = Plugin
  $.fn.shopping.Constructor = Shopping


  // SHOPPING NO CONFLICT
  // ====================

  $.fn.shopping.noConflict = function () {
    $.fn.shopping = old
    return this
  }

  // SHOPPING DATA-API
  // =================

  $(document).on('click.bs.shopping.data-api', '[data-toggle="Shopping"]', function (e) {

    Plugin.call($target, option)
  })

}(jQuery);

