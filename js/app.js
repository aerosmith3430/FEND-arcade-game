// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    if (this.x > 500) {
        this.x = 1;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    this.collision();
    this.endGame()
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var playerCharacter = {x: this.x, y: this.y, width: 40, height: 40};
        var enemyCharacter = {x: allEnemies[i].x, y: allEnemies[i].y, width: 70, height: 40};
        if (playerCharacter.x < enemyCharacter.x + enemyCharacter.width && playerCharacter.x + playerCharacter.width > enemyCharacter.x && playerCharacter.y < enemyCharacter.y + enemyCharacter.height && playerCharacter.height + playerCharacter.y > enemyCharacter.y) {
            this.reset(200,400);
        }
    }
}

Player.prototype.endGame = function() {
    if(this.y < 0) {
        endText();
    }
}

Player.prototype.reset = function(x,y) {
    this.x = x;
    this.y = y;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(1, 65, 100), new Enemy(1, 145, 200), new Enemy(1, 225, 300)];
var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var endText = function() {
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("YOU WIN!", 505 / 2, 40);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeText("YOU WIN!", 505 / 2, 40);
};