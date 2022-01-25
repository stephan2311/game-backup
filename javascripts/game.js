class Game {
    constructor() {
        this.waterArr = [];
        this.maltArr = [];
        this.hopsArr = [];
        this.waterCount = 0;
        this.maltCount = 0;
        this.hopsCount = 0;
        this.timer = 0;
        this.refreshRate = 1500 / 60; // 60 frames per second
    }

    start() {
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);

        this.addEventListeners();

        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 250) === 0) {
                const newWater = new Water();
                this.waterArr.push(newWater);
                newWater.domElement = this.createDomElm(newWater);
                this.drawDomElm(newWater);
            }

            this.waterArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(this.player, elm)) {
                    this.waterCount += 1;
                    console.log(`Water collected: ${this.waterCount}`);
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 500) === 0) {
                const newMalt = new Malt();
                this.maltArr.push(newMalt);
                newMalt.domElement = this.createDomElm(newMalt);
                this.drawDomElm(newMalt);
            }

            this.maltArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(this.player, elm)) {
                    this.maltCount += 1;
                    console.log(`Malt collected: ${this.maltCount}`);
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 1000) === 0) {
                const newHops = new Hops();
                this.waterArr.push(newHops);
                newHops.domElement = this.createDomElm(newHops);
                this.drawDomElm(newHops);
            }

            this.hopsArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(this.player, elm)) {
                    this.hopsCount += 1;
                    console.log(`Hops collected: ${this.hopsCount}`);
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);

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
        const htmlTag = document.createElement("div");
        htmlTag.className = instance.className;
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";
        const board = document.getElementById("board");
        board.appendChild(htmlTag);
        return htmlTag;
    }

    drawDomElm(instance) {
        instance.domElement.style.left = instance.positionX + "vw";
        instance.domElement.style.bottom = instance.positionY + "vh";
    }

    collision(instance1, instance2) {
        if (
            instance1.positionX < instance2.positionX + instance2.width &&
            instance1.positionY < instance2.positionY + instance2.height &&
            instance2.positionX < instance1.positionX + instance1.width &&
            instance2.positionY < instance1.positionY + instance1.height
        ) {
            return true;
        }
    }

}

class Player {
    constructor() {
        this.className = "player";
        this.positionX = 50;
        this.positionY = 7;
        this.width = 5;
        this.height = 12;
        this.domElement = null;
    }

    moveLeft() {
        this.positionX -= 5;
    }

    moveRight() {
        this.positionX += 5;
    }
}

class ParentObstacle {
    constructor() {
        this.positionX = (Math.floor(Math.random() * 80) + 10);
        this.positionY = 70;
        this.domElement = null;
    }

    moveDown() {
        this.positionY -= 0.5;
    }

    removeObstacle(elm) {
        if (elm.positionY < 7) {
            elm.domElement.remove();
        }
    }
}

class Water extends ParentObstacle {
    constructor(positionX, positionY, domElement) {
        super(positionX, positionY, domElement);
        this.className = "water";
        this.width = 3;
        this.height = 8;
    }
}

class Malt extends ParentObstacle {
    constructor(positionX, positionY, domElement) {
        super(positionX, positionY, domElement);
        this.className = "malt";
        this.width = 3;
        this.height = 5;
    }
}

class Hops extends ParentObstacle {
    constructor(positionX, positionY, domElement) {
        super(positionX, positionY, domElement);
        this.className = "hops";
        this.width = 3;
        this.height = 5;
    }
}

const game = new Game();
game.start();
