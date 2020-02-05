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
  
    $("#subscribeBtn").click(function () {
      var email = $('#subscribe-email');
      const validated = isEmail(email.val());
      if (validated === false) {
        $('#subscribe-email').addClass('error');
        $('#subscribe-email').removeClass('valid');
        $('.subscribe-email-label').css('display', 'inline-block');
        $('#subscribe-email').focus();
      }
      if (email.hasClass('valid'  )) {
        $("#subscribeBtn").addClass("submit-request");
        $("#subscribeBtn").addClass("loading-active");
        //fetch("https://spaceuptech.com/v1/site/subscribe", {
        fetch("http://localhost:4122/v1/site/subscribe", {
          method: 'POST',
          body: JSON.stringify({ email: email.val(), tags: ["newsletter"] }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(res => {
            if(res.status === 400){
            setTimeout(()=>{
              $("#subscribeBtn").removeClass("loading-active");
              $("#subscribeBtn").removeClass("loading-sucess");
            },3000)
          }else if (res.status !== 'subscribed') {
            setTimeout(()=>{
              M.toast({ html: 'Error subscribing to newsletter' });
              $("#subscribeBtn").addClass(" loading-error");
            },1500)
            setTimeout(()=>{
              $("#subscribeBtn").removeClass("loading-active");
              $("#subscribeBtn").removeClass("loading-error");
            },2000)
            return 
            }else{
              setTimeout(()=>{
              M.toast({ html: 'Subscribed to newsletter!' });
              $("#subscribeBtn").addClass(" loading-sucess");
            },1500)
            setTimeout(()=>{
              $("#subscribeBtn").removeClass("loading-active");
              $("#subscribeBtn").removeClass("loading-sucess");
            },3000)
          }
          })
          .catch(e => console.log('subscribe to newsletter:', e));
      }
    })
  });
  