
goosh.module.logout = function(){
  this.name = "logout";
  this.aliases = new Array("logout");

  this.help = "log out of goosh *";
  this.helptext = "";

  this.call = function(args){
     goosh.ajax.query("http://goosh.appspot.com/dologout?");
     if(goosh.ajax.iscontext(goosh.ajax.lastcontext)){
      goosh.config.user = "guest";
      goosh.lib.cookie.del("loggedin");
      goosh.gui.updateprompt();
      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();
     
     }

  }

}
goosh.modules.register("logout");


