// White and dark mode

function switch_mode() {
    var r = document.querySelector(':root');
    if ($("#theme").val() == 'light') {
        r.style.setProperty('--background-color', '#ECECEC');
        r.style.setProperty('--accent-color', '#02475E');
        r.style.setProperty('--white', '#4991A8');
        r.style.setProperty('--main-text-color', '#010522');

        r.style.setProperty('--emoji_icon', 'url(img/emoji_icon-white.png)');
        r.style.setProperty('--friends', 'url(img/friends-white.png)');
        r.style.setProperty('--list', 'url(img/list-white.png)');
        r.style.setProperty('--plus', 'url(img/plus-white.png)');
        r.style.setProperty('--send', 'url(img/send-white.png)');
        r.style.setProperty('--settings', 'url(img/settings-white.png)');
        r.style.setProperty('--unfriend', 'url(img/unfriend-white.png)');
        r.style.setProperty('--users', 'url(img/users-white.png)');
        r.style.setProperty('--trash-white', 'url(img/trash.png)');

        r.style.setProperty('--profile', 'url(img/profile-white.png)');
        r.style.setProperty('--profile-white', 'url(img/profile.png)');
        r.style.setProperty('--quit', 'url(img/quit-white.png)');
        r.style.setProperty('--quit-white', 'url(img/quit.png)');
        
        r.style.setProperty('--mode', 'url(img/day.png)');
    }
    else {
        r.style.setProperty('--background-color', 'rgb(32,31,37)');
        r.style.setProperty('--accent-color', 'rgb(253, 253, 153)');
        r.style.setProperty('--white', 'white');
        r.style.setProperty('--main-text-color', 'rgb(216, 216, 216)');

        r.style.setProperty('--emoji_icon', 'url(img/emoji_icon.png)');
        r.style.setProperty('--friends', 'url(img/friends.png)');
        r.style.setProperty('--list', 'url(img/list.png)');
        r.style.setProperty('--plus', 'url(img/plus.png)');
        r.style.setProperty('--send', 'url(img/send.png)');
        r.style.setProperty('--settings', 'url(img/settings.png)');
        r.style.setProperty('--unfriend', 'url(img/unfriend.png)');
        r.style.setProperty('--users', 'url(img/users.png)');
        r.style.setProperty('--trash-white', 'url(img/trash-white.png)');

        r.style.setProperty('--profile', 'url(img/profile.png)');
        r.style.setProperty('--profile-white', 'url(img/profile-white.png)');
        r.style.setProperty('--quit', 'url(img/quit.png)');
        r.style.setProperty('--quit-white', 'url(img/quit-white.png)');

        r.style.setProperty('--mode', 'url(img/night.png)');
    }
}

$(document).ready(function() {
    switch_mode();
    $(".change-mode-button").click(function() {
        switch_mode();
    })  
});