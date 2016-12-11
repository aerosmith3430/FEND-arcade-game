// Enemy constructor function.  Takes in starting x, y coordinates, speed and image file.
// The variables defined in the function will be the starting attributes applied to all instances of this class.
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// This function updates the canvas at the interval specified in the dt parameter.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    if (this.x > 500) {
        this.x = 1;
    }
};

// The render function calls the drawImage function which renders the characters on the canvas.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor function.  Takes in starting x, y coordinates and image file.
// The variables defined in the function will be the starting attributes applied to the instance of this class.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// This function updates the canvas at the interval specified in the dt parameter.
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.collision();
    this.endGame()
};

// The render function calls the drawImage function which renders the characters on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function records the pressing of the arrow keys and translates it into player movement on the canvas.
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'up':
            if (this.y > -10) {
               this.y -= 30; 
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 30;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 30;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 30;
            }
            break;
    }    
};

// This function defines boxes around the enemies and the player and looks for collisions between the player and enemy boxes.  If it detects a collision, the player.reset function is called.
Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var playerCharacter = {x: this.x, y: this.y, width: 40, height: 40};
        var enemyCharacter = {x: allEnemies[i].x, y: allEnemies[i].y, width: 70, height: 40};
        if (playerCharacter.x < enemyCharacter.x + enemyCharacter.width && playerCharacter.x + playerCharacter.width > enemyCharacter.x && playerCharacter.y < enemyCharacter.y + enemyCharacter.height && playerCharacter.height + playerCharacter.y > enemyCharacter.y) {
            this.reset(200,400);
        }
    }
}

// This function calls the endText function when the top of the y axis is reached.
Player.prototype.endGame = function() {
    if(this.y < 0) {
        endText();
    }
}

// This function resets the player to the beginning point on the canvas.
Player.prototype.reset = function(x,y) {
    this.x = x;
    this.y = y;
}

// All instances of the Enemy class are contained in an array.
var allEnemies = [new Enemy(1, 65, 100), new Enemy(1, 145, 200), new Enemy(1, 225, 300)];
var player = new Player(200,400); // Instance of the Player class.

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This function displays text when the player reaches the water and wins the game.
var endText = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WIN!", 505 / 2, 40);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText("YOU WIN!", 505 / 2, 40);
};