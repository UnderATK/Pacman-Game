var fired = false;
addEventListener("keydown", function(e){
    if (!fired){
        fired = true;
        document.getElementById('pacman_beginning').play();
    }
});
addEventListener("keyup", function(e){
    fired = false;
});