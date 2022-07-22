(function ($, Drupal) {
  Drupal.behaviors.locationDisplay = {
    attach: function(context, drupalSettings) {
      window.setInterval(function ()
      {
        var timeZone = drupalSettings.timezone; //configured timezone
        var dayOfMonthAppend = '';
        var currentTime = new Date ();
        var utcDate = currentTime.toUTCString();
        var tzDate = new Date(currentTime.toLocaleString('en-US', { timeZone: timeZone }));
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var currentDay = tzDate.getDay ( );
        var currentDate = tzDate.getDate ( );
        var currentMon = monthNames[tzDate.getMonth ( )];
        var currentYr = tzDate.getFullYear ( );
        var currentHours = tzDate.getHours ( );
        var currentMinutes = tzDate.getMinutes ( );
        var currentSeconds = tzDate.getSeconds ( );

        // Minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
        currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
        currentDate = ( currentDate < 10 ? "0" : "" ) + currentDate;

        // Appending suffix to date
        switch (currentDate) {
          case '1':
          case '21':
          case '31':
            dayOfMonthAppend = Drupal.t('st');
            break;
      
          case '2':
          case '22':
            dayOfMonthAppend = Drupal.t('nd');
            break;
      
          case '3':
          case '23':
            dayOfMonthAppend = Drupal.t('rd');
            break;
      
          default:
            dayOfMonthAppend = Drupal.t('th');
            break;
        }
     
        // Choose either "AM" or "PM"
        var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
   
        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        
        // Convert an hours component of "0" to "12"
        currentHours = ( currentHours == 0 ) ? 12 : currentHours;
   
        // Compose the string for display
        var currentTimeString = currentHours + ":" + currentMinutes +" " + timeOfDay;
        var currentDateString = currentDate + dayOfMonthAppend + " " + currentMon + " " + currentYr
        $('p.time').html("DateTime: " + '<strong>' + currentDateString + " - " + currentTimeString + '</strong>');
      }, 1000);
    }
  };
})(jQuery, Drupal);