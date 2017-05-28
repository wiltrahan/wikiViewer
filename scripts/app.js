var model = {
  wikiRandom: [],
  wikiArticles: []
};

var $wikiList = $('#wikipedia-links');

function getWiki(query, callback) {


  if(query.length < 1) {
      $wikiList.text("Please try again and actually search for something this time.");
      return;
  }

  $wikiList.text("");
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + query + '&format=json'

  $.ajax({
      url: wikiUrl,
      search: query,
      dataType: 'jsonp',
      success : function(response) {
        model.wikiArticles = response;
        console.log(model.wikiArticles);
        callback();
      },
      error : function(err) {
        console.log("Something went wrong.");
        alert("Please Try Again.")
        throw err;
      }
  });
};

function render() {
  var title, description, url;


  if(model.wikiArticles[1].length === 0) {
    $wikiList.text("Please try again, we didn't find shit.");
      return;
  }

  for(var i = 0; i < model.wikiArticles[1].length; i++) {
      title = model.wikiArticles[1][i];
      description = model.wikiArticles[2][i];

      url = 'http://en.wikipedia.org/wiki/' + title;


      $wikiList.append('<li><a href="' + url + '">' + title + '</a>' + "<BR>" + description + '</li>');
    };

};
