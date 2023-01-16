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

$(document).ready(function() {
    $(".profile-options").hide();
    $(".profile-button").click(function() {
        $(".profile-options").toggle();
    })  
});

$(document).ready(function() {
    $(".show-rooms-button").click(function() {
        $(".Room-list").show();
        $(".show-rooms-button").hide();
        $(".user-list-button").hide();
        $(".add-room-button").show();
    })
});

$(document).ready(function() {
    var is_group = $("#room-type").val();
    if (is_group == "False" || is_group == "") {
        $("#Room-list").hide();
        $("#Friends-list").show();
    }
    else {
        $("#Room-list").show();
        $("#Friends-list").hide();
    }
    $(".group-chats-button").click(function() {
        $("#Room-list").show();
        $("#Friends-list").hide();
    })

    $(".friend-chats-button").click(function() {
        $("#Room-list").hide();
        $("#Friends-list").show();
    })
});

$(document).mouseup(function(e){
    var container = $("#add-room-form");
    var container2 = $(".add-user-form");
    var container3 = $(".Room-list");
    var container4 = $(".profile-options");
 
    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }

    if(!container2.is(e.target) && container2.has(e.target).length === 0){
        container2.hide();
    }

    if(window.innerWidth < 845 && !container3.is(e.target) && container3.has(e.target).length === 0){
        container3.hide();
        $(".add-room-button").hide();
        $(".show-rooms-button").show();
        $(".user-list-button").show();
    }

    if(!container4.is(e.target) && container4.has(e.target).length === 0){
        container4.hide();
    }
});

$(window).resize(function() {
    if (window.innerWidth > 845) {
        $(".Room-list").show();
        $(".add-room-button").show();
        $(".show-rooms-button").hide();
    }
    else {
        $(".Room-list").hide();
        $(".add-room-button").hide();
        $(".show-rooms-button").show();
    }
});

// update

var num_msg = 0;
var num_room = 0;
var num_user = 0;
var friends = 0;

function updateRoomList(){
    var room_id = $("#room_id").val();
    if (room_id == ""){
        $.ajax({
            type:'GET',
            url:'/updateRoomList/',
            dataType: 'json',
            success: function(data){
                if ((data.room_list).length != num_room) {
                    $("#Room-list").empty();
                    for (var key in data.room_list)
                    {
                        var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[key].id+'/">'+data.room_list[key].name+'</a></li>';
                        $("#Room-list").append(temp);
                    }
                        num_room = (data.room_list).length;
                }
                if ((data.private_list).length != friends) {
                    $("#Friends-list").empty();
                    for (var key in data.private_list)
                    {
                        var temp='<li class="Room-name"><a href="/chatrooms/'+data.private_list[key].id+'/">'+data.private_list[key].name+'</a></li>';
                        $("#Friends-list").append(temp);
                    }
                    friends = (data.private_list).length;
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
                if (data.redirect) {
                    window.location.href = '/chatrooms';
                }
                if ((data.private_list).length != friends) {
                    $("#Friends-list").empty();
                    if (user == 'System') {
                        for (var key in data.private_list)
                        {
                            if (data.room_list[key]==room_id) {
                                var temp='<li class="current-room" style="height: fit-content;"><a title="Salon actuel">'+data.room_list[key].name+'</a>';
                                $("#Friends-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[key].id+'/">'+data.room_list[key].name+'</a> </li>';
                                $("#Friends-list").append(temp);
                            }
                        }
                    }
                    else {
                        for (var key in data.private_list)
                        {
                            if (data.private_list[key].id==room_id) {
                                var temp='<div class="current-room-div"> <li class="current-room"><a title="Salon actuel">'+data.private_list[key].name+'</a> </li> <button type="button" class="leave-button" style="background-image: url(img/unfriend.png);" title="Quitter le salon" onclick="window.location.href=\'/unfriend/'+room_id+'\'">.</button> </div>';
                                $("#Friends-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.private_list[key].id+'/">'+data.private_list[key].name+'</a> </li>';
                                $("#Friends-list").append(temp);
                            }
                        }
                    }
                    friends = (data.private_list).length;
                }
                if ((data.room_list).length != num_room) {
                    $("#Room-list").empty();
                    if (user == 'System') {
                        for (var key in data.room_list)
                        {
                            if (data.room_list[key].id == room_id) {
                                var temp='<li class="current-room" style="height: fit-content;"><a title="Salon actuel">'+data.room_list[key].name+'</a>';
                                $("#Room-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[key].id+'/">'+data.room_list[key].name+'</a> </li>';
                                $("#Room-list").append(temp);
                            }
                        }
                    }
                    else {
                        for (var key in data.room_list)
                        {
                            if (data.room_list[key].id == room_id) {
                                var temp='<div class="current-room-div"> <li class="current-room"><a title="Salon actuel">'+data.room_list[key].name+'</a> </li> <button type="button" class="leave-button" title="Quitter le salon" onclick="window.location.href=\'/quitRoom/'+room_id+'\'">.</button> </div>';
                                $("#Room-list").append(temp);
                            }
                            else {
                                var temp='<li class="Room-name"><a href="/chatrooms/'+data.room_list[key].id+'/">'+data.room_list[key].name+'</a> </li>';
                                $("#Room-list").append(temp);
                            }
                        }
                    }
                    num_room = (data.room_list).length;
                }
                if ( (data.messages).length != num_msg) {
                    for (let i = num_msg; i < (data.messages).length; i++)
                    {
                        var date = new Date(data.messages[i].date);
                        date = date.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
                        var temp='<li class="user">'+data.messages[i].username+'</li><li class="message">'+data.messages[i].message+'</li><li class="date">'+date+'</li>';
                        $(".message-box").append(temp);
                    }
                    var elem = document.getElementById('messages-div');
                    elem.scrollTop = elem.scrollHeight;
                    num_msg = (data.messages).length;;
                }

                if ( (data.user_list).length != num_user) {
                    $(".user-list").empty();
                    if (data.owner == user) {
                        for (var key in data.user_list)
                        {
                            if (data.user_list[key].username == data.owner) {
                                var temp='<li class="admin-name-list">'+data.user_list[key].username+' | <span>Admin</span></li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[key].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[key].username+' | <a href="/deleteUser/'+room_id+'/'+data.user_list[key].username+'">Retirer</a> </li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }

                    else if ('System' == user) {
                        for (var key in data.user_list)
                        {
                            if (data.user_list[key].username == data.owner) {
                                var temp='<li class="user-name-list">'+data.user_list[key].username+' | <span>Admin </span><a href="/deleteUser/'+room_id+'/'+data.user_list[key].username+'">Retirer</a> </li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[key].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[key].username+' | <a href="/deleteUser/'+room_id+'/'+data.user_list[key].username+'">Retirer</a> </li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }

                    else {
                        for (var key in data.user_list)
                        {
                            if (data.user_list[key].username == data.owner) {
                                var temp='<li class="admin-name-list">'+data.user_list[key].username+' | <span>Admin</span></li>'
                                $(".user-list").append(temp);
                            }
                            else if (data.user_list[key].username != 'System') {
                                var temp='<li class="user-name-list">'+data.user_list[key].username+'</li>';
                                $(".user-list").append(temp);
                            }
                        }
                    }
                    num_user = (data.user_list).length;
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


// sendMessage
$(document).on('submit','#post-form',function(e){
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:'/sendMessage/',
      data:{
          value:$('.msg-txt-field').val(),
          room_id:$("#room_id").val(),
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
      },
        success: function(data){
            if (data.redirect){
                window.location.href = data.redirect;
            }
            else if (data.error){
                alert(data.error);
            }
        }
    });
    $('.msg-txt-field').val('');
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
            if (data.redirect){
                window.location.href = "/chatrooms/"+$("#room_id").val()+"/";
            }
            else {
                window.location.href = "/chatrooms/"+data.room_id+"/";
            }
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
        if (data.redirect){
            window.location.href = data.redirect;
        }
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
    document.querySelector('.msg-txt-field').value += emoji;
});