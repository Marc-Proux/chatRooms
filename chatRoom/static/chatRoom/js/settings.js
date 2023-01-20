$(document).on('submit', '#change-username-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'settings/changeUsername',
        data: {
            old_username: $('#old-username').val(),
            new_username: $('#new-username').val(),
            current_password: $('#password').val(),
            csrfmiddlewaretoken: csrftoken,
        },
        success: function (data) {
            if (data.redirect){
                window.location.href = data.redirect;
            }
        $('#change-username-form').trigger('reset');
        },
    });
});

$(document).ready(function() {
    $(".add-user-form").hide();
    $(".delete-account-button").click(function() {
        $(".add-user-form").show();
    }) 
    $("#Non").click(function() {
        $(".add-user-form").hide();
    })  
});

$(document).mouseup(function(e){
    var container = $(".add-user-form");
 
    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
});