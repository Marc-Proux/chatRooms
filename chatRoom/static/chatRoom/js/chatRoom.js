// Show/hide the add room form
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })  
});

// getMessage

$(document).ready(function(){
    var room_id = $("#room_id").val();
    setInterval(function(){
        $.ajax({
            type: 'GET',
            url : "/getMessages/"+room_id+"/",
            success: function(response){
                console.log(response);
                $("#display").empty();
                for (var key in response.messages)
                {
                    var temp='<li class="user">'+response.messages[key].username+'</li><li class="message">'+response.messages[key].message+'</li><li class="date">'+response.messages[key].date+'</li>';
                    $(".message-box").append(temp);
                }
            },
            error: function(response){
                alert('room_id:')
                alert('An error occured')
            }
        });
    },1000);
});

$(document).on('submit','#post-form',function(e){
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:'/sendMessage/',
      data:{
          value:$('#msg-txt-field').val(),
          room_id:$("#room_id").val(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
      },
      success: function(data){
         //alert(data)
      }
    });
    $('#msg-txt-field').val('');
  });