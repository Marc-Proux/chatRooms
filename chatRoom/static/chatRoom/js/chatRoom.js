// Show/hide the forms
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })  
});

<<<<<<< HEAD
// updateMessages
function updateMessages(){
    var room_id = $("#room_id").val();
    console.log('Requesting messages');
    $.getJSON('/getMessages/'+room_id+'/', function(data){
        console.log('JSON', data);
        $(".message-box").empty();
        for (var key in data.messages)
        {
            var date = new Date(data.messages[key].date);
            date = date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
            var temp='<li class="user">'+data.messages[key].username+'</li><li class="message">'+data.messages[key].message+'</li><li class="date">'+date+'</li>';
            $(".message-box").append(temp);
        }
        setTimeout(updateMessages, 500);
    });
};
=======

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".user-list-button").click(function() {
        $(".add-user-form").toggle();
    })  
});
// getMessage
>>>>>>> bb4bbce58e44f43a108c9d89fe01cc70f71ea2f2

$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    updateMessages();
});


// sendMessage
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