function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).ready(function () {
  var api = new Space.API("space-cloud", "https://api.spaceuptech.com");

  $('#subscribe-email').on('input', function () {
    var email = $('#subscribe-email');
    const validated = isEmail(email.val());
    if (validated === true) {
      $('#subscribe-email').addClass('valid');
      $('#subscribe-email').removeClass('error');
      $('.subscribe-email-label').css('display', 'none');
    } else if (validated === false) {
      $('#subscribe-email').addClass('error');
      $('#subscribe-email').removeClass('valid');
      $('.subscribe-email-label').css('display', 'inline-block');
    }
  })

  $("#subscribeBtn").click(function () {
    var email = $('#subscribe-email');
    const validated = isEmail(email.val());
    if (validated === false) {
      $('#subscribe-email').addClass('error');
      $('#subscribe-email').removeClass('valid');
      $('.subscribe-email-label').css('display', 'inline-block');
      $('#subscribe-email').focus();
    }
    if (email.hasClass('valid')) {
      $("#subscribeBtn").addClass("submit-request");
      api.call("space-site", "newsletter-subscription", { email: email.val() }).then(res => {
        if (res.status !== 200 || !res.data.result.ack) {
          M.toast({html: 'Error subscribing to newsletter'});
          return
        }
        M.toast({html: 'Subscribed to newsletter!'});
      })
    }
  })
});