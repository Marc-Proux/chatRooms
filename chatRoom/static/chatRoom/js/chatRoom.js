// Show/hide the add room form
$(document).ready(function() {
    $("#add-room-form").hide();
    $(".add-room-button").click(function() {
        $("#add-room-form").toggle();
    })  
});

// getMessage
/*
$(document).ready(function(){
    setInterval(function(){
        $.ajax({
            type: 'GET',
            url : "/getMessages/{{room.id}}/",
            success: function(response){
                console.log(response);
                $("#display").empty();
                for (var key in response.messages)
                {
                    var temp="<div class='container darker'><b>"+response.messages[key].user+"</b><p>"+response.messages[key].value+"</p><span class='time-left'>"+response.messages[key].date+"</span></div>";
                    $("#display").append(temp);
                }
            },
            error: function(response){
                alert('An error occured')
            }
        });
    },1000);
    })*/