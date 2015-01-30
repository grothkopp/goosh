
goosh.module.calculate = function(){
  this.name = "calculate";
  this.aliases = new Array("calculate","calc");

  this.help = "evaluate a mathematical expression";
  this.parameters = "[mathematical expression]";

  this.call = function(args){

    var out ="";

    var exp = args.join(" ");
    var expin = exp;

    if(exp.match(/^[0-9\+\-\/\*\. \^\(\)]+$/)){
   
    exp = exp.replace(/([0-9]+)\^([0-9]+)/g, "Math.pow($1,$2)");

    goosh.gui.outln(expin+" = "+eval(exp));
    }
    else{
    goosh.gui.error("could not calculate that.");
    return false;
    }

  }

}
goosh.modules.register("calculate");


