/*
 * jquery.clockize - https://github.com/yukku0423/jquery-clockize
 * jQuery Plugin. tested on 1.8.0
 *
 * Copyright 2012 (c) yukku0423 (yukku0423@gmail.com)
 * Licensed Under the MIT.
 *
 * $Date: 2012-09-01
 */
$.fn.extend({
  clockize: function(options){
    var Helper = {
      zeroPadding: function(num){
        if(0 <= num && num < 10 ){ return '0'+num }
        return num
      }
    }

    var options = $.extend({
      delimiter: ':',
      blink:     true,
      seconds:   true,
      attach_class: true,
      monospace: true
    }, options)

    var d = new Date(),
        $this = $(this),
          $d1 = $('<span/>'),
          $d2 = $('<span/>'),
           $h = $('<span/>'),
           $m = $('<span/>'),
           $s = $('<span/>')
       
    if(options.monospace == true){
      $this.css('font-family', 'monospace')
    }

    if(options.attach_class == true){
      $d1.addClass('clockize_delimiter1')
      $d2.addClass('clockize_delimiter2')
       $h.addClass('clockize_hours')
       $m.addClass('clockize_minutes')
       $s.addClass('clockize_seconds')
    }

    $this.append($h)
         .append($d1)
         .append($m)
    if(options.seconds == true){
      $this.append($d2)
           .append($s)
    }

    var d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        cache_sec = s

    var tick = function(){
      s = cache_sec
      if(cache_sec == 60){
        d = new Date()
        h = d.getHours()
        m = d.getMinutes()
        s = cache_sec = d.getSeconds()
      }
      cache_sec += 1

      if( options.blink == true && s%2 == 0 ) {
        $d1.html(' ')
        $d2.html(' ')
      }else{
        $d1.html(options.delimiter)
        $d2.html(options.delimiter)
      }

      $h.html(Helper.zeroPadding(h))
      $m.html(Helper.zeroPadding(m))
      $s.html(Helper.zeroPadding(s))
    }

    tick()
    setInterval(tick, 1000)
  }
})
