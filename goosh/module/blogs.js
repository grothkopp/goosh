
goosh.module.blogs = function(){
  this.name = "blogs";
  this.aliases = new Array("blogs","blog","b");
  this.mode = true;

  this.parameters = "[keywords]";
  this.help = "google blog search";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>blog foo bar</i>  - searches for &quot;foo bar&quot; blogs<br/>";

}

goosh.modules.register("blogs","web");


