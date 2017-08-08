var worker = new Worker('insertSort.js');

worker.onmessage = function(event) {
	//var n=parseInt(event.data,10);
	console.log(event.data);
}