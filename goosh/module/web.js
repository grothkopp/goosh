// goosh web search module

goosh.module.web = function(){
  this.name = "web";
  this.aliases = new Array("web","search","s","w");
  this.mode = true;
  this.start = 0;
  this.args ="";

  this.help = "google web search";
  this.parameters = "[keywords]";
  this.helptext = "<span class='info'>examples:</span><br/>"+
    "<i>web foo bar</i>  - searches the web for &quot;foo bar&quot;<br/>";

  // perform the ajax query
  this.query = function(cmdstr,query) {
//    goosh.ajax.query("//ajax.googleapis.com/ajax/services/search/"+cmdstr+"?v=1.0&start="+this.qstart+"&hl="+goosh.config.lang+"&callback=goosh.modobj."+this.name+".render&q="+encodeURIComponent(query)+'&key='+goosh.config.apikey+"&rsz=large");

    var customSearchOptions = {};
customSearchOptions[google.search.Search.RESTRICT_EXTENDED_ARGS] = {
  'lr': 'lang_'+goosh.config.lang
//  'gl': 'date'
};
    cs = new google.search.CustomSearchControl('004431332481073456201:1y01bmxbens', customSearchOptions);
//    cs.enableAds('pub-6992080843066528');

    cs.setResultSetSize(goosh.config.results);
    google.search.Csedr.addOverride("mysite_");

    cs.setSearchStartingCallback(this, function(control, searcher, query)
    {
//      searcher.setQueryAddition('inurl:' + url);
      searcher.setNoHtmlGeneration();
      goosh.gui.hideinput();
      searching = true;
    });

    cs.setSearchCompleteCallback(this, function(control, searcher, query)
    {
      searching = false; 
      this.hasmore = true;
      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();
 
    });


    var drawOptions = new google.search.DrawOptions();
    drawOptions.enableSearchResultsOnly();

    var div = goosh.gui.out();

    cs.draw(div,drawOptions);

    window.i = ((goosh.config.numres-1) * this.start);
    cs.execute(query,this.start+1);

  }


  // render html output
  this.renderResult = function(context, results, status, details, unused){
    var out = "";
    var rnum = this.start;

    out += "<table border='0'>";

    for (i = this.start; i < (this.start + parseInt(goosh.config.numres)); i++) 
      if(this.results[i])
      {
	var r = this.results[i];

	rnum++;
	goosh.config.urls[rnum] = r.unescapedUrl;
	r.unescapedUrl = r.unescapedUrl.replace(/"/g,"&quot;");
	var url = r.unescapedUrl;

	if(goosh.config.reflink == "on"){
	  if(url.match(/\/\/(www.)?amazon.com\//)){
		  if(url.indexOf("?")>-1) url += "&";
		  else url += "?";
		  url += "tag=gc0a18-20";
		}	
	  if(url.match(/\/\/(www.)?amazon.(de|at|es|co.uk)\//)){
  		  if(url.indexOf("?")>-1) url += "&";
		  else url += "?";
	           url += "tag=gc06-21";
	}	

	goosh.config.urls[rnum] = url;
	}

	out += "<tr>";
	out += "<td valign='top' class='less'>&nbsp;&nbsp;"+rnum+")&nbsp;</td>";
	out += "<td>";
	out += '<a href="'+url+'" target="_blank">'+r.title+"</a>";
	out += "<br/>";
	out += r.content;
	out += "<br/>";
	out += '<a href="'+url+'" target="_blank" class="info" style="text-decoration:none;">'+r.unescapedUrl+"</a>";
	out += "<br/>";
	//if(r.thumb) out += '<a href="'+r.unescapedUrl+'" target="_blank">'+r.thumb+"</a><br/>";
	out += "&nbsp;</td></tr>";
      }

    out += "</table>";

    goosh.gui.out(out);
  }


  // perform search 
  this.call = function(args){
    if(args.length > 0){
      this.start = 0;
      this.qstart = 0;
      this.results = new Array();
      this.args = args.join(" ");
      if(args.length>1 && this.name=="site") {
	//this.name = "web";
	this.args = "site:"+this.args;
	this.cmd = "web";
      }
      else if( this.name=="wiki") {
	//this.name = "web";
	this.args = "site:"+goosh.config.lang+".wikipedia.org "+this.args;
	this.cmd = "web";
      }
      else if( this.name=="amazon") {
	//this.name = "web";
	var am = "amazon.com";
	if(goosh.config.lang == "de") am = "amazon.de";  

	this.args = "site:"+am+" "+this.args;
	this.cmd = "web";
      }
 
      else this.cmd = this.name;

      this.query(this.cmd,this.args);
    }
  }


  // get more results
  this.more = function(){
    if(this.args){
//      this.start += parseInt(goosh.config.numres);
      this.start++;
      this.qstart = this.results.length;
      
      if(this.results.length < this.start + parseInt(goosh.config.numres))
	this.query(this.cmd,this.args);
      else
	this.renderResult();

    }
  }


  // persoen search and get output
  this.render = function(context, results, status, details, unused){
    if(goosh.ajax.iscontext(context)){
      if(results && results.results){

	for(i=0;i<results.results.length;i++) {
	  var r = results.results[i];

	  if(this.name =="blogs") 
	    results.results[i].unescapedUrl = r.postUrl;
	  else if(this.name =="images")
	    results.results[i].thumb = "<img src='"+r.tbUrl+"'  width='"+r.tbWidth+"' height='"+r.tbHeight+"'/>";
	  else if(this.name =="video"){
	    results.results[i].thumb = "<img src='"+r.tbUrl+"' width='130' height='97' />";;
	    results.results[i].unescapedUrl = r.playUrl;

	  }

	  this.results.push(results.results[i]);
	}

	this.hasmore = true;

	if(results.results.length < 8){
	  this.hasmore = false;
	  moreobj = false;
	}
      }
      else{
	this.hasmore = false;
	moreobj = false;
      }

      if(this.hasmore && this.results.length < this.start + parseInt(goosh.config.numres)){
	this.qstart = this.results.length;
	this.query(this.cmd,this.args);
	return
      }

      if(results && results.cursor && results.cursor["moreResultsUrl"])
	this.moreresurl = results.cursor["moreResultsUrl"];

      if(!this.hasmore && this.moreresurl){
	r = new Object();

	r.title = "More results at google";
	r.unescapedUrl = unescape(this.moreresurl);
	r.content = "";
	this.results.push(r);

      }

      this.renderResult(context, results, status, details, unused);


      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();
    }
  }

}
goosh.modules.register("web");


