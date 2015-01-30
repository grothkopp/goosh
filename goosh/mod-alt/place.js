
goosh.module.place = function(){
  this.name = "place";
  this.aliases = new Array("places","place","map","p");
  this.mode = true;
  this.start = 0;
  this.args ="";

  this.parameters = "[address]";
  this.help = "google maps search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>place New York</i>  - show new york in a map<br/>";

  this.query = function(cmdstr,query) {

      goosh.ajax.query("http://maps.google.com/maps/geo?q="+encodeURIComponent(query)+"&output=json&callback=goosh.modobj."+this.name+".render&key="+goosh.config.apikey+"&lang="+goosh.config.lang);

  }



  this.call = function(args){
   if(args.length > 0)
     this.start = 0;
     this.results = new Array();
     this.args = args.join(" ");
     this.query(this.name,args.join(" "));
  }


  this.render = function(results){ 
    if(goosh.ajax.iscontext(goosh.ajax.lastcontext)){

      if(results && results.Placemark){
	results.results = new Array();

	for(i=0;i<results.Placemark.length;i++){
	  if(results.Placemark[i])
	  {
	    this.hasmore = true;
	    var r = results.Placemark[i];
	    var acc = r.AddressDetails.Accuracy;
	    var detail = 5;
	    if(acc >= 4) detail = 10;
	    if(acc >= 6) detail = 14;
	    results.results[i] = new Array();
	    results.results[i].title = r.address;
	    results.results[i].unescapedUrl = "http://maps.google.com/maps?f=q&hl="+goosh.config.lang+"&q="+encodeURIComponent(r.address)+"&center="+r.Point.coordinates[1]+","+r.Point.coordinates[0]+"&zoom="+(detail);
	    results.results[i].content = ""; 
	    results.results[i].thumb = "<img src='http://maps.google.com/staticmap?center="+r.Point.coordinates[1]+","+r.Point.coordinates[0]+"&zoom="+(detail)+"&size="+goosh.config.mapwidth+"x"+goosh.config.mapheight+"&maptype=roadmap&markers="+r.Point.coordinates[1]+","+r.Point.coordinates[0]+",blue"+"&key="+goosh.config.apikey+"' width='"+goosh.config.mapwidth+"' height='"+goosh.config.mapheight+"'/>"; 
	  }


	}
	    
	this.hasmore = true;
	this.results = results.results;
	this.renderResult(goosh.ajax.lastcontext, results);
      }
      else {
	goosh.gui.error("Place &quot;"+this.args+"&quot; not found.");
      }

      if(this.results.length <= this.start+ parseInt(goosh.config.numres)){
	this.hasmore = false;
	moreobj = false;

      }


      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();
    }

    return true;
  }

  this.more = function(){
    if(this.args){
      this.start += parseInt(goosh.config.numres);
      //this.query(this.name,this.args);

      if(this.results.length <= this.start+ parseInt(goosh.config.numres)){
	this.hasmore = false;
	moreobj = false;

      }
      this.renderResult();

    }

  }


}
goosh.modules.register("place","web");


