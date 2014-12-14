$(document).ready(function(){
  $('[data-hires]').sharpness({
    browsers: ['msie8', 'msie9']
  });
});

$(window).load(function(){

  window.delay = 350;

  start_animation();

  $("#replay").click(replay);
});

function start_animation() {
  container = $("#welcome");
  item = container.find(".item:first-child");

  container.removeClass("faded");

  next_slide(false, container);
}

function next_slide(element, container) {
  $items = container.find(".item");
  var delay = window.delay;

  if (element == false) {
    $new_element = $items.first();
  } else {
    $new_element = element.next();
  }

  if($new_element.hasClass("item-final")) {
    console.log("fin");
    $items.removeClass("active");
    prepare_fin(container);
    return;
  }

  $items.removeClass("active");

  $new_element.addClass("active");

  // delay
  if($new_element.data("delay") != undefined) {
    delay = $new_element.data("delay");
  }

  setTimeout(function(){
    next_slide($new_element, container);
  }, delay);
}

function prepare_fin(container) {
  setTimeout(function(){
    $(".item-final").addClass("active-final");
    $(".footer").removeClass("faded");
  }, 1500);
}


function replay() {
  setTimeout(function(){
    $(".item-final").removeClass("active-final");
    $(".footer").addClass("faded");
  }, 1000);

  start_animation();
}
