document
    .querySelector('.chest')
    .addEventListener('click', openChest);

function openChest() {
    var chest = this;

    if (this.classList.contains('chest--opened')) {
        return;
    }

    this.classList.add('chest--opened');

    for (var i = 1; i < 11; i++) {
        addRay.bind(chest)(i);
    }

    var t = setInterval(addParticle.bind(chest), 20);

    setTimeout(function() {
        clearInterval(t);
    }, 1000);
    setTimeout(runParticlesBackwards.bind(chest), 1800);
    setTimeout(function() {
        chest.classList.add('chest--finished');
    }, 1950);
    setTimeout(removeParticles.bind(chest), 3000);
}

function addRay(index){
    var div = document.createElement('div');

    div.classList.add('chest__card-ray',  'chest__card-ray--' + index);
    this.querySelector('.chest__card-rays')
        .appendChild(div);
}

function addParticle() {
    var div = document.createElement('div');

    div.classList.add('chest__card-particle');

    var rotate = parseInt(Math.random() * 350);
    var height = parseInt(Math.random() * 100 + 50);
    var x = parseInt(Math.cos((rotate - 90) * Math.PI / 180) * 400);
    var y = parseInt(Math.sin((rotate - 90) * Math.PI / 180) * 400);

    div.style.height = height + 'px';

    var transform = 'translate3d(' + x + 'px,' + y + 'px, 0) rotate(' + rotate + 'deg)'

    div.style.transform = transform;
    div.setAttribute('data-final-position', transform);

    this.querySelector('.chest__card-particles').appendChild(div);

    setTimeout(function(){
        div.style.transform = 'translate3d(0, 0, 0) rotate(' + rotate + 'deg)';
        div.style.opacity = 0;
    }, 50);
}

function runParticlesBackwards() {
    Array.prototype.slice
        .call(this.querySelectorAll('.chest__card-particle'))
        .forEach(function(div){
            var transform = div.getAttribute('data-final-position');

            div.style.transition = 'none';
            div.style.opacity = 1;

            setTimeout(function(){
                div.style.transition = 'transform .5s ease-in, opacity .3s .3s linear'
                div.style.transform = transform;
                div.style.opacity = 0;
            }, 10);
        });
}

function removeParticles() {
    this.querySelector('.chest__card-particles').innerHTML = '';
}

function closeChest(el) {
    el.classList.remove('chest--opened', 'chest--finished');
    el.querySelector('.chest__card-rays').innerHTML = '';
}