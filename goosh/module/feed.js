
goosh.module.feeds = function(){
  this.name = "feeds";
  this.aliases = new Array("feeds","feed","f");
  this.mode = true;
  this.start = 0;
  this.args ="";

  this.parameters = "[keywords]";
  this.help = "google feed search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>feed foo bar</i>  - searches for &quot;foo bar&quot; feeds<br/>"+
  		  "<i>read 2</i>  - reads second result<br/>";

  this.query = function(cmdstr,query) {

    //output.innerHTML += "COMMAND:"+cmdstr+"/"+query+"/"+this.name+".<br/>"; // debug


    goosh.ajax.query("//ajax.googleapis.com/ajax/services/feed/find?v=1.0&hl="+goosh.config.lang+"&callback=goosh.modobj."+this.name+".render&q="+encodeURIComponent(query)+'&num=100&key'+goosh.config.apikey+"&");
  }



  this.call = function(args){
   if(args.length > 0)
     this.start = 0;
     this.results = new Array();
     this.args = args.join(" ");
     this.query(this.name,args.join(" "));
  }


  this.render = function(context, results, status, details, unused){
    if(goosh.ajax.iscontext(context)){

      if(results && results.entries && results.entries.length>0){
	results.results = new Array();

	for(i=0;i<results.entries.length;i++)
	  if(results.entries[i])
	    results.results[i] = results.entries[i];

	for(i=0;i<results.results.length;i++)
	  if(results.results[i])
	  {
	    var r = results.results[i];
	    results.results[i].unescapedUrl = r.url;
	    results.results[i].content = r.contentSnippet;
	  }

	this.results = results.results;
	this.hasmore = true;

	this.renderResult(context, results, status, details, unused);
      }
      else {
	goosh.gui.error("No feeds found for &quot;"+this.args+"&quot;");
      }

      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();

    }
  }

  this.more = function(){

    if(this.args){
      this.start += parseInt(goosh.config.numres);

      if(this.results.length <= this.start+ parseInt(goosh.config.numres)){
	this.hasmore = false;
	moreobj = false;

      }

      this.renderResult();

    }


  }
}
goosh.modules.register("feeds","web");


