google.load("feeds", "1");

function search_feed(){
  this.name = "feed";
  this.aliases = new Array("feed","rss","f");

  this.parameters = "&lt;url>";
  this.help = "read rss-feed";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>feed reddit.com</i>  - read reddit.com feed<br/>";

  this.lookupDone = function(result) {
  //output += "error";
  if (result.error || result.url == null) {
    output.innerHTML += "Error: No Feed Found.";
    input.style['display'] = 'block';
    focusinput();

    return;
  }
  var url = result.url; //.replace('format=atom', 'format=rss_200');
  //        output.innerHTML += url;
  var feed = new google.feeds.Feed(url);
  feed.load(function(result) {
      if (!result.error) {
      //output.innerHTML += "Feed found."
      result.results = result.feed.entries;
      searchers_feed.render("feed", result, 202, "", "");
      }
      else{
      output.innerHTML += "Error: Feed not found."
      input.style['display'] = 'block';
      focusinput();



      }

      });
}


  this.call = function(args){
   if(args.length > 0)
      input.style['display'] = 'none';
      google.feeds.lookupFeed(args.join(" "), searchers_feed.lookupDone);
  }

  this.render = function(context, results, status, details, unused){
     for(i=0;i<results.results.length;i++){
      var r = results.results[i];
      results.results[i].unescapedUrl = r.link;
    }

   //output.innerHTML += "CALL<br/>";
    this.renderResult(context, results, status, details, unused);
  }


}
register_searcher("feed","web");


