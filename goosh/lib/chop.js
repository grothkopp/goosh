goosh.lib.chop = function(text){

if(text)
 while(text.charAt(0) == " ") text = text.substr(1);

return text;
}
