$(function() {
  var count = 0;
  $('#testForm').submit(function(e) {
    $.ajax({
      url: '/api/stock-prices',
      type: 'get',
      data: $('#testForm').serialize(),
      success: function(data) {
        count++;
        console.log('success test');
        $('#jsonResult').text(JSON.stringify(data));
      }
    });
    console.log('client test');
    e.preventDefault();
  });
  $('#testForm2').submit(function(e) {
    $.ajax({
      url: '/api/stock-prices',
      type: 'get',
      data: $('#testForm2').serialize(),
      success: function(data) {
        $('#jsonResult').text(JSON.stringify(data));
      }
    });
    e.preventDefault();
  });
});

