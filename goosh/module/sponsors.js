
goosh.module.sponsors = function(){
  this.name = "sponsors";
  this.aliases = new Array("sponsors");

  this.help = "A list of people who have supported goosh";
  this.parameters = "";

  this.call = function(args){

    goosh.gui.outln("A list of people who have supported goosh:");
    goosh.gui.outln("");
    goosh.gui.outln("1. Levonn");
    goosh.gui.outln('2. <a href="https://www.patreon.com/goosh?ty=h" target="_blank">Your name here? Support goosh (and me) on patreon!</a>');
    goosh.gui.outln("");


  }

}
goosh.modules.register("sponsors");


