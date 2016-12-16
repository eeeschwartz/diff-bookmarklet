  $.ajax({
    url: $('link[rel="latest-version"').prop('href')
  }).done(function(data){
    var fullPageHTML = $.parseHTML(data);
    var $contentB = $(fullPageHTML).find('.lex-region-content article');
    $contentB.find('.workbench-moderation-entity-moderation-form').hide();

    html2canvas($('.lex-region-content article'), {
      onrendered: function(canvas) {
        var image1, image2;
        $('.lex-region-content article').html($contentB.html());
        image1 = canvas;
        html2canvas($('.lex-region-content article'), {
          onrendered: function(canvas) {
            image2 = canvas;
            c = imagediff.diff(image1, image2);
            var resultCanvas = imagediff.createCanvas();
            resultCanvas.width = image1.width;
            resultCanvas.height = image1.height;
            context = resultCanvas.getContext('2d');
            context.putImageData(c, 0, 0);
            $('.lex-region-content article').prepend(resultCanvas);
          }
        });
      }
    });
  });
