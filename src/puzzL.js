var funds = {},
	divQ = [],
	wi = 0,
	he = 0,
	bCount = 0;
	iList = [{}],
	sList = [{}];
	bList = [];
function puzzL(_funds){
	$.each(_funds, function(key, value){
		if(key != undefined){
			funds[key] = value;	
		}
	});
	bCount = Math.pow(funds.partition,2);
	var counter = 0;
	for(var i=0;i<funds.partition;i++){
		for(var j=0;j<funds.partition;j++){
			iList[counter] = {0:counter, 1:i, 2:j};
			counter++;
		}
	}
	regulateDivSize();
	shuffle();
}
function box(){
	var index;
	var bDiv;
}
box.prototype.select = function(selected){
	if(divQ.length < 2){
		divQ[divQ.length] = selected;
		if(divQ.length == 2){
			swap(divQ[0], divQ[1]);
		}
	}
	else{
		clearBorders();	
		divQ = [];
		divQ[0] = selected;
	}
	$(selected).css("border", "1px solid #0f0");
}
box.prototype.load = function(box, id){
	box.index = id[0];
	var raw_image = funds.image;
	var i = id[1];
	var j = id[2];
	
	div = $(document.createElement('div'));
	$(div).addClass("partition");
	$(div).css("height", (he-4) + "px");
	$(div).css("width", (wi-4) + "px");
	$("#mainDiv").css({"width":(wi*funds.partition)+"px"});
	$("#mainDiv").css({"height":(he*funds.partition)+"px"});
	$(div).css("background", "url('" + raw_image + "') no-repeat");
	$(div).css("background-position", (-(j*(wi-4)) + " " + -(i*(he-4))));
	$(div).attr("id", (id[0] + "_div_" + i  + "_" + j)); //id 'clicked images' için gerekli.
	$(div).click(function(){
		if(divQ.length < 2){
			divQ[divQ.length] = box;
			if(divQ.length == 2){
				swap(divQ[0], divQ[1]);
				if(check()){
					alert("done");
				}
			}
		}
		else{
			clearBorders();	
			divQ = [];
			divQ[0] = box;
		}
		$(this).css("border", "1px solid #0f0");
	});
	$("#mainDiv").append(div);
	this.bDiv = div;
}
puzzL.prototype.init = function(){
	var _partition = Math.pow(funds.partition,2);
	for(var i=0;i<_partition;i++){
		var curr = new box();
		curr.load(curr, sList[i]);
		bList[sList[i][0]] = curr;
	}
}
function swap(d1, d2){
	var index1 = d1.index;
	var index2 = d2.index;
	
	
	var temp_bg = bList[index1].bDiv.css("background-image");
	var temp_bg_pos = bList[index1].bDiv.css("background-position");
	
	d1.bDiv.css("background-image", bList[index2].bDiv.css("background-image"));
	d1.bDiv.css("background-position", bList[index2].bDiv.css("background-position"));
	
	d2.bDiv.css("background-image", temp_bg);
	d2.bDiv.css("background-position", temp_bg_pos);
	
	var temp = sList[index1];
	sList[index1] = sList[index2];
	sList[index2] = temp;
}
function shuffle(){
	for(var i=0; i<bCount;i++){
		var follIndex = Math.floor((Math.random())*(iList.length-1));
		var follData = iList[follIndex];
		
		sList[i] = {};
		sList[i] = follData;
		
		iList.splice(follIndex, 1)
		
	}
}
function clearBorders(){
	$.each(bList, function(key, value){
		this.bDiv.css("border", "1px solid #fff");
	});
}
function regulateDivSize(){
	
	if(funds.partition > 0){
		wi = funds.width/funds.partition;
		he = funds.height/funds.partition;
	}
	else{
		console.log("Your have missing parameter!");
	}
}
function check(){
	for(var i = 0;i < bCount;i++){
		if(sList[i][0] != i){
			return false;
		}
	}
	return true;
}