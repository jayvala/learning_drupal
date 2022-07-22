/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

(function ($, Drupal) {
  let time = null;

  Drupal.behaviors.locationAssignment = {
    attach: function(context, settings) {
      time = settings.time;
      $('div.clock').html('Time: ' + time);
      $(window).once('display_block').on('load', function () {
       


        // Recalculate the date every second.
        window.setInterval(function () {
          // Add 1 second (1000 milliseconds) to the time.
          var clockTimestamp = date.getTime();
          clockTimestamp = clockTimestamp + 1000;
          date = new Date(clockTimestamp);

          // Format the clock.
          //clock = formatDate(date, dateFormat, timezone, monthNames, weekdayNames);
          $('div.clock').html(time);
        }, 1000);
       
      });
      

    }
  }
})(jQuery, Drupal);;
