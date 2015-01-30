
goosh.module.help = function(){
  this.name = "help";
  this.aliases = new Array("help","man","h","?");

  this.help = "displays help text";
  this.helptext = "";
  this.parameters = "[command]";

  this.call = function(args){

    if(args[0] == "goosh") args[0] = false;

    var out = "<span class='info'>help";
    if(args[0]) out +=": "+args[0];
    out += "</span><br/> <br/>";

    if(args[0] && !goosh.modules.list[args[0]]) {
     goosh.gui.error("command &quot;"+args[0]+"&quot; not found.");
    return false;
    }

    out += "<table border='0' class='help'>";
    out += "<tr><td class='less'>command</td><td class='less'>aliases</td><td class='less'>parameters</td><td class='less'>function</td></tr>";

    var module;

    for(key in goosh.modules.list){
       if(!args[0] || key == args[0]){
	module = goosh.modules.list[key];

	out += "<tr><td";
         if(module.mode) out += " class='info'";
	 out += ">";
	out += ""+module.name + "</td><td>";
	if(module.aliases.length >1){
	out += "(";
	for(i=0;i<module.aliases.length;i++){
	  if(module.aliases[i] != module.name){
	  out += module.aliases[i];
	  out += ",";
	  }
	}

	out = out.substr(0,out.length-1);
	out += ")";
	}
	out += "</td><td>";
	if( module.parameters) out +=  module.parameters;
	out += "</td><td>";
	out += ""+ module.help +"\n";
	out += "</td></tr>";

      }
    }

    out += "</table>";

       if(args[0]){
     out += " <br/>";
     out += module.helptext;
     out += " <br/>";
    }
    else{
     out += " <br/>";
     out += "- Enter green commands without parameters to change default mode.<br/>";
    out += "- Anything that's not a command will search in current default mode.<br/>";
    out += "- Aliases will expand to commands. Numbers will expand to corresponding search results.<br/>";
    out += "- Use cursor up and down for command history.<br/>";
    out += "- Enter keyword and hit the tab-key for tab-completion.<br/>";
    out += "- Commands marked with * are experimental, use them with care and please report any bugs.<br/>";
    out += "<br/>";


    
    }

	goosh.gui.outln(out);
  }

}
goosh.modules.register("help");


