
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
//return the data first to see what's in the object to reference to (i.e. the thumbnail image of the video to display)

function getDataFromApi(searchTerm, callback) {
//retrieve data based on what you searched for
  const query = {
  q: `${searchTerm} in:name`, //star trek discovery episode review
  maxResults: 5,
  type: 'video',
  part: 'snippet',
  key: 'AIzaSyBesu0BNRelJsHk1k62KTugc1CJGtPFH8I',
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function displayResultsToPage(data) {
  //display returned search results to HTML page & link to each video
  const results = []; //use data.map(renderResult) is img template
  const totalVids = data.pageInfo.resultsPerPage; //number of search results
  
  for (i = 0; i < data.items.length; i++) {
    
    const thumbnailPic = data.items[i].snippet.thumbnails.medium.url;
    const videoLink = data.items[i].id.videoId;
    
    results.push(`<a href="https://www.youtube.com/watch?v=${videoLink}" target="_blank"><img src="${thumbnailPic}" alt="thumbnail"></a>`);
  }
  console.log(data); //show JSON data

  $(".js-search-results").html(results);
  $("h2").html(`Results: ${totalVids}`);
}

function beginSearch() {
  //Once form submitted, start this whole program.
  $(".js-search-form").submit(function(event) {
    event.preventDefault();
    const target = $(this).find(".js-query");
    const targetVal = target.val();
    target.val(''); //to clear out input box after search
    getDataFromApi(targetVal, displayResultsToPage); //targetVal needs to match const
  });
  
}

$(beginSearch);