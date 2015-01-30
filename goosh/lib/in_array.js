goosh.lib.in_array = function (arr,elem) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == elem) {
      return true;
    }
  }
  return false;
};

