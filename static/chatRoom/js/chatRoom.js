// Show the forms
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").show();
    })
});

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".user-list-button").click(function() {
        $(".add-user-form").show();
    })  
});

$(document).ready(function() { // Liste d'amis
    $(".friends-list-form").hide();
    $(".friends-button").click(function() {
        $(".friends-list-form").show();
        $(".profile-options").hide();
    })  
});

$(document).ready(function() {
    $(".profile-options").hide();
    $(".profile-button").click(function() {
        $(".profile-options").show();
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

// Hide the forms

$(document).mouseup(function(e){
    var container = $("#add-room-form");
    var container2 = $(".add-user-form");
    var container3 = $(".Room-list");
    var container4 = $(".profile-options");
    var container5 = $(".friends-list-form");
 
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

    if(!container5.is(e.target) && container5.has(e.target).length === 0){
        container5.hide();
    }
});

// Show or Hide the friends in the room list

$(document).ready(function() {
    var is_group = $("#room-type").val();
    const unselected_style = {
        backgroundColor : "var(--background-color)",
        color : "var(--white)",
        border : "1px solid var(--white)"
    };

    const selected_style = {
        backgroundColor : "var(--accent-color)",
        color : "var(--background-color)",
        border : "1px solid var(--background-color)"
    };
    
    if (is_group == "False" || is_group == "") {
        $("#Room-list").hide();
        $("#Friends-list").show();
        Object.assign(document.getElementById("friend-chats-button").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , selected_style);
        Object.assign(document.getElementById("group-chats-button").style , unselected_style);
        Object.assign(document.getElementById("group-chats-button2").style , unselected_style);
    }
    else {
        $("#Room-list").show();
        $("#Friends-list").hide();
        Object.assign(document.getElementById("group-chats-button").style , selected_style);
        Object.assign(document.getElementById("group-chats-button2").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button").style , unselected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , unselected_style);
    }
    $("#group-chats-button").click(function() {
        $("#Room-list").show();
        $("#Friends-list").hide();
        Object.assign(document.getElementById("group-chats-button").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button").style , unselected_style);
        Object.assign(document.getElementById("group-chats-button2").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , unselected_style);
    })

    $("#friend-chats-button").click(function() {
        $("#Room-list").hide();
        $("#Friends-list").show();
        Object.assign(document.getElementById("friend-chats-button").style , selected_style);
        Object.assign(document.getElementById("group-chats-button").style , unselected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , selected_style);
        Object.assign(document.getElementById("group-chats-button2").style , unselected_style);
    })

    $("#group-chats-button2").click(function() {
        $("#Room-list").show();
        $("#Friends-list").hide();
        Object.assign(document.getElementById("group-chats-button").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button").style , unselected_style);
        Object.assign(document.getElementById("group-chats-button2").style , selected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , unselected_style);
    })

    $("#friend-chats-button2").click(function() {
        $("#Room-list").hide();
        $("#Friends-list").show();
        Object.assign(document.getElementById("friend-chats-button").style , selected_style);
        Object.assign(document.getElementById("group-chats-button").style , unselected_style);
        Object.assign(document.getElementById("friend-chats-button2").style , selected_style);
        Object.assign(document.getElementById("group-chats-button2").style , unselected_style);
    })
});

// Show or Hide friend requests

$(document).ready(function() {
    const unselected_style = {
        backgroundColor : "var(--background-color)",
        color : "var(--white)",
        border : "1px solid var(--white)"
    };

    const selected_style = {
        backgroundColor : "var(--accent-color)",
        color : "var(--background-color)",
        border : "1px solid var(--background-color)"
    };
    
    $("#request-list-div").hide();
    $("#friends-list-div").show();
    $("#add-friend-form").show();
    Object.assign(document.getElementById("show-friends-button").style , selected_style);
    Object.assign(document.getElementById("show-requests-button").style , unselected_style);

    $("#show-requests-button").click(function() {
        $("#request-list-div").show();
        $("#friends-list-div").hide();
        $("#add-friend-form").hide();
        Object.assign(document.getElementById("show-friends-button").style , unselected_style);
        Object.assign(document.getElementById("show-requests-button").style , selected_style);
    })

    $("#show-friends-button").click(function() {
        $("#request-list-div").hide();
        $("#friends-list-div").show();
        $("#add-friend-form").show();
        Object.assign(document.getElementById("show-friends-button").style , selected_style);
        Object.assign(document.getElementById("show-requests-button").style , unselected_style);
    })
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
var request = 0;

function update() {
    var room_id = $("#room_id").val();
    var user = $("#user").val();
    $.ajax({
        type:'GET',
        url:'/getUpdates/'+room_id+'/',
        dataType: 'json',
        success: function(data){
            if (data.redirect) {
                window.location.href = '/chatrooms';
            }
            if ((data.request_list).length != request) {
                $(".request-list").empty();
                for (var key in data.request_list)
                {
                    var temp='<li id="request-list" class="message" style="margin: 0; padding: 10px; text-align: left; font-size: 18px; position: relative;">'+data.request_list[key].name+'</li> <li style="margin-bottom: 30px;"><div style="position: absolute; right: 5%;"> <button type="button" class="sign-up-button" style="font-size= 10px; margin= 0; margin-right: 5px;" title="Accepter la demande" onclick="window.location.href=\'/acceptRequest/'+data.request_list[key].name+'\'">Accepter</button><button type="button" class="sign-in-button" style="font-size= 10px; margin-right: 0; marging-left: 5px;" title="Refuser la demande" onclick="window.location.href=\'/refuseRequest/'+data.request_list[key].name+'\'">Refuser</button> </div> </li>';
                    $(".request-list").append(temp);
                }
                request = (data.request_list).length;
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
                    $(".friend-list").empty();
                    for (var key in data.private_list)
                    {
                        if (data.private_list[key].id==room_id) {
                            var temp='<div class="current-room-div"> <li class="current-room"><a title="Salon actuel">'+data.private_list[key].name+'</a> </li> <button type="button" class="unfriend-button" title="Retirer de la liste d\'amis" onclick="window.location.href=\'/unfriend/'+data.private_list[key].name+'\'"></button> </div>';
                            $("#Friends-list").append(temp);
                        }
                        else {
                            var temp='<li class="Room-name"><a href="/chatrooms/'+data.private_list[key].id+'/">'+data.private_list[key].name+'</a> </li>';
                            $("#Friends-list").append(temp);
                        }
                        var temp='<li class="friend-name"> <div> <a title="Accéder à la discussion" href="/chatrooms/'+data.private_list[key].id+'/">'+data.private_list[key].name+' </a> <button type="button" class="unfriend-button" title="Retirer de la liste d\'amis" onclick="window.location.href=\'/unfriend/'+data.private_list[key].name+'\'"></button> </div> </li>';
                        $(".friends-list").append(temp);
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
                            var temp='<div class="current-room-div"> <li class="current-room"><a title="Salon actuel">'+data.room_list[key].name+'</a> </li> <button type="button" class="leave-button" title="Quitter le salon" onclick="window.location.href=\'/quitRoom/'+room_id+'\'"></button> </div>';
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

            if (room_id != "") {
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
            }
        },
        error : function(data) {
            console.log('Error', data);
        }
    });
    setTimeout(update, 1000);
};

$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    update();
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

// addUser to room
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

// sent friend request
$(document).on('submit','#add-friend-form',function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/friendRequest/',
        data:{
            friend_name:$('#friend-add-input').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function(data){
            if (data.redirect && data.redirect == 'sucess'){
                alert('Demande d\'ami envoyée');
            }
            else if (data.redirect) {
                window.location.href = data.redirect;
            }
        }
    });
    $('#friend-add-input').val('');
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