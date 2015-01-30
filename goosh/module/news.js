
goosh.module.news = function(){
  this.name = "news";
  this.aliases = new Array("news","n");
  this.mode = true;

  this.parameters = "[keywords]";
  this.help = "google news search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>blog foo bar</i>  - searches for &quot;foo bar&quot; news<br/>";


}
goosh.modules.register("news","web");


