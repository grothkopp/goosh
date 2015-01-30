
goosh.module.translate = function(){
  this.name = "translate";
  this.aliases = new Array("translate","trans","t");
  this.mode = true;
  this.args ="";

  this.parameters = "[lang1] [lang2] &lt;words>";
  this.help = "google translation";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>translate en de What time is it?</i>  - translate &quot;What time is it?&quot; from english to german<br/>"+
  		  "<i>translate fr What time is it?</i>  - translate &quot;What time is it?&quot; to french<br/>"+
  		  "<i>translate Wie sp&auml;t ist es?</i>  - translates &quot;Wie sp&auml;t ist es?&quot; to your default language. language of text will be guessed.<br/>";

  this.query = function(cmdstr,args) {

  goosh.ajax.query("http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q="+encodeURIComponent(this.text)+"&langpair="+this.lang1+"%7C"+this.lang2+"&callback=goosh.modobj."+this.name+".render"+'&key='+goosh.config.apikey);
  }

  this.guess = function(text) {

  goosh.ajax.query("http://ajax.googleapis.com/ajax/services/language/detect?v=1.0&q="+encodeURIComponent(text)+"&callback=goosh.modobj."+this.name+".guessresult"+'&key='+goosh.config.apikey);
  }


  this.guessresult = function(context, results, status, details, unused){
    if(goosh.ajax.iscontext(context)){
      if(results){
	if(results.language){
	  this.lang1 = results.language;
          if(!this.lang2) this.lang2 = goosh.config.lang; 
	  
	  this.query();

	}else{
	  goosh.gui.error("could not guess language.");
	}
      }
    }



  }

  this.renderResult = function(context, results, status, details, unused){
    var out = "";
    var rnum = this.start;
    if(goosh.ajax.iscontext(context)){
      if(results){
      if(results.translatedText){
 	goosh.gui.outln("translating &quot;"+this.text+"&quot; from "+goosh.gui.info(goosh.lang.reverse[this.lang1])+" to "+goosh.gui.info(goosh.lang.reverse[this.lang2])+":");
	goosh.gui.outln('');
 	goosh.gui.outln(goosh.gui.info("&quot;"+results.translatedText+"&quot;"));
	goosh.gui.outln('');
	}else{
	goosh.gui.error("no translation found.");
       }
  }


  goosh.gui.showinput();
  goosh.gui.focusinput();
  goosh.gui.scroll();
 }
}



  this.call = function(args){
   this.args = args;
   this.lang1 = false;
   this.lang2 = false;
   
   if(args.length > 2 && (goosh.lang.list[args[0]] || goosh.lang.reverse[args[0]]) && (goosh.lang.list[args[1]] || goosh.lang.reverse[args[1]])){

     if(goosh.lang.list[args[0]])
      this.lang1 = goosh.lang.list[args[0]];
     else
      this.lang1 = args[0];

     if(goosh.lang.list[args[1]])
       this.lang2 = goosh.lang.list[args[1]];
     else
       this.lang2 = args[1];

     this.text  = args[2];
     for(i=3;i<args.length;i++) this.text += " "+args[i];


     this.query(this.name,args);
   } 
   else {
     var text = "";
     if(goosh.lang.list[args[0]] || goosh.lang.reverse[args[0]]){
       if(goosh.lang.list[args[0]])
	 this.lang2 = goosh.lang.list[args[0]];
       else
	 this.lang2 = args[0];

       text = args[1];
       for(i=2;i<args.length;i++) text += " "+args[i];
     }
     else {
       text = args.join(" ");
     }
     this.text = text;
     this.guess(text);
   }
  }

  this.render = function(context, results, status, details, unused){
    //output.innerHTML += "CALL<br/>";

     this.renderResult(context, results, status, details, unused);
  }

}
goosh.modules.register("translate");


