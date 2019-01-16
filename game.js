'use strict';

const buttons = ['red', 'blue', 'green', 'yellow'],
gamePattern = [],
userPattern = [];
let level = 0;

const generatePattern = () => gamePattern.push(buttons[Math.floor(Math.random() * 4)]),

blink = (e) => {
    setTimeout(() => e.style.opacity = 0, 100);
    setTimeout(() => e.style.opacity = 1, 200);
},

flash = (e) => {
    e.classList.add('pressed');
    setTimeout(() => e.classList.remove('pressed'), 100);
},

ding = (name) => new Audio(`sounds/${name}.mp3`).play(),

check = (i) => {
    if(userPattern[i] === gamePattern[i]) {
        if(i === gamePattern.length - 1) setTimeout(nextSequence, 1000);
    } else {
        ding('wrong');
        document.getElementById('level-title').textContent = 'Game Over, Press Any Key to Restart';
        level = 0;
        gamePattern.length = 0;
        document.body.classList.add('game-over');
        setTimeout(() => document.body.classList.remove('game-over'), 200);
    }
},

nextSequence = () => {
    level++;
    userPattern.length = 0;
    document.getElementById('level-title').textContent = `Level ${level}`;
    generatePattern();
    blink(document.getElementById(gamePattern[gamePattern.length - 1]));
    ding(gamePattern[gamePattern.length - 1]);
};

document.querySelector('.container').addEventListener('click', e => {
    if(!buttons.includes(e.target.id) || !level) return;
    userPattern.push(e.target.id);
    flash(e.target);
    ding(e.target.id);
    check(userPattern.length - 1);
});

document.addEventListener('keyup', () => {
    if(!level) nextSequence();
});
