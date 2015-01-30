
goosh.module.login = function(){
  this.name = "login";
  this.aliases = new Array("login");

  this.help = "login with your google account *";
  this.helptext = "goosh sees only your username";
  this.parameters = "";


  this.cb = function(context,username){
    if(goosh.ajax.iscontext(context)){
      if(username && username != "guest") goosh.lib.cookie.set("loggedin","1",365);

      goosh.config.user = username;
      if(goosh.config.user != "guest"){
      goosh.gui.outln("You're logged in as: "+goosh.config.user+"<br/>");
      goosh.set.init();

      goosh.gui.updateprompt();
      goosh.gui.showinput();
      goosh.gui.focusinput();
      goosh.gui.scroll();

    }  
    else 
      goosh.ajax.query("http://goosh.appspot.com/dologin?");


    goosh.gui.showinput();
    goosh.gui.focusinput();
    goosh.gui.scroll();


  }
}

this.call = function(args){

  goosh.ajax.query("http://goosh.appspot.com/status?callback=goosh.modobj.login.cb");

}

}
goosh.modules.register("login");


