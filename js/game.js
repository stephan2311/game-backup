class Game {
    constructor() {
        this.waterArr = [];
        this.maltArr = [];
        this.hopsArr = [];
        this.waterCount = 0;
        this.maltCount = 0;
        this.hopsCount = 0;
        this.timer = 0;
        this.level = 1;
        this.refreshRate = 1500 / 60; // 60 frames per second
        this.resultObj = { water: 0, malt: 0, hops: 0 };
        this.givenObj = { water: 3, malt: 2, hops: 1 };
    }

    start() {

        let waterNeeded = document.getElementById('water-needed');
        waterNeeded.innerHTML = this.givenObj.water;
        let maltNeeded = document.getElementById('malt-needed');
        maltNeeded.innerHTML = this.givenObj.malt;
        let hopsNeeded = document.getElementById('hops-needed');
        hopsNeeded.innerHTML = this.givenObj.hops;
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);

        this.addEventListeners();

        // Water
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
                if (this.collision(elm)) {
                    this.countWater();
                    this.removeWaterFromArr(this.waterArr, elm);
                    elm.domElement.remove();
                    this.compareObj();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        // Malt
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
                if (this.collision(elm)) {
                    this.countMalt();
                    this.removeMaltFromArr(this.maltArr, elm);
                    elm.domElement.remove();
                    this.compareObj();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        // Hops
        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 1000) === 0) {
                const newHops = new Hops();
                this.hopsArr.push(newHops);
                newHops.domElement = this.createDomElm(newHops);
                this.drawDomElm(newHops);
            }

            this.hopsArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(elm)) {
                    this.countHops();
                    this.removeHopsFromArr(this.hopsArr, elm);
                    elm.domElement.remove();
                    this.compareObj();
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
        // document.addEventListener("click", myScript);

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

    collision(elm) {
        if (
            this.player.positionX < elm.positionX + elm.width &&
            this.player.positionY < elm.positionY + elm.height &&
            elm.positionX < this.player.positionX + this.player.width &&
            elm.positionY < this.player.positionY + this.player.height
        ) {
            return true;
        }
    }

    removeWaterFromArr(waterArr, elm) {
        let index = waterArr.indexOf(elm);
        if (index > -1) {
            waterArr.splice(index, 1);
        }
    }

    removeMaltFromArr(maltArr, elm) {
        let index = maltArr.indexOf(elm);
        if (index > -1) {
            maltArr.splice(index, 1);
        }
    }

    removeHopsFromArr(hopsArr, elm) {
        let index = hopsArr.indexOf(elm);
        if (index > -1) {
            hopsArr.splice(index, 1);
        }
    }

    countWater() {
        let count = document.getElementById('water-coll');
        count.innerHTML = this.waterCount;
        this.resultObj.water += 1;
    }

    countMalt() {
        let count = document.getElementById('malt-coll');
        count.innerHTML = this.maltCount;
        this.resultObj.malt += 1;
    }

    countHops() {
        let count = document.getElementById('hops-coll');
        count.innerHTML = this.hopsCount;
        this.resultObj.hops += 1;
    }

    compareObj() {
        if (JSON.stringify(this.resultObj) === JSON.stringify(this.givenObj)) {
            this.level++;
            console.log(this.level);
            let levelCount = document.getElementById('level');
            levelCount.innerHTML = this.level;
            for (let key in this.resultObj) {
                this.resultObj[key] = 0;
            }
        }
    }

    timer() {
        this.seconds = 60;
        function tick() {
            let timer = document.getElementById("timer");
            seconds--;
            timer.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                setTimeout(tick, 1000);
            }
        }
        tick();
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
        this.positionX -= 3;
    }

    moveRight() {
        this.positionX += 3;
    }
}

class ParentObstacle {
    constructor() {
        this.positionX = (Math.floor(Math.random() * 85) + 15);
        this.positionY = 70;
        this.domElement = null;
    }

    moveDown() {
        this.positionY -= 1;
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
        this.width = 2;
        this.height = 5;
    }
}

const game = new Game();
game.start();