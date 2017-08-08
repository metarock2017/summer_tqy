var insertSort= function insertSort(array) {
    var i = 1;
   var j,key= array.length;

    for (; i < array.length; i++) {

        step = j = i;
        key = array[j];

        while (--j > -1) {
            if (array[j] > key) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }

        array[j + 1] = key;
    }

    return array;
};
var a=new Array;
for (var i = 0; i <20000; i++) {
	a[i]=parseInt(Math.random()*20000,10);
}
postMessage(insertSort(a));
