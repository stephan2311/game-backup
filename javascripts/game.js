class Game {
    constructor() {
        this.waterArr = [];
        this.maltArr = [];
        this.hopsArr = [];
        this.timer = 0;
        this.refreshRate = 1000 / 60; // 60 frames per second
        this.obstacleFreq = 80;
    }

    start() {
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);

        this.addEventListeners();

        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 500) === 0) {
                const water = new Obstacle();
                const malt = new Obstacle();
                const hops = new Obstacle();
                this.waterArr.push(water);
                this.maltArr.push(malt);
                this.hopsArr.push(hops);
                water.domElement = this.createDomElm(water);
                this.drawDomElm(water);
                malt.domElement = this.createDomElm(malt);
                this.drawDomElm(malt);
                hops.domElement = this.createDomElm(hops);
                this.drawDomElm(hops);
            }

            this.waterArr.forEach((water) => {
                water.moveDown();
                this.drawDomElm(water);
                this.detectCollisionWithPlayer(water);
            });

            this.maltArr.forEach((malt) => {
                malt.moveDown();
                this.drawDomElm(malt);
                this.detectCollisionWithPlayer(malt);
            });

            this.hopsArr.forEach((hops) => {
                hops.moveDown();
                this.drawDomElm(hops);
                this.detectCollisionWithPlayer(hops);
            });
        }, this.refreshRate);
    }


    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
            this.drawDomElm(this.player);
        });
    }

    createDomElm(instance) {
        const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
        htmlTag.className = instance.className; // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";
        const board = document.getElementById("board"); // get a reference to the parent container
        board.appendChild(htmlTag);
        return htmlTag; // append the element to the dom
    }

    drawDomElm(instance) {
        instance.domElement.style.left = instance.positionX + "vw";
        instance.domElement.style.bottom = instance.positionY + "vh";
    }

    detectCollisionWithPlayer(element) {
        let counter = 0;
        if (
            this.player.positionX < element.positionX + element.width &&
            this.player.positionX + this.player.width > element.positionX &&
            this.player.positionY < element.positionY + element.height &&
            this.player.height + this.player.positionY > element.positionY
        ) {
            counter++;
        }
    }
}

class Player {
    constructor() {
        this.className = "player";
        this.positionX = 0;
        this.positionY = 0;
        this.width = 5;
        this.height = 10;
        this.domElement = null;
    }

    moveLeft() {
        this.positionX -= 5;
    }

    moveRight() {
        this.positionX += 5;
    }
}

class Obstacle {
    constructor() {
        this.positionX = Math.floor(Math.random() * 91);
        this.positionY = 100;
        this.width = 5;
        this.height = 5;
        this.domElement = null;
    }

    moveDown() {
        this.positionY -= 1;
    }
}

const game = new Game();
game.start();
