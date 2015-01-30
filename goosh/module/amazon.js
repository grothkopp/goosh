goosh.module.amazon = function(){
  this.name = "amazon";
  this.aliases = new Array("amazon","am");
  this.mode = true;
  this.help = "amazon search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>amazon foo bar</i>  - searches &quot;foo bar&quot; on amazon<br/>";


}
goosh.modules.register("amazon","web");


