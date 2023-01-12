// Show/hide the forms
$(document).ready(function(e) {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })
});

$(document).mouseup(function(e){
    var container = $("#add-room-form");
    var container2 = $(".add-user-form");
 
    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }

    if(!container2.is(e.target) && container2.has(e.target).length === 0){
        container2.hide();
    }
});

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".user-list-button").click(function() {
        $(".add-user-form").toggle();
    })  
});

// update

var num_msg = 0;
var new_num = 0;

function update(){
    var room_id = $("#room_id").val();
    var user = $("#user").val();
    var owner = $("#owner").val();
    console.log("room_id: ", room_id)
    if (room_id != ""){
        $.ajax({
            type:'GET',
            url:'/getUpdates/'+room_id+'/',
            success: function(data){
                console.log('JSON', data);
                if ( (data.messages).length != num_msg) {
                    new_num = (data.messages).length;    
                }
                $(".message-box").empty();
                $(".Room-list").empty();
                $(".user-list").empty();
                for (var key in data.messages)
                {
                    var date = new Date(data.messages[key].date);
                    date = date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
                    var temp='<li class="user">'+data.messages[key].username+'</li><li class="message">'+data.messages[key].message+'</li><li class="date">'+date+'</li>';
                    $(".message-box").append(temp);
                }
                for (var key in data.room_list)
                {
                    if (data.room_list[key].id == room_id) {
                        var temp='<li class="current-room"><a>'+data.room_list[key].name+'</a></li>';
                        $(".Room-list").append(temp);
                    }
                    else {
                        var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[key].id+'/">'+data.room_list[key].name+'</a></li>';
                        $(".Room-list").append(temp);
                    }
                }
                if (owner == user) {
                    for (var key in data.user_list)
                    {
                        if (data.user_list[key].username == owner) {
                            var temp='<li class="Room-name">'+data.user_list[key].username+' | Admin</li>'
                            $(".user-list").append(temp);
                        }
                        else if (data.user_list[key].username != 'System') {
                            var temp='<li class="Room-name">'+data.user_list[key].username+' <a href="/deleteUser/'+room_id+'/'+data.user_list[key].username+'">supprimer</a></li>';
                            $(".user-list").append(temp);
                        }
                    }
                }
                else {
                    for (var key in data.user_list)
                    {
                        if (data.user_list[key].username == owner) {
                            var temp='<li class="Room-name">'+data.user_list[key].username+' | Admin</li>'
                            $(".user-list").append(temp);
                        }
                        else if (data.user_list[key].username != 'System') {
                            var temp='<li class="Room-name">'+data.user_list[key].username+'</li>';
                            $(".user-list").append(temp);
                        }
                    }
                }
            },
            error : function(data) {
                console.log('Error', data);
            }
        });
    }
    setTimeout(update, 1000);
};

$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    update();
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
      success: function(response){
        window.location.href = '/chatrooms/'+response.room_id+'/';
      }
    });
    $('#enter-room-name').val('');
});