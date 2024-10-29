// script.js
document.getElementById('wall-button').addEventListener('click', function() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('wall-container').style.display = 'block';
});

let wallClicks = 0;
const maxClicks = 20;
const wallImage = document.getElementById('brick-wall');

wallImage.addEventListener('click', function(e) {
    wallClicks++;
    createCrack(e.pageX, e.pageY);

    // Reduce opacity gradually
    wallImage.style.opacity = 1 - (wallClicks / maxClicks * 0.9);

    if (wallClicks >= maxClicks) {
        wallImage.style.opacity = 0;
        alert('The wall has been completely broken down!');
    }
});


function createCrack(x, y) {
    const crack = document.createElement('div');
    crack.className = 'crack';
    crack.style.left = x + 'px';
    crack.style.top = y + 'px';
    document.getElementById('wall-container').appendChild(crack);
}
