
goosh.module.more = function(){
  this.name = "more";
  this.aliases = new Array("more","m");
  this.help = "get more results";

  this.call = function(args){
    if(goosh.config.moreobj && goosh.config.moreobj.hasmore){
     goosh.config.moreobj.more();
    }
  }


}
goosh.modules.register("more");


