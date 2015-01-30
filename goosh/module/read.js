
goosh.module.read = function(){
  this.name = "read";
  this.aliases = new Array("read","rss","r");
  this.mode = false;
  this.start = 0;

  this.parameters = "&lt;url>";
  this.help = "read feed of url";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>read reddit.com</i>  - read reddit.com-feed<br/>";

  this.query = function(cmdstr,query) {

//    output.innerHTML += "COMMAND:"+cmdstr+"/"+query+"/"+this.name+".<br/>"; // debug

    goosh.ajax.query("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&hl="+goosh.config.lang+"&callback=goosh.modobj."+this.name+".render&num=100&scoring=h&q="+encodeURIComponent(query)+"&key="+goosh.config.apikey);
  }

  this.lookup = function(cmdstr,query) {

  //  output.innerHTML += "lookup:"+cmdstr+"/"+query+"/"+this.name+".<br/>"; // debug


    goosh.ajax.query("//ajax.googleapis.com/ajax/services/feed/lookup?v=1.0&hl="+goosh.config.lang+"&callback=goosh.modobj."+this.name+".lookupdone&q="+encodeURIComponent(query)+"&key="+goosh.config.apikey);
  }


  this.lookupdone = function(context, results, status, details, unused){
   if(results){
     if(results.url){
       if(goosh.ajax.iscontext(context))
       	this.query(this.name,results.url);
       }
     }
     else {
      goosh.gui.error("feed &quot;"+this.args+"&quot; not found.<br/> Try the &quot;feed&quot;-command to find feeds.");
     }
  }

  this.call = function(args){
   if(args.length > 0){
     this.start =0;
     this.results = new Array();
     this.args = args.join(" ");
     this.lookup(this.name,args.join(" "));
     
     }
  }



  this.render = function(context, results, status, details, unused){
    if(goosh.ajax.iscontext(context)){

      if(results){
	results.results = new Array();

	for(i=0;i<results.feed.entries.length;i++)
	  if(results.feed.entries[i])
	    results.results[i] = results.feed.entries[i];

	for(i=0;i<results.results.length;i++)
	  if(results.results[i])
	  {
	    var r = results.results[i];
	    results.results[i].unescapedUrl = r.link;
	    results.results[i].content = r.contentSnippet;
	  }

	this.results = results.results; 
	this.hasmore = true;

	this.renderResult(context, results, status, details, unused);


	goosh.gui.showinput();
	goosh.gui.focusinput();
	goosh.gui.scroll();

      }
      else{
	goosh.gui.error("Error: feed &quot;"+this.args+"&quot; not found.<br/> Try the &quot;feed&quot;-command to find feeds.");
      }
    }
  }

  this.more = function(){

    if(this.args){
      this.start += parseInt(goosh.config.numres);

      if(this.results.length <= this.start + parseInt(goosh.config.numres)){
	this.hasmore = false;
	moreobj = false;

      }



      this.renderResult();

    }


  }

}
goosh.modules.register("read","web");


