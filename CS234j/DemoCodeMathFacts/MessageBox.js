// ===================================================================
// Displays message box with given message and OK button.
// 		Returns immediately,
//		msg box stays displayed until user pressed OK,
//		When OK is pressed, callback function, if provided is called
//		Self-contained: all css and html is handled internally. 
//		 	Note: changing to use .css would allow user control over presentation...
//	Arguments:
//		msg - the message to display
//		callback - a function to call when OK is pressed
//	To use:
//		displayMessageBox("Hello world!");
//	or  displayMessageBox("Hello World!", function() { alert("Boo!") });
// ======================================================================
function displayMessageBox(msg, callback) {

	//selectors for dialog box components
	DBfso="#dbFullScreenOverlay"; 
	DBox="#dbBox";
	DBoxText=DBox + " div";
	DBoxOK= DBox + " button";
	
	$("body").append("<div id='dbFullScreenOverlay'> <div id='dbBox'><div></div></div> </div>");
	
	//overlay dims rest of screen 
	$(DBfso).css({
		position: 'absolute', 
		top: '0px',
		left: '0px',
		width: '100%',			
		height: '100%',
		zIndex: '99',
		background: 'rgba(200,200,200, 0.4)'
	});
	
	//dialog box will display text and OK button
	$(DBox).css({
		zdisplay: 'table-cell',
		width: '450px',
		zheight: '100px',
		margin: '160px auto',
		padding: '15px',
		background: 'white',
		border: '2px solid black',
		borderRadius: '20px',
		boxShadow: '10px 10px 5px #888',
		textAlign: 'center'
	});
	
	$(DBoxText).css({
		margin: '10px 0px'
	});
	
	$(DBoxText).html(msg);
	
	$(DBox + " p").css({
		margin: '10px 0px',
	});
	
	$(DBox).append("<button id='OK'> OK </button>");
	
	$(DBox + " #OK").css({
		padding: '10px 20px',
		margin: '10px',
		borderRadius: '20px'
	});

	$(DBox + " #OK").click(function(e) {
		$(DBfso).remove();
		if (callback)
			callback();
	});
}
