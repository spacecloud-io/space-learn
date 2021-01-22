function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
$(document).ready(function () {
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

  $("#subscribe-btn").click(function () {
    var email = $('#subscribe-email');
    const validated = isEmail(email.val());
    if (validated === false) {
      $('#subscribe-email').addClass('error');
      $('#subscribe-email').removeClass('valid');
      $('.subscribe-email-label').css('display', 'inline-block');
      $('#subscribe-email').focus();
    }
    if (email.hasClass('valid')) {
      $("#subscribe-btn").addClass("submit-request");
      $("#subscribe-btn").css({"cursor" : "not-allowed"});
      $("#loading").addClass("loading-active");
      fetch("https://api.spaceuptech.com/v1/site/subscribe", {
        method: 'POST',
        body: JSON.stringify({ email: email.val(), tags: ["newsletter"] }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          if(res.status === 400){
          setTimeout(()=>{
            $("#loading").removeClass("loading-active");
            M.toast({ html: 'Already subscribed to newsletter!' });
            $("#loading").addClass("loading-sucess");
          },1500)
          setTimeout(()=>{
            $("#loading").removeClass("loading-sucess");
            $("#subscribe-btn").css({"cursor" : ""});
          },3000)
        }else if (res.status === 'subscribed'){
          setTimeout(()=>{
          $("#loading").removeClass("loading-active");
          M.toast({ html: 'Subscribed to newsletter!' });
          $("#loading").addClass("loading-sucess");
        },1500)
        setTimeout(()=>{
          $("#loading").removeClass("loading-sucess");
          $("#subscribe-btn").css({"cursor" : ""});
        },3000)
        }else {
          setTimeout(()=>{
            $("#loading").removeClass("loading-active");
            M.toast({ html: 'Error subscribing to newsletter' });
            $("#loading").addClass(" loading-error");
          },1500)
          setTimeout(()=>{
            $("#loading").removeClass("loading-error");
            $("#subscribe-btn").css({"cursor" : ""});
          },2000) 
          }
        })
        .catch(e => {
          console.log('subscribe to newsletter:', e);
          setTimeout(()=>{
            $("#loading").removeClass("loading-active");
            M.toast({ html: 'Error subscribing to newsletter' });
            $("#loading").addClass(" loading-error");
          },1500)
          setTimeout(()=>{
            $("#loading").removeClass("loading-error");
            $("#subscribe-btn").css({"cursor" : ""});
          },2000) 
        });
    }
  })
});