$(document).on('submit', '#change-username-form', function (e) {
    alert('change-username-form');
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'settings/changeUsername',
        data: {
            new_username: $('#new-username').val(),
            current_password: $('#current-password').val(),
        },
        success: function (data) {
            if (data.redirect){
                window.location.href = data.redirect;
            }
        $('#change-username-form').trigger('reset');
        },
    });
});