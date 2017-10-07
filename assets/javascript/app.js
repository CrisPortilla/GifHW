$(document).ready(function() {

var games = ["Super Mario", "Madden", "Mario Kart", "Call of Duty", "Zelda", "Spyro", "Crash Bandicoot", "Mortal Kombat", "FIFA", "Street Fighter", "Injustice 2"]


	function displayGame() {
	
		var game = $(this).attr("data-name")
	
		var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=W80t3ri03Ue5VjmZt5SKhRytryy5xuqZ&limit=10";
	
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

				console.log(response);

				var results = response.data;
	
					for (var i = 0; i < results.length; i++) {
						
						var gifDiv = $("<div>");
					
						var p = $("<p>").html("Rating: " + results[i].rating);

						var gameGif = $("<img>");
				
						gameGif.attr("data-still", results[i].images.fixed_height_still.url);

						gameGif.attr("data-animate", results[i].images.fixed_height.url);

						gameGif.attr("src", gameGif.attr("data-still"));

						gameGif.on("click", function() {
							if ($(this).attr("src") === $(this).attr("data-still")) {
	                		$(this).attr("src", $(this).attr("data-animate"));
	                		} 
	                		else {
	                		$(this).attr("src", $(this).attr("data-still"));
	                		}
	                	});

						gifDiv.append(p);

						gifDiv.append(gameGif);

						$("#gifs-results").prepend(gifDiv)
					}
	
			});     
	}

	function renderButtons(){

		$("#buttons-view").empty();
		$("#search-input").empty();

		for (var i = 0; i < games.length; i++ ) {
			
				var b = $("<button>");

				b.addClass("game-btn")

				b.attr("data-name", games[i]);

				b.html(games[i]);

				$("#buttons-view").append(b);
		}
	}

	$(document).on("click", ".game-btn", displayGame);

	$("#add-search").on("click", function(event) {

		event.preventDefault();

		var game = $("#search-input").val().trim();

		games.push(game);

		renderButtons();
	});

	$(document).on("click", ".game", displayGame);

	renderButtons(); 


});