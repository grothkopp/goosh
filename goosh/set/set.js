goosh.lib.namespace("goosh.set");

goosh.set.base = function(name,def,txt,min,max){
 this.name = name;
 this.txt = txt;
 this.def = def;
 (max) ? this.max = max : this.max = 2000;
 (min) ? this.min = min : this.min = 0;

 if(min && max) this.txt += " ("+min+".."+max+")";

 this.get = function() { return eval (""+this.name+";"); };
 this.set = function(val) { eval (""+this.name+" = '"+val+"';"); return true; };
 
}

goosh.set.list = new Object();
goosh.set.list['lang'] = new goosh.set.base("goosh.config.lang","en","google default language");
goosh.set.list['lang'].set = function(val) { 
  if (goosh.lang.reverse[val])  goosh.config.lang = val;
  else if (goosh.lang.list[val]) goosh.config.lang = goosh.lang.list[val];
  else return false;
  return true;
};

goosh.set.list['results'] = new goosh.set.base("goosh.config.numres","4","number of results for google-searches",1,100);
goosh.set.list['timeout'] = new goosh.set.base("goosh.config.timeout","4","timeout for ajax requests in seconds",1,100);

goosh.set.list['style.bg'] = new goosh.set.base("goosh.config.bgcolor","#FFFFFF","goosh background color");
goosh.set.list['style.bg'].set = function(val){
  if( goosh.gui.setstyle("body","backgroundColor",val) &&
      goosh.gui.setstyle("inputfield","backgroundColor",val)){
  goosh.config.bgcolor = val;
  return true;
  }
  else return false;
}

goosh.set.list['style.fg'] = new goosh.set.base("goosh.config.fgcolor","#000000","goosh font color");
goosh.set.list['style.fg'].set = function(val){
  if( goosh.gui.setstyle("body","color",val) &&
      goosh.gui.setstyle("inputfield","color",val)){
  goosh.config.fgcolor = val;
  return true;
  }
  else return false;
}

goosh.set.list['style.hl'] = new goosh.set.base("goosh.config.hlcolor","#009900","goosh highlight color");
goosh.set.list['style.hl'].set = function(val){
  goosh.gui.setstyleclass(".info","color: "+val);
  goosh.gui.setstyleclass("a:visited.info","color: "+val);
  goosh.config.hlcolor = val;
  return true;
}

goosh.set.list['style.sh'] = new goosh.set.base("goosh.config.shcolor","#666666","goosh 'shaded' color");
goosh.set.list['style.sh'].set = function(val){
  goosh.gui.setstyleclass(".less","color: "+val);
  goosh.config.shcolor = val;
  return true;
}


goosh.set.list['style.link'] = new goosh.set.base("goosh.config.linkcolor","#0000CC","goosh link color");
goosh.set.list['style.link'].set = function(val){
  goosh.gui.setstyleclass("a","color: "+val);
  goosh.config.linkcolor = val;
  return true;
}


goosh.set.list['style.vlink'] = new goosh.set.base("goosh.config.vlinkcolor","#551a8b","goosh visited link color");
goosh.set.list['style.vlink'].set = function(val){
  goosh.gui.setstyleclass("a:visited","color: "+val);
  goosh.config.vlinkcolor = val;
  return true;
}

goosh.set.list['theme'] = new goosh.set.base("goosh.config.theme","","ace theme");
goosh.set.list['theme'].set = function(val){
//  goosh.gui.setstyleclass("a:visited","color: "+val);
  goosh.gui.css('/css/'+val+'.css');
  goosh.config.theme = val;
  return true;
}



// #551a8b

//goosh.gui.setstyleclass



goosh.set.list['place.width'] = new goosh.set.base("goosh.config.mapwidth","300","width of map image",20,600);
goosh.set.list['place.height'] = new goosh.set.base("goosh.config.mapheight","150","height of map image",20,500);

goosh.set.list['amazon.reflink'] = new goosh.set.base("goosh.config.reflink","on","Add referer links to amazon product links");

goosh.set.init = function(context,result){

 if(goosh.config.user != "guest") {
    if(!context) {
      goosh.ajax.query("http://goosh.appspot.com/cookie?callback=goosh.set.init");
      return;
    }
    else if(goosh.ajax.iscontext(context)){

     goosh.gui.outln("Loading remote settings...");
     //alert(result);
     goosh.lib.cookie.getfromstr(document.cookie);
     goosh.lib.cookie.getfromstr(result,true);

    }

  }
  else {
   goosh.gui.outln("Loading local settings...");
   goosh.lib.cookie.getfromstr(document.cookie);
  }

  var cookies = goosh.lib.cookie.getall();

  for(key in goosh.set.list){
    var c = false;
    if(cookies[key]) c = cookies[key];
    if(c && goosh.set.list[key].set(c)) {
	goosh.gui.outln("&nbsp;"+key+" => &quot;"+c+"&quot;."); 
	}
    else{
       goosh.set.list[key].set(goosh.set.list[key].def);
//	goosh.gui.outln(key+" = &quot;"+goosh.set.list[key].get()+"&quot;."); 
    }
  }

     goosh.gui.outln("");
  //   goosh.gui.updateprompt();
   //  goosh.gui.showinput();
   //  goosh.gui.focusinput();
    goosh.getquery();

}


