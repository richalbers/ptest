/* ------------------------------------------------------------------------------------------
Description:
	Clock class - provides simple displayable minute:second timer functionality
		Incomplete!  Only deals with seconds!    

Dependencies:
	jquery

Public Functions:
	Clock(elemID, startSeconds) - initializes and displays; if time is given, it counts down
	setCallBack(Function) - provides function to call when time reaches 0
	start() - starts it ticking
	stop() - pauses (at nearest second... so it loses some resolution)
	set(min, sec)

To use:
	var myClock = new Clock("#someElementID", startingTime);
	myClock.setCallback(function() { ... });
	myClock.start();
	myClock.stop(); //optional
--------------------------------------------------------------------------------------------- */
// Public Functions
function Clock(elemID, startSeconds) {
	this.elemID=elemID;	//id of element to contain display;
	this.sec=0;			//seconds since started
	this.timer;			//javascript timer
	this.countDown=false;
	//this.callBack = nil;
	
	if (startSeconds) {
		this.sec=startSeconds
		this.countDown=true;
	}
	
	this.display();
}

Clock.prototype.setCallback = function(callback) {
	this.callback = callback; //function to call when we reach 0 (if counting down)
}

Clock.prototype.start = function() {	
	var me=this;
	me.display();
	if (this.countDown==true)
		this.timer=setInterval(function() { me.decrement(1); }, 1000);
	else
		this.timer=setInterval(function() { me.increment(1); }, 1000);
	//alert(this.timer);
}

Clock.prototype.stop = function() {
	clearInterval(this.timer);
	//alert(this.timer);
}

Clock.prototype.set = function(min, sec) {
	this.min = min;
	this.sec = sec;
	this.display();
}

//--------------------------------------------------------------------------------------------- 
// Private Functions
Clock.prototype.increment = function(secsToAdd) {
	this.sec+=secsToAdd;
	this.display();
	return this.sec;
}

Clock.prototype.decrement = function(secsToSub) {
	this.sec-=secsToSub;
	this.display();
	if (this.sec == 0)
		this.callback();
	return this.sec;
}

Clock.prototype.display = function() {

	//format time as 0:00
	min = Math.floor(this.sec / 60);
	sec = this.sec % 60;
	if (sec == 0) sec = "00";
	else if (sec < 10) sec = "0" + sec;

	time = "" + min + ":" + sec;
	
	//display in given elemID
	$(this.elemID).html(time);
}
