
goosh.module.cd = function(){
  this.name = "cd";
  this.aliases = new Array("cd");
  this.parameters = "&lt;command>";
  this.help = "change mode";
  this.helptext = "This exists just for convenience. Use &lt;command> without parameters instead.<br/>";

  this.call = function(args){
    if(!args[0]) args[0] = goosh.config.mode;
    if(args[0] && args[0] =="..") args[0] = "web";

    if(args[0] && goosh.modules.list[args[0]] && goosh.modules.list[args[0]].mode){ 
      var searcher = goosh.modules.list[args[0]];

      goosh.config.mode = searcher.name;
      goosh.gui.updateprompt();

    }
    else{
      goosh.gui.error("command not found or command is not a mode.");
    }
  }


}
goosh.modules.register("cd");


