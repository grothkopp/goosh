
goosh.module.gmail = function(){
  this.name = "gmail";
  this.aliases = new Array("mail","gmail");

  this.help = "read & write mail in gmail *";
  this.helptext = "";
  this.parameters = "[compose]";

  this.call = function(args){
    if(args[0] == "compose")
    //oosh.gui.out("<iframe name='test' src='https://mail.google.com/mail/?tf=1&view=cm&ui=1&fs=1' width='800' height='600' frameborder='0' border='0' style='font-family: monospace; background-color: #eef0f3;'></iframe>");
    goosh.gui.out("<iframe name='test' src='http://mail.google.com/mail/x/129tmd5bnk3ry-/?v=b&eot=1&pv=tl&cs=b' width='800' height='440' scrolling='auto' frameborder='0' border='0' style='font-family: monospace; background-color: #eef0f3;'></iframe>");
    //goosh.gui.out("<iframe name='test' src='http://mail.google.com/mail/?account_id=grothkopp%40gmail.com&view=comp&extsrc=goosh' width='800' height='440' frameborder='0' border='0' style='font-family: monospace; background-color: #eef0f3;'></iframe>");
    else
    goosh.gui.out("<iframe name='test' src='http://mail.google.com/mail/x/' width='800' height='400' frameborder='0' border='0' style='font-family: monospace; background-color: #eef0f3;'></iframe>");


  }

}
goosh.modules.register("gmail");


