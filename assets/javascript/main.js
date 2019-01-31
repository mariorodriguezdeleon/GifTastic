// array of topics that will be called 
let topics = ["dogs", "cat", "eagle", "cheetah", "elephant", "koala"];

function generateButton(newTopic){

        let newBtn = $("<button>");

        newBtn.attr('topic-data', newTopic);
        newBtn.attr('value', newTopic);
        newBtn.html(newTopic);

        $('#buttons').append(newBtn);
        
}

for (let i = 0; i < topics.length; i++) {

        let btn = $("<button>");

        btn.attr('topic-data', topics[i]);
        btn.attr('value', topics[i]);
        btn.html(topics[i]);

        $('#buttons').append(btn);
}

//To DO: Implement static images for initial setup -> activate gif on click logic
//To DO: Ratings <p> tag, and logic to only show appropriate gifs
//TO DO: Search capabilities for user with limit returns and logic to add serach topic to topics array
$("body").on("click","button", function() {

        $('#gif-images').empty();

        let topic = $(this).attr('topic-data');

        let apiKey = "s5tGn3b5SPKQvgWraGDtSW615rjOQOq3";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        topic + "&api_key=" +apiKey + "&limit=5";

        $.ajax({
                url: queryURL,
                method: "GET"
                })
                .then(function(response) {

                let results = response.data;

                for(let i=0; i < results.length; i++) {

                        let topicImage = $("<img>");

                        topicImage.attr("class", "gif");

                        topicImage.attr("src", results[i].images.fixed_height_still.url);

                        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height.url);
                        topicImage.attr("data-state", "still");

                        $("#gif-images").prepend(topicImage);
                }

                });

});

//DONE: Add functionality to animate and un-animate gif
$("body").on("click", ".gif", function() {

        console.log("entering function");
        
        let state = $(this).attr("data-state");
      
        if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                } 
});

//TO DO: Add Submit Functionality.  When a user enters a search topic do ->
// TO DO 1. Perform quick input validation
// DONE: 2. Append search topic to 'topics' list and perform query - it might be necessary to pull the .ajax function out 
//    as a stand alone function to be called by the various other events in the script.

$(".search-button").on("click", function() {

        let newTopic = document.getElementById("search-topic").value;

        topics.push(newTopic);

        generateButton(newTopic);

});