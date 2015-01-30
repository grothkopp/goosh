
goosh.module.images = function(){
  this.name = "images";
  this.aliases = new Array("images","image","i");
  this.mode = true;
  this.help = "google image search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
    "<i>images foo bar</i>  - searches for &quot;foo bar&quot; images<br/>";

}
goosh.modules.register("images","web");

