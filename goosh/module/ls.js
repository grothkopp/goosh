
goosh.module.ls = function(){
  this.name = "ls";
  this.aliases = new Array("ls");

  this.help = "lists commands";
  this.helptext = "this exists just for convenience. Use <span class='info'>help</span> for help.<br/>";
  this.parameters = "[command]";

  this.call = function(args){

    var out ="";

    if(args[0] && !goosh.modules.list[args[0]]) {
    goosh.gui.error("command &quot;"+args[0]+"&quot; not found.");
    return false;
    }

    out += "<table border='0' class='help'><tr>";

    var module;
    var i =0;

    for(key in goosh.modules.list){
       if(args.length ==0 || key == args[0]){
	module = goosh.modules.list[key];

	out += "<td";
	if(module.mode) out += " class='info'";
	out += ">"+module.name + "</td><td>";
        if(i==5){ i=0; out += '</tr><tr>';}
	i++;
      }
    }

    out += "</tr></table>";


    goosh.gui.outln(out);
  }

}
goosh.modules.register("ls");


