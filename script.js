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

function enableLoveEffect() {
    const photo = document.getElementById('user-photo');
    photo.addEventListener('click', function(e) {
        createHeartOrKiss(e.pageX, e.pageY);
    });
}

function createHeartOrKiss(x, y) {
    const images = ['images/heart.png', 'images/kiss.png'];
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.className = 'love-effect';
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    document.getElementById('photo-container').appendChild(img);

    // Remove the image after animation
    setTimeout(() => {
        img.remove();
    }, 2000);
}

//burn effect 
let burnClicks = 0;
const maxBurnClicks = 20;

function enableBurnEffect() {
    const photo = document.getElementById('user-photo');
    photo.addEventListener('click', function(e) {
        burnClicks++;
        createBurnMark(e.pageX, e.pageY);

        if (burnClicks >= maxBurnClicks) {
            burnPhoto();
        }
    });
}

function createBurnMark(x, y) {
    const burn = document.createElement('img');
    burn.src = 'images/burn_mark.png';
    burn.className = 'burn-effect';
    burn.style.left = x + 'px';
    burn.style.top = y + 'px';
    document.getElementById('photo-container').appendChild(burn);
}

function burnPhoto() {
    const photo = document.getElementById('user-photo');
    photo.style.transition = 'opacity 2s';
    photo.style.opacity = 0;
    alert('The photo has been completely burned!');
}
