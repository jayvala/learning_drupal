(function ($) {
  let time = null;
  var update = 1;
  Drupal.behaviors.locationAssignment = {
    attach: function(context, settings) {
      time = settings.time;
      $('div.clock').html(time);

      if (update === 1) {
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
      }

    }
  }
})(jQuery);;
