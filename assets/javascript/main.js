// array of topics that will be called 
let topics = ["dogs", "cat", "eagle", "cheetah", "elephant"];

for (let i = 0; i < topics.length; i++) {

        let btn = $("<button>");

        btn.attr('topic-data', topics[i]);
        btn.attr('value', topics[i]);
        btn.html(topics[i]);

        $('#buttons').prepend(btn);
}

//To Do: Implement static images for initial setup -> activate gif on click logic
//To Do: Ratings <p> tag, and logic to only show appropriate gifs
//TO Do: Search capabilities for user with limit returns and logic to add serach topic to topics array

$('button').on('click', function() {

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

                console.log(response);

                let results = response.data;

                for(let i=0; i < results.length; i++) {

                        let gifDiv = $("<div>");

                        let topicImage = $("<img>");

                        topicImage.attr("src", results[i].images.fixed_height.url)

                        gifDiv.append(topicImage);

                        $("#gif-images").prepend(gifDiv);

                }

                });
});

