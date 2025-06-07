const CELLSIZE = 40;
let fircan = document.querySelector("#firstplayercanva");
fircan.width = 400;
fircan.height = 400;
const ct = fircan.getContext("2d");
ct.strokeRect(0, 0, fircan.width, fircan.height);
ct.StrokeStyle = "blue";

let seccan = document.querySelector("#secondplayercanva");
seccan.width = 400;
seccan.height = 400;
const ctx = seccan.getContext("2d");
ctx.strokeRect(0, 0, fircan.width, fircan.height);
ctx.StrokeStyle = "Black";

let ships = [];
class Ship {
  constructor(length, player) {
    this.length = length;
    this.player = player;
    this.hits = 0;
    ships.push(this);
    this.x = [];
    this.y = [];
  }

  isHit = null;
  isSunk() {
    if (this.hits == this.length) {
      return true;
    }
  }

  placeship(x, y, ishorizontalbool) {
    if (this.player == 1) {
      if (ishorizontalbool == 1) {
        if (
          this.length * CELLSIZE + x * CELLSIZE <= fircan.width &&
          CELLSIZE + y * CELLSIZE <= fircan.width
        ) {
          ct.fillStyle = "blue";
          ct.fillRect(
            x * CELLSIZE,
            y * CELLSIZE,
            this.length * CELLSIZE,
            CELLSIZE,
          );

          for (let i = x; i < x + this.length; i++) {
            this.x.push(i);
          }
          this.y.push(y);
        }
      } else if (ishorizontalbool == 2) {
        if (
          this.length * CELLSIZE + y * CELLSIZE <= fircan.width &&
          CELLSIZE + x * CELLSIZE <= fircan.width
        ) {
          ct.fillStyle = "blue";
          ct.fillRect(
            x * CELLSIZE,
            y * CELLSIZE,
            CELLSIZE,
            this.length * CELLSIZE,
          );
          for (let i = y; i < y + this.length; i++) {
            this.y.push(i);
          }
          this.x.push(x);
        }
      } else prompt("provide correct ALIGNMENT VALUE");
    } else if (this.player == 2) {
      if (ishorizontalbool == 1) {
        if (
          this.length * CELLSIZE + x * CELLSIZE <= seccan.width &&
          CELLSIZE + y * CELLSIZE <= seccan.width
        ) {
          ctx.fillStyle = "blue";
          ctx.fillRect(
            x * CELLSIZE,
            y * CELLSIZE,
            this.length * CELLSIZE,
            CELLSIZE,
          );
          for (let i = x; i < x + this.length; i++) {
            this.x.push(i);
          }
          this.y.push(y);
        }
      } else if (ishorizontalbool == 2) {
        if (
          this.length * CELLSIZE + y * CELLSIZE <= seccan.width &&
          CELLSIZE + x * CELLSIZE <= seccan.width
        ) {
          ctx.fillStyle = "blue";
          ctx.fillRect(
            x * CELLSIZE,
            y * CELLSIZE,
            CELLSIZE,
            this.length * CELLSIZE,
          );
          for (let i = y; i < y + this.length; i++) {
            this.y.push(i);
          }
          this.x.push(x);
        }
      } else prompt("provide correct ALIGNMENT VALUE");
    }
  }
}

const ship1 = new Ship(5, 1);
ship1.placeship(3, 1, 1);
const ship2 = new Ship(3, 2);
ship2.placeship(4, 2, 2);

function player1(a, b) {
  for (let ship of ships) {
    if (ship.player == 2) {
      if (ship.x.includes(a)) {
        if (ship.y.includes(b)) {
          ship.IsHit = true;
          ship.hits++;
          ctx.fillStyle = "red";
          ctx.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
        } else {
          ship.IsHit = false;
          ctx.fillStyle = "yellow";
          ctx.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
        }
      } else {
        ship.IsHit = false;
        ctx.fillStyle = "yellow";
        ctx.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
        console.log(ship.IsHit);
      }
    }
  }
  won1();
  won2();
}
function player2(a, b) {
  for (let ship of ships) {
    if (ship.player == 1) {
      if (ship.x.includes(a)) {
        if (ship.y.includes(b)) {
          ship.IsHit = true;
          ship.hits++;
          ct.fillStyle = "red";
          ct.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
        } else {
          ship.IsHit = false;
          ct.fillStyle = "yellow";
          ct.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
        }
      } else {
        ship.IsHit = false;
        ct.fillStyle = "yellow";
        ct.fillRect(a * CELLSIZE, b * CELLSIZE, CELLSIZE, CELLSIZE);
      }
    }
    won1();
    won2();
  }
}

function won1() {
  for (let ship of ships) {
    if (ship.player == 1) {
      if (ship.isSunk() != true) {
        return false;
      }
    }
  }
  alert("player1 won");
}

function won2() {
  for (let ship of ships) {
    if (ship.player == 2) {
      if (!ship.isSunk()) return false;
    }
  }

  alert("player2 won");
}
