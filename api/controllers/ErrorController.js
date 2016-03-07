  module.exports = {
    /*inputs: location-Controller method where error occurred,
    response-message returned by the function where the error occurred,
    result-object currently worked within the function
    outputs:location-Controller method where error occurred,
     response-message returned by the function where the error occurred,
     result-object currently worked within the function, page-error page
     */
      errorPage: function(req, res) {
          var send = {},
              data = req.query;
          send.location = data.location;
          send.response = data.response;
          send.result = data.result;
          res.view('error', send);
      }
  };

