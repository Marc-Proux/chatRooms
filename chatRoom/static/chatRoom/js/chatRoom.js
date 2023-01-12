// Show/hide the forms
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })  
});

// updateMessages
function scrollBottom(element) {
    element.scrollTop = element.scrollHeight;
}

var num_msg = 0;
var new_num = 0;

function updateMessages(){
    var room_id = $("#room_id").val();
<<<<<<< HEAD
    if (room_id != ""){
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
        });
    }
    setTimeout(updateMessages, 500);
=======
    var elem = document.getElementById('messages-div'); 
    console.log('Requesting messages');
    $.getJSON('/getMessages/'+room_id+'/', function(data){
        console.log('JSON', data);
        if ( (data.messages).length != num_msg) {
            new_num = (data.messages).length;    
        }
        $(".message-box").empty();
        for (var key in data.messages)
        {
            var date = new Date(data.messages[key].date);
            date = date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
            var temp='<li class="user">'+data.messages[key].username+'</li><li class="message">'+data.messages[key].message+'</li><li class="date">'+date+'</li>';
            $(".message-box").append(temp);
        }
        setTimeout(updateMessages, 100);
    });
>>>>>>> b97855911dff0cacfc6225e2cb4808aeddfde826
};

window.setInterval(function() {
    if ( new_num != num_msg) {
        var elem = document.getElementById('messages-div');
        elem.scrollTop = elem.scrollHeight;
        num_msg = new_num;
    }
}, 30);

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".user-list-button").click(function() {
        $(".add-user-form").toggle();
    })  
});
// getMessage

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