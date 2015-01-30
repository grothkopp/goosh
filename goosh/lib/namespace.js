
// thanks to Michael Schwarz for this function
goosh.lib.namespace = function (ns)
{
  var parts = ns.split(".");
  var root = window;

  for(var i=0; i<parts.length; i++)
  {
    if(typeof root[parts[i]] == "undefined")
      root[parts[i]] = new Object();

    root = root[parts[i]];
  }
}



