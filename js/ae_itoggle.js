/**
 * Implementation of Drupal behavior.
 */
(function($) {
Drupal.behaviors.ae_itoggle = {
  attach: function(context) {

  // do not load for IE6, IE7, IE8
  var htmlElem = $('html');
  var load = !(htmlElem.hasClass('ie6') || htmlElem.hasClass('ie7') || htmlElem.hasClass('ie8'));
  var itoggle_id = 1;

  if (load) {
    $('input[type=checkbox]', context)
     .not('.views-field-views-bulk-operations input[type=checkbox], .bulkop-select-wrapper input[type=checkbox], form#user-admin-account input[type=checkbox], .webform-component-checkboxes input[type=checkbox]')
     .once('ae_itoggle', function() {
      $(this).each(function() {
        var checkbox = $(this);
        var id       = checkbox.attr('id');
        if (!id) {
          id = 'itoggle-' + itoggle_id++;
          checkbox.attr('id', id);
        }
        $('label', checkbox.parent()).addClass('ilabel');
        var label = $('<label class="itoggle" for="'+id+'"><span></span></label>').insertBefore(checkbox);
        label.css('display', checkbox.get(0).style.display);

        //label.addClass('iT_checkbox');
        if (checkbox.prop('checked')) {
          label.addClass('iTon');
        } else {
          label.addClass('iToff');
        }
        if (checkbox.prop('disabled')) {
          label.addClass('disabled-itoggle');
        }
      });
    });

    $('input[type=checkbox]', context).change(function(e, param) {
      var checkbox = $(this);
      var label    = checkbox.prev();
      if (checkbox.prop('disabled')) {
        return false;
      }
      if (!checkbox.prop('checked')) {
        label.stop().animate({'background-position-x': '100%'}, 300, 'easeOutExpo', function(){
          label.removeClass('iTon').addClass('iToff');
        });
      } else {
        label.stop().animate({'background-position-x': '0%'}, 300, 'easeOutExpo', function(){
          label.removeClass('iToff').addClass('iTon');
        });
      }
    }).bind('displayChange', function(event, param) {
      $(this).prev().css('display', param);
    });

    // on every change of an iT_checkbox, that was generated by clicking on the checkbox
    // and NOT on the related itoggle call toggleTheIToggle
    // if param is set to 'itoggle' we know, the event was fired by the itoggle
  }


  } // attach
};
})(jQuery);
