
goosh.module.settings = function(){
  this.name = "settings";
  this.aliases = new Array("settings","set");

  this.help = "edit settings";
  this.parameters = "[name] [value]";

  this.helptext =  "<span class='info'>examples:</span><br/>"+
      "<i>set lang de</i>  - sets language to german<br/>"+
      "<i>set lang</i>  - displays value of lang-setting<br/>"+
      "<i>settings</i>  - displays all settings<br/>"+
      "<i>settings reset</i>  - reset all settings to default values<br/>";


  this.call = function(args){

    var out ="";

    if(args[0] && args[1]){
      if(goosh.set.list[args[0]] && goosh.set.list[args[0]].set(args[1])){
        
	if(goosh.set.list[args[0]].get() == goosh.set.list[args[0]].def) 
	 goosh.lib.cookie.del(args[0]);
	else
	 goosh.lib.cookie.set(args[0],goosh.set.list[args[0]].get(),365);

	args[1] =false;
      }
      else {
	goosh.gui.error("Could not set "+args[0]+" to &quot;"+args[1]+"&quot;");
	return false;
      }
    }

    if(args[0] && !args[1]) {
      if(args[0] == "reset"){
	for(key in goosh.set.list){
	 goosh.set.list[key].set(goosh.set.list[key].def);
	 goosh.lib.cookie.del(key);
	}
	out += "Settings where set to default values.";
      }
      else if(goosh.set.list[args[0]]){
	out += args[0]+" is set to &quot;"+goosh.set.list[args[0]].get()+"&quot;.<br>";
      }
      else
	goosh.gui.error("No setting with that name.");
    }
    else{
      out += "<table border='0' class='help'><tr>";
      out += "<tr><td class='less'>name</td><td class='less'>value</td><td class='less'>default</td><td class='less'>help</td></tr>"

	for(key in goosh.set.list){
	  out += "<td";
	  out += " class='info'";
	  out += ">"+ key + "</td>";
	  out += "<td>"+goosh.set.list[key].get()+"</td>"
	  out += "<td class='less'>"+goosh.set.list[key].def+"</td>"
	    out += "<td class='less'>"+goosh.set.list[key].txt+"</td>"
	    out += '</tr><tr>';
	}

      out += "</tr></table>";

    }
    goosh.gui.outln(out);
    //alert(document.cookie);
  }

}
goosh.modules.register("settings");


