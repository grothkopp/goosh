goosh.lib.namespace("goosh.keyboard");

goosh.keyboard.suggestions = new Array();
goosh.keyboard.suggpos = 1;
goosh.keyboard.suggword ="";

goosh.keyboard.hist = new Array();
goosh.keyboard.histpos = 0;
goosh.keyboard.histtemp = 0;


goosh.keyboard.suggest = function(word){

  if(goosh.keyboard.suggpos > goosh.keyboard.suggestions[word].length) goosh.keyboard.suggpos =1;

  if(goosh.keyboard.suggestions[word][goosh.keyboard.suggpos]) 
    goosh.gui.inputfield.value = goosh.keyboard.suggestions[word][goosh.keyboard.suggpos];

  var d= goosh.gui.inputfield; 
  if(d.createTextRange){
    var t=d.createTextRange();
    t.moveStart("character",word.length);
    t.select()
  } else if (d.setSelectionRange){
    d.setSelectionRange(word.length,d.value.length)
  }

}


// evil hack for suggest 
goosh.keyboard.dummyac = function() {

  this.Suggest_apply = function(el,text,sug,temp){

    goosh.keyboard.suggestions[text] = sug;
    goosh.keyboard.suggest(text);
    return true;
  }

};

window.googlesug = new Array();

window.googlesug.ac = new goosh.keyboard.dummyac();


goosh.keyboard.keyDownHandler = function(event){
  if(!event&&window.event) {
    event=window.event;
  }
  if(event) {
    _lastKeyCode=event.keyCode;
  }

  // We are backspacing here...
  if(event&&event.keyCode==9){
    event.cancelBubble=true;
    event.returnValue=false;
    // tab = 9, backsp = 8, ctrl =17, r = 82
    //output.innerHTML += event.keyCode+"<br/>";

    var word = goosh.keyboard.suggword;

    if(word !=""){
      if(!goosh.keyboard.suggestions[word]){
        goosh.keyboard.suggpos = 1;
//	output.innerHTML += "query<br/>";
	var script = document.createElement('script');
	document.body.appendChild(script);
	script.src = "http://www.google.com/complete/search?hl="+goosh.config.lang+"&js=true&qu="+encodeURIComponent(word);
      }
      else{
        goosh.keyboard.suggpos  +=2;
	goosh.keyboard.suggest(word);
      }
    }
    return false
  }
}



goosh.keyboard.mcursor = function(e){
  var keycode=e.keyCode;


  if(goosh.keyboard.hist.length>0){
    if(keycode==38 || keycode==40){

      if(goosh.keyboard.hist[goosh.keyboard.histpos]) {
	goosh.keyboard.hist[goosh.keyboard.histpos] = goosh.gui.inputfield.value;
      }
      else
	goosh.keyboard.histtemp = goosh.gui.inputfield.value;
    }

    if(keycode==38){ // up
      goosh.keyboard.histpos--;
      if(goosh.keyboard.histpos<0) goosh.keyboard.histpos =0;

    }
    else if(keycode==40){ //down

      goosh.keyboard.histpos++;
      if(goosh.keyboard.histpos > goosh.keyboard.hist.length) 
        goosh.keyboard.histpos = goosh.keyboard.hist.length;
    } 

    if(keycode==38 || keycode==40){

      if(goosh.keyboard.hist[goosh.keyboard.histpos]) 
        goosh.gui.inputfield.value = goosh.keyboard.hist[goosh.keyboard.histpos];
      else 
        goosh.gui.inputfield.value = goosh.keyboard.histtemp;

    }

  }

  if(keycode!=9 && keycode !=13) 
   goosh.keyboard.suggword = goosh.gui.inputfield.value;

  if(keycode==13){
    goosh.command();
  }
}


