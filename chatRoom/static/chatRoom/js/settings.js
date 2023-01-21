$(document).on('submit', '#change-username-form-big', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'settings/changeUsername',
        data: {
            old_username: $('#old-username-big').val(),
            new_username: $('#new-username-big').val(),
            current_password: $('#password-big').val(),
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

$(document).on('submit', '#change-username-form-small', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'settings/changeUsername',
        data: {
            old_username: $('#old-username-small').val(),
            new_username: $('#new-username-small').val(),
            current_password: $('#password-small').val(),
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

$(document).on('submit', '#change-password-form-big', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/changePassword',
        data: {
            old_password: $('#current-password-big').val(),
            new_password1: $('#new-password-big').val(),
            new_password2: $('#confirm-new-password-big').val(),
            csrfmiddlewaretoken: csrftoken,
        },
        success: function (data) {
            if (data.redirect){
                window.location.href = data.redirect;
            }
        $('#change-password-form').trigger('reset');
        },
    });
});

$(document).on('submit', '#change-password-form-small', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/changePassword',
        data: {
            old_password: $('#current-password-small').val(),
            new_password1: $('#new-password-small').val(),
            new_password2: $('#confirm-new-password-small').val(),
            csrfmiddlewaretoken: csrftoken,
        },
        success: function (data) {
            if (data.redirect){
                window.location.href = data.redirect;
            }
        $('#change-password-form').trigger('reset');
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
    var container2 = $(".contact-div");
 
    // If the target of the click isn't the container
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }

    if(!container2.is(e.target) && container2.has(e.target).length === 0){
        container2.hide();
    }
});

$(document).ready(function() {
    $(".contact-div").hide();
    $(".contact").click(function() {
        $(".contact-div").show();
    })
});