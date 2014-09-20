$(function(){
    
    var fullurl = "http://www.reddit.com/r/news/new.json"//"http://www.reddit.com/r/news/hot.json";
    
    $.getJSON(fullurl, function(json){
      var listing = json.data.children;
	  var max = 5;
      var html = '';
      $("#spinner").fadeOut();
      for(var i=0, l=max; i<l; i++) {
        var obj = listing[i].data;

        var votes     = obj.score;
        var title     = obj.title;
        var subtime   = obj.created_utc;
        var exturl    = obj.url;
        
        var timeago = timeSince(subtime);

        html += '<div class="linkdetails"><a href="'+exturl+'" class="blubtn" target="_blank">'+title+'</a>';
        html += '<p class="subrdt">'+timeago+' with '+votes+' votes</p>';

      } 
      
      htmlOutput(html);
	  resizePanels();  //defined in search.js

    }); // end getJSON()
  
  function htmlOutput(html) {
    $('#content').html(html);
  }
  
  /**
   * Return time since link was posted
   * http://stackoverflow.com/a/3177838/477958
  **/
  function timeSince(date) {
    var seconds = Math.floor(((new Date().getTime()/1000) - date))

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      if(interval == 1) return interval + " year ago";
      else 
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      if(interval == 1) return interval + " month ago";
      else
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      if(interval == 1) return interval + " day ago";
      else
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      if(interval == 1) return interval + " hour ago";
      else
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      if(interval == 1) return interval + " minute ago";
      else
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
});