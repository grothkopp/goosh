goosh.lib.namespace("goosh.gui");


goosh.gui.inputel = false;
goosh.gui.outputel = false;
goosh.gui.promptel = false;

goosh.gui.inputfield = false;
goosh.gui.bodyel = false;

goosh.gui.el = function(id){
 return document.getElementById(id);
}


goosh.gui.init = function(){

  goosh.gui.inputel = document.getElementById('input');
  goosh.gui.outputel = document.getElementById('output');
  goosh.gui.promptel = document.getElementById('prompt');
  goosh.gui.inputfield = document.getElementById('inputfield');
  goosh.gui.bodyel = document.getElementById('body');


  if(goosh.gui.inputfield.createTextRange) {
     goosh.gui.inputfield.onkeyup= new Function("return goosh.keyboard.mcursor(event);");
     goosh.gui.bodyel.onfocus =    new Function("return goosh.gui.focusinput(event);");
     goosh.gui.bodyel.onclick =    new Function("return goosh.gui.focusinput(event);");
     goosh.gui.bodyel.onkeydown =  new Function("return goosh.keyboard.keyDownHandler(event);");
  } else {
     goosh.gui.inputfield.onkeyup= goosh.keyboard.mcursor;
     goosh.gui.bodyel.onfocus = goosh.gui.focusinput;
     goosh.gui.bodyel.onclick = goosh.gui.focusinput;
     goosh.gui.bodyel.onkeydown = goosh.keyboard.keyDownHandler;
  }

}


// input / output functions

goosh.gui.error = function(text){
  goosh.ajax.stopall();

  goosh.gui.out("Error: "+text+"<br/> <br/>");
  goosh.gui.showinput();
  goosh.gui.focusinput();
  goosh.gui.scroll();
}



goosh.gui.outln = function(text){
  goosh.gui.out(text+"<br/>");
}

goosh.gui.out = function(text){
  //goosh.gui.outputel.innerHTML += text;  
  var div = document.createElement("div");
  div.innerHTML = text;
  goosh.gui.outputel.appendChild(div); 
  return div;
}

goosh.gui.less = function(text){
  return "<span class='less'>"+text+"</span>";
}

goosh.gui.info = function(text){
  return "<span class='info'>"+text+"</span>";
}

goosh.gui.clear = function(){
  goosh.gui.outputel.innerHTML = "";
}

goosh.gui.showinput = function(){
  goosh.gui.inputel.style['display'] = 'block';
}

goosh.gui.hideinput = function(){
  goosh.gui.inputel.style['display'] = 'none';
}

goosh.gui.focusinput = function(){
  var txt = "";
  //if (document.getSelection) txt = document.getSelection();
  if (document.selection) txt = document.selection.createRange().text;
  else if (window.getSelection) txt = window.getSelection().toString();

  if(txt.length == 0){

    document.f.q.value = document.f.q.value; // for safari
    if(goosh.gui.inputel.style['display'] != 'none') document.f.q.focus();
  }
}

goosh.gui.updateprompt = function(){
  goosh.gui.prompt = goosh.config.user+"@"+goosh.config.host+":/"+goosh.config.mode+goosh.config.pend;
  goosh.gui.promptel.innerHTML = goosh.gui.prompt;
}

goosh.gui.scroll = function(){
  window.scrollBy(0, 122500);
}

goosh.gui.setstyle = function(ele,prop,val){
try{
  var el = goosh.gui.el(ele);
  el.style[prop] = val;
  return true;
}
catch(e){
return false;
}

}

goosh.gui.setstyleclass = function(classname,style){
  //goosh.gui.outputel.innerHTML += text;  
  var div = document.createElement("div");
  var out = "<br style='line-height:0px;'/><style>"+classname+" {"+style+"}</style>";
  div.innerHTML = out;
  goosh.gui.bodyel.appendChild(div);

}


