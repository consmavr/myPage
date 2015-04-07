'use strict';

$(function(){
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  var orderTemplate = ""+
  "<li>"+
  "<p><strong>Name:</strong> {{name}}</p>"+
  "<p><strong> Drink:</strong> {{drink}}</p>"+
  "<button data-id='{{id}}' class='remove'>X</button>"+
  "</li>";

  function addOrder(order){
    $orders.append(Mustache.render(orderTemplate, order));

  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/johnbob/friends',
    success: function(orders){
      $.each(orders, function(i, order){
        addOrder(order);
      });
    },
    error: function(){
      alert('error loading orders');
    }

  });

  $('#add-order').on('click', function(){
      var order = {
        name: $name.val(),
        drink: $drink.val(),
      };

      $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/johnbob/friends',
        data: order,
        success: function(newOrder){
          addOrder(newOrder);
        },
        error: function(){
          alert('error saving order');
        }
      });

  });

  $orders.delegate('.remove', 'click',function(){
    var $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/johnbob/friends' + $(this).attr('data-id'),
      success: function(){
        $li.remove();
      }
    });
  });
});

/* $(function(){
    var width = 720;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find(".slide");

    var interval;

    function startSlider(){
        interval = setInterval(function(){
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed,function(){
                currentSlide++;
                if(currentSlide == $slides.length){
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });


        }, pause);
    }

    function stopSlider(){
        clearInterval(interval);
    }

    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

    //startSlider();
}); */
