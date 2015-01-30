
goosh.module.lucky = function(){
  this.name = "lucky";
  this.aliases = new Array("lucky","l");
  this.mode = false;

  this.parameters = "[keywords]";
  this.help = "go directly to first result";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>lucky foo bar</i>  - goes to first &quot;foo bar&quot; result<br/>";

  this.call = function(args){
  this.qstart = 0;
   if(args.length > 0)
     this.query("web",args.join(" "));
  }

  this.render = function(context, results, status, details, unused){

    if(goosh.ajax.iscontext(context)){
      this.renderResult(context);

      if(results.results[0].unescapedUrl){
	setTimeout('window.location.href = "'+results.results[0].unescapedUrl+'"',0);
      }
      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();

    }
  }

}
goosh.modules.register("lucky","web");

