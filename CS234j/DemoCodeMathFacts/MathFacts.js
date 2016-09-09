
/* ------------------------------------------------------------------------------------------
Description:
	Simple quiz: Gives user 30 seconds to solve as many basic math fact problems as possible.
Params:
	type: "sub" or "add" (subtraction or addition
Author: Rich Albers

Dependencies:
	MathFacts.html & .css
	jquery
	gameClock.js
	messageBox.js
--------------------------------------------------------------------------------------------- */

//constants
var MF_GAME_TIME_SECONDS = 30;

//----------------------------------------------------
$(document).ready(function()
{ 
	var sProbType = getURLParameter("type");		//"sub"=subtraction, "add"=addition
	var oGameClock = new Clock("#gameClock", MF_GAME_TIME_SECONDS);
	var iNumberCorrect = 0;
	var iNumberIncorrect = 0;
	var oQstAns = {
		sQuestion: "",
		sAnswer: "",
	}
	
	//Create sAnswer pad containing number 1-20, in 4 rows and 5 columns
	addsAnswerButtons('#answerPad',4,5);

	//Configure game to do either "Subtraction" or "Addition" based on URL parameter
	if (sProbType == "subtraction" || sProbType == "sub" || sProbType == "s") {
		sProbType = "sub";
		document.title = 'MathFacts - Subtraction';
		$("h1").html("Subtraction!");
	} else {
		sProbType = "add";
		document.title = 'MathFacts - Addition';
		$("h1").html("Addition!");	
	}
	
	//Configure Clock timeout event handler
	//When clock expires totals are given and player presses OK to restart
	oGameClock.setCallback(function() {
		oGameClock.stop();
		var sMsg = "Time's Up!";
		sMsg+= "<br>";
		sMsg+= "<br>Correct: " + iNumberCorrect;
		sMsg+= "<br>Incorrect: " + iNumberIncorrect;
		sMsg+= "<br>";
		var diff = iNumberCorrect - iNumberIncorrect;
		if (diff >= 12)
			sMsg+="Great job!";
		else if (diff >=9)
			sMsg+="Good job!";
		else 
			sMsg+="Keep Practicing!";
		sMsg+= "<br><br>Press OK to try again!";
		displayMessageBox(sMsg, function() {
			iNumberCorrect=0;
			$("#numberCorrect").html(iNumberCorrect);
			iNumberIncorrect = 0; 
			$("#numberIncorrect").html(iNumberIncorrect);
			oGameClock.set(0,MF_GAME_TIME_SECONDS);
			oGameClock.start();
		});
	});
	
	// Configure sAnswer button event handler
	// When answer is selected, it's checked and right/wrong message is shown
	$('.answerButton').click(function() {
		$(this).addClass("selected"); //changes button's color
		var selectedsAnswer = $(this).html(); //the html of the clicked button contains the number it displays
		var sMsg="";
		oGameClock.stop();
		if (selectedsAnswer == oQstAns.sAnswer) {
			$("#numberCorrect").html(++iNumberCorrect);
			sMsg=oQstAns.equation + selectedsAnswer + "<br>Correct!"
		} else {
			$("#numberIncorrect").html(++iNumberIncorrect);
			sMsg=selectedsAnswer + " is incorrect<br>" + oQstAns.equation + oQstAns.sAnswer;
		}
		displayMessageBox(sMsg, function() {
			buildAndDisplaysQuestion(sProbType, oQstAns);
			oGameClock.start();			
		});		
		
		$(this).removeClass("selected"); //puts color back to original
	});
	
	//Display welcome message box and start game when user clicks OK
	var sMsg="Welcome to Math Facts!";
	sMsg+="<br>"
	sMsg+="<br>Click on the correct answer for each problem displayed.";
	sMsg+="<br>";
	sMsg+="<br>Press OK to start";
	displayMessageBox(sMsg, function() {
		oGameClock.start();
		buildAndDisplaysQuestion(sProbType, oQstAns);
	});

});

//----------------------------------------------------
// Adds a grid of sAnswer buttons, numbered 1 to n, to a table whose id is elementID.
// Each sAnswer button will be in a class named sAnswerButton.
// Params: 
//		sElementId (I) - ID of table element to which answer button will be added
//		iRows (I) - # of rows to add
//		iCol (I) - # of columns to add
// -----------------------------------------------------------------------------
function addsAnswerButtons(sElementId, iRows, iCols) {
	
	var num=1;
	for(row=0; row<iRows; row++) {
		var sRowHtml='<tr>';
		for(col=0; col<iCols; col++) {
			sRowHtml+=('<td>' + num + '</td>');
			num++;
		}
		sRowHtml+='</tr>';
		$(sElementId).append(sRowHtml);
	}

	var sSelector=sElementId + " td";
	$(sSelector).addClass('answerButton');
}

// ----------------------------------------------------------------------------
// Builds simple addition or subtraction problem
// Params: 
//		sProbType (I) - Type of Question: "sub" or "add"
//		oQstAns (O) - equation (sQuestion) and sAnswer (number)
// -----------------------------------------------------------------------------
function buildAndDisplaysQuestion(sProbType, oQstAns) {
	var high=10;
	var low=2;
	var num1 = Math.floor(Math.random()*(high-low)) + low;
	var num2 = Math.floor(Math.random()*(high-low)) + low;

	if (sProbType == "sub") {
		num1 = num1 + num2;
		oQstAns.equation = num1 + " - " + num2 + " = ";
		oQstAns.sAnswer = num1 - num2;
	} else {
		oQstAns.equation = num1 + " + " + num2 + " = ";
		oQstAns.sAnswer = num1 + num2;
	}
	
	$('#equation').html(oQstAns.equation + " ?");
}

// ----------------------------------------------------------------------------
// Gets given parameter value from URL
// Params:
//		sParam - the parameter to find
// Returns:
//		The value associated with that parameter.  "" if not found.
// ----------------------------------------------------------------------------
function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
	}
	
	return "";
}

// ----------------------------------------------------------------------------
// dump - test function to show values in object....
function dump(obj) {
   var sValues;
	for (property in obj) {
		sValue = property + ": " + obj[property] + "\n";
		sValues += sValue;
	}
	alert(sValues);
}




