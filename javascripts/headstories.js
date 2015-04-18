// retina images
$(document).ready(function(){
  $("[srcset]").srcset({
    ajax: false
  });
});

//-------------

// lookbook animations

$(document).ready(function(){
  $('.lookbook-grid-item').css("display", "none");
});

$(window).load(function(){
  $('.lookbook-grid-item').css("display", "block");
  $('.lookbook-grid-item').addClass('animated fadeIn');
});


//-------------


// load instagram images
// $(document).ready(function(){
//   $('.instagram').on('willLoadInstagram', function(event, options) {
//     console.log(options);
//   });
//   $('.instagram').on('didLoadInstagram', function(event, response) {
//     console.log(response);
//   });
//   $('.instagram').instagram({
//     userId: 1600662282,
//     // hash: 'love',
//     clientId: '9651c5b41b724e4c9f6fdb6625d11dcb'
//   });
// });


// contact form


$(document).ready(function(){
  $form = $("#contact_form");

  $form.submit(function(){
    pre_name = "andre";
    sur_name = "zimpel";
    email = "andrezimpel@me.com";
    message = "hihi :)";

    email_content = "Name: " + pre_name + " " + sur_name + "<br>" + "Email: " + email + "<br>" + "Nachricht:<br>" + message;

    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        "key": 'VO84ZJ2jRI3oIScUyssW0g',
        "message": {
          "from_email": "website@headstories.de",
          "to": [{
                "email": "hello@headstories.de",
                "name": "head stories",
                "type": "to"
              }
        ],
        "autotext": true,
        "subject": "Neue Nachricht",
        "html": email_content
        }
      }
    }).done(function(response) {
      console.log(response); // if you're into that sorta thing
    });
    return false;
  });
});


//-------------

// active links

$(document).ready(function(){
  $(".navbar-nav a, .subnavigation a").each(function(){
    $this = $(this);
    activable = $this.data("active");

    if (activable != false) {
      href = $this.attr("href");
      base_url = window.location.protocol + "//" + window.location.host + "/";
      target_url = window.location.protocol + "//" + window.location.host + href;
      current_url = document.URL;

      // mark actual item
      if (current_url == target_url) {
        $this.toggleClass("active");
        $this.parent().toggleClass("active");
      }

      // mark navbar items as well
      possbile_navbar_anchor = document.URL.replace(base_url, "");
      possbile_navbar_anchor = possbile_navbar_anchor.split("/");
      possbile_navbar_anchor_href = base_url + possbile_navbar_anchor[0] + '/' + possbile_navbar_anchor[1] + ".html";

      $(".navbar-nav a").each(function(){
        var href = $(this).attr("href");
        var target_url = window.location.protocol + "//" + window.location.host + href;

        if (possbile_navbar_anchor_href == target_url) {
          $(this).addClass("active");
          $(this).parent().addClass("active");
        }
      });
    }
  });
});


//-------------


$(document).ready(function(){

  // highlight current language
  var $language_switch = $("#language-switch");
  var lang = $("body").attr("data-language");
  var $active_language_anchor = $language_switch.find("." + lang);

  $active_language_anchor.addClass("active");

  // just change the language, not the whole path
  var $language_switchs = $("#language-switch a");

  $language_switchs.click(function(e) {
    // e.preventDefault();
    //
    // var that = $(this);
    // var current_uri = window.location.pathname;
    // var target_language = $(that).attr("data-language");
    // var current_language = $("body").attr("data-language");
    //
    // if (current_language != target_language) {
    //   console.log(current_uri);
    //   console.log(target_language);
    //   console.log(this);
    //
    //   var target_uri = current_uri.replace(current_language, target_language);
    //
    //   console.log(target_uri);
    // }
  });
});
