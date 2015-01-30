goosh.module.site = function(){
  this.name = "site";
  this.aliases = new Array("site","in");
  this.parameters = "&lt;url> &lt;keywords>";
  this.help = "search in a specific website";
  this.mode = false;


}
goosh.modules.register("site","web");


