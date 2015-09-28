(function(window){
	
 	$(document).ready(function() {
 		startApp();
  	});

 	// ************************************************************
 	//
 	// mario kart tweens
 	//
 	// ************************************************************

  	var finished = 0;

	function startApp() {

		// toon start button
		TweenLite.set("#start", {y:-250});
		$("#start").click(function() {
			startRace();
		});

		//verschijn bij de start
		appearAtStart();
	}

	// ************************************************************
	//
	// verschijn bij de start
	//
	// ************************************************************
	function appearAtStart() {
		$(".mushroom").remove();
		TweenLite.set(".kart", {x:-250});
		TweenMax.staggerTo($(".kart"), 1, {x:0}, 0.3, showButton);
	}

	// ************************************************************
	//
	// startknop
	//
	// ************************************************************
	function showButton() {
		TweenLite.to("#start",0.8, {y:0});
	}

	// ************************************************************
	//
	// start race
	//
	// ************************************************************
	function startRace() {
		// disable start button
		TweenLite.to("#start",0.8, {y:-250});

		// reset positions
		finished = 0;

		// race all karts random
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
		finished++;
		if(finished == 1) {
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