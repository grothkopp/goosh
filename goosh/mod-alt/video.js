
goosh.module.video = function(){
  this.name = "video";
  this.aliases = new Array("videos","video","v");
  this.mode = true;

  this.parameters = "[keywords]";
  this.help = "google video search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>video foo bar</i>  - searches for &quot;foo bar&quot; videos<br/>";


}
goosh.modules.register("video","web");


