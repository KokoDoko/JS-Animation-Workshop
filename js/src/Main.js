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
	// SHOW THE START BUTTON -- THIS FUNCTION IS CALLED AFTER THE KARTS HAVE APPEARED AT THE START
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

		// we use a loop to define four random speeds, and also to get a reference to each individual kart.
		for(var i = 0; i<4; i++){
			// random speed for a kart in seconds
			var speed = 1 + Math.random() * 3;
			// get the individual kart reference. this will be used to tween this kart, but also to tell the callback function which kart has finished
			var kart = $("#container").children().eq(i);
			// now we create the actual tween animation
			// we tell tweenlite to animate the kart at a speed. 
			// we use easing to simulate a accelerate and brake effect for the animation
			// we also add a CALLBACK function, this will be called when the animation has finished (the kart has passed the finish)
			// and lastly, we define the parameter for the callback function, which is a reference to the kart that has finished
			TweenLite.to(kart,speed,{x:finish,ease:Cubic.easeInOut,onComplete: evaluateKart, onCompleteParams:[kart]});
		}
	}

	// ************************************************************
	//
	// A KART PASSES THE FINISH LINE
	// THIS IS CALLED WHEN THE RACING ANIMATION FOR ONE KART HAS COMPLETED
	//
	// ************************************************************
	function evaluateKart(kart) {
		// update the number of karts that has finished
		kartsFinished++;
		// we check how many karts have finished
		if(kartsFinished == 1) {
			// use jQuery to add a mushroom image to the DOM
			var powerup = $("<div class='mushroom'></div>");
			kart.append(powerup);
			// now we animate the mushroom image 5 times
			// note that we also use this function to wait for all the karts to have finished
			// after that we use the callback function APPEARATSTART to restart the whole process
			TweenMax.to(powerup, 0.7, {y:"-=50", alpha:0, repeat:5, onComplete:appearAtStart});
		} else {
			// this kart has not finished first, so it just drives away
			TweenLite.to(kart, 0.7, {x:"+=200", ease:Cubic.easeIn, delay:0.3});
		}
	}

	
  	
})(window);