(function(window){
	

	// ************************************************************
 	//
 	// USE JQUERY TO CHECK IF THE DOM HAS FINISHED LOADING
 	//
 	// ************************************************************
 	$(document).ready(function() {
 		startApp();
  	});

 	// ************************************************************
 	//
 	// SET UP
 	//
 	// ************************************************************


 	// the variable that keeps track of karts that have
 	// crossed the finish line is accessable from all functions
  	var kartsFinished = 0;


	function startApp() {

		// here we define the start button
		TweenLite.set("#start", {y:-250});
		$("#start").click(function() {
			startRace();
		});

		// the karts can now appear at the start
		appearAtStart();
	}

	// ************************************************************
	//
	// ALL KARTS APPEAR AT THE START ONE BY ONE
	// THIS FUNCTION IS CALLED BEFORE EVERY NEW RACE
	//
	// ************************************************************
	function appearAtStart() {
		// if we still had a mushroom (from a previous race) we remove it now
		$(".mushroom").remove();

		// set the karts to the left outside of our view
		TweenLite.set(".kart", {x:-250});

		// the karts appear one by one using the STAGGERTO command
		// by calling the CSS ".kart" class this animation will apply to all karts
		// note that we include a callback function: SHOWBUTTON
		// the callback function is called after all animations have finished
		TweenMax.staggerTo($(".kart"), 1, {x:0}, 0.3, showButton);
	}

	// ************************************************************
	//
	// SHOW THE START BUTTON 
	// THIS FUNCTION IS CALLED AFTER THE KARTS HAVE APPEARED AT THE START
	// CLICKING THE START BUTTON IS ALREADY DEFINED IN 'STARTAPP'
	// (we don't have to keep defining the click function every time the button is shown)
	//
	// ************************************************************
	function showButton() {
		TweenLite.to("#start",0.8, {y:0});
	}

	// ************************************************************
	//
	// START RACE
	// THIS FUNCTION IS CALLED BY THE START BUTTON
	//
	// ************************************************************
	function startRace() {
		// remove the start button from view
		TweenLite.to("#start",0.8, {y:-250});

		// remember that none of the karts have yet crossed the starting line
		kartsFinished = 0;

		// check the width of the race track and use that as a finishing point for our animation
		var finish = $("#container").width();

		
		for(var i = 0; i<4; i++){
			var speed = 1 + Math.random() * 3;
			var kart = $("#container").children().eq(i);
			TweenLite.to(kart,speed,{x:finish,ease:Cubic.easeInOut,onComplete: evaluateKart, onCompleteParams:[kart, i]});
		}
	}

	// ************************************************************
	//
	// kart gaat over de finishlijn
	//
	// ************************************************************
	function evaluateKart(kart, i) {
		// de eerste keer is de winnaar
		kartsFinished++;
		if(kartsFinished == 1) {
			// toon powerup
			var powerup = $("<div class='mushroom'></div>");
			kart.append(powerup);
			TweenMax.to(powerup, 0.7, {y:"-=50", alpha:0, repeat:5, onComplete:appearAtStart});
		} else {
			// teleurgesteld wegrijden
			TweenLite.to(kart, 0.7, {x:"+=200", ease:Cubic.easeIn, delay:0.3});
		}
	}

	
  	
})(window);