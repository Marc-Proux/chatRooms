$(document).on('submit', '#change-username-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'settings/changeUsername',
        data: {
            old_username: $('#user').val(),
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