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

// script.js
document.getElementById('photo-button').addEventListener('click', function() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('photo-option-container').style.display = 'block';
});

let selectedOption = '';

document.getElementById('love-button').addEventListener('click', function() {
    selectedOption = 'love';
    proceedWithPhoto();
});

document.getElementById('burn-button').addEventListener('click', function() {
    selectedOption = 'burn';
    proceedWithPhoto();
});

function proceedWithPhoto() {
    const fileInput = document.getElementById('photo-upload');
    if (fileInput.files && fileInput.files[0]) {
        displayPhoto(fileInput.files[0]);
    } else {
        alert('Please upload a photo first.');
    }
}

function displayPhoto(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('user-photo').src = e.target.result;
        document.getElementById('photo-option-container').style.display = 'none';
        document.getElementById('photo-container').style.display = 'block';

        if (selectedOption === 'love') {
            enableLoveEffect();
        } else if (selectedOption === 'burn') {
            enableBurnEffect();
        }
    };
    reader.readAsDataURL(file);
}
