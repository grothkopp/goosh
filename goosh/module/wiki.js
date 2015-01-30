goosh.module.wiki = function(){
  this.name = "wiki";
  this.aliases = new Array("wikipedia","wiki");
  this.mode = true;
  this.help = "wikipedia search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>wiki foo bar</i>  - searches &quot;foo bar&quot; in wikipedia<br/>";


}
goosh.modules.register("wiki","web");


