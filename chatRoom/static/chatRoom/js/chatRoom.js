// Show/hide the forms
$(document).ready(function(e) {
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

$(document).ready(function(e) {
    $(".show-rooms-button").click(function() {
        $(".Room-list").show();
        $(".add-room-button").show();
    })
});

$(document).mouseup(function(e){
    var container = $("#add-room-form");
    var container2 = $(".add-user-form");
    var container3 = $(".Room-list");
 
    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }

    if(!container2.is(e.target) && container2.has(e.target).length === 0){
        container2.hide();
    }

    if(window.innerWidth < 800 && !container3.is(e.target) && container3.has(e.target).length === 0){
        container3.hide();
        $(".add-room-button").hide();
    }
});

$(window).resize(function() {
    if (window.innerWidth > 800) {
        $(".Room-list").show();
        $(".add-room-button").show();
    }
    else {
        $(".Room-list").hide();
        $(".add-room-button").hide();
    }
});

// update

var num_msg = 0;
var new_num = 0;

function updateRoomList(){
    var room_id = $("#room_id").val();
    if (room_id == ""){
        $.ajax({
            type:'GET',
            url:'/updateRoomList/',
            success: function(data){
                $(".Room-list").empty();
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
            },
            error : function(data) {
                console.log('Error', data);
            }
        });
    }
    setTimeout(updateRoomList, 1000);
};

function update(){
    var room_id = $("#room_id").val();
    var user = $("#user").val();
    if (room_id != ""){
        $.ajax({
            type:'GET',
            url:'/getUpdates/'+room_id+'/',
            success: function(data){
                if ( (data.messages).length != num_msg) {
                    console.log("update");
                    //new_num = (data.messages).length;    
                    if (user == 'System') {
                        for (let i = num_msg; i < (data.room_list).length; i++)
                        {
                            if (data.room_list[i].id == room_id) {
                                var temp='<li class="current-room"><a title="Salon actuel">'+data.room_list[i].name+'</a>';
                                $(".Room-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[i].id+'/">'+data.room_list[i].name+'</a> </li>';
                                $(".Room-list").append(temp);
                            }
                        }
                    }
                    else {
                        for (let i = num_msg; i < (data.room_list).length; i++)
                        {
                            if (data.room_list[i].id == room_id) {
                                var temp='<div class="current-room-div"> <li class="current-room"><a title="Salon actuel">'+data.room_list[i].name+'</a> </li> <button type="button" class="leave-button" title="Quitter le salon" onclick="window.location.href=\'/quitRoom/'+room_id+'\'"></button> </div>';
                                $(".Room-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[i].id+'/">'+data.room_list[i].name+'</a> </li>';
                                $(".Room-list").append(temp);
                            }
                        }
                    }
                    for (let i = num_msg; i < (data.messages).length; i++)
                    {
                        var date = new Date(data.messages[i].date);
                        date = date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
                        var temp='<li class="user">'+data.messages[i].username+'</li><li class="message">'+data.messages[i].message+'</li><li class="date">'+date+'</li>';
                        $(".message-box").append(temp);
                    }

                    if (data.owner == user) {
                        for (let i = num_msg; i < (data.user_list).length; i++)
                        {
                            if (data.user_list[i].username == data.owner) {
                                var temp='<li class="admin-name-list">'+data.user_list[i].username+' | <span>Admin</span></li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[i].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[i].username+' | <a href="/deleteUser/'+room_id+'/'+data.user_list[i].username+'">Retirer</a> </li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }

                    else if ('System' == user) {
                        for (let i = num_msg; i < (data.user_list).length; i++)
                        {
                            if (data.user_list[i].username == data.owner) {
                                var temp='<li class="user-name-list">'+data.user_list[i].username+' | <span>Admin </span><a href="/deleteUser/'+room_id+'/'+data.user_list[i].username+'">Retirer</a> </li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[i].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[i].username+' | <a href="/deleteUser/'+room_id+'/'+data.user_list[i].username+'">Retirer</a> </li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }

                    else {
                        for (let i = num_msg; i < (data.user_list).length; i++)
                        {
                            if (data.user_list[i].username == data.owner) {
                                var temp='<li class="admin-name-list">'+data.user_list[i].username+' | <span>Admin</span></li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[i].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[i].username+'</li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }
                    new_num = (data.messages).length;
                    var elem = document.getElementById('messages-div');
                    elem.scrollTop = elem.scrollHeight;
                    num_msg = new_num;
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
    updateRoomList();
});


// window.setInterval(function() {
//     if ( new_num != num_msg) {
//         var elem = document.getElementById('messages-div');
//         elem.scrollTop = elem.scrollHeight;
//         num_msg = new_num;
//     }
// }, 500);


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

// createRoom
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
            window.location.href = "/chatrooms/"+data.room_id+"/";
        }
    });
    $('#room-add-input').val('');
});

// addUser
$(document).on('submit','#add-user-form',function(e){
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:'/addUser/',
      data:{
          user_name:$('#user-add-input').val(),
          room_id:$("#room_id").val(),
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
      },
      success: function(data){
        //alert(data)
      }
    });
    $('#user-add-input').val('');
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