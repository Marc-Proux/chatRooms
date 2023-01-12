// Show/hide the forms
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })  
});

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".user-list-button").click(function() {
        $(".add-user-form").toggle();
    })  
});

// updateMessages

var num_msg = 0;
var new_num = 0;

function updateMessages(){
    var room_id = $("#room_id").val();
    console.log("room_id: ", room_id)
    if (room_id != ""){
        $.ajax({
            type:'GET',
            url:'/getMessages/'+room_id+'/',
            success: function(data){
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
            },
            error : function(data) {
                console.log('Error', data);
            }
        });
    }
    setTimeout(updateMessages, 1000);
};

$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    updateMessages();
});


window.setInterval(function() {
    if ( new_num != num_msg) {
        var elem = document.getElementById('messages-div');
        elem.scrollTop = elem.scrollHeight;
        num_msg = new_num;
    }
}, 500);


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

// addRoom
$(document).on('submit','#add-room-form',function(e){
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:'/addRoom/',
      data:{
          room_name:$('#enter-room-name').val(),
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
      },
      success: function(data){
        window.location('/chatrooms/'+data.room_id+'/')
      }
    });
    $('#enter-room-name').val('');
});

// emoji button

const picker = new EmojiButton( {
    position: 'top-start',
    autoHide: false,
    theme:'dark',
});

$(document).ready(function() {
    $("#emoji-button").click(function() {
        picker.togglePicker(document.querySelector('#emoji-button'));
    })  
});

picker.on('emoji', emoji => {
    document.querySelector('#msg-txt-field').value += emoji;
});