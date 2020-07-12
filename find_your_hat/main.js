const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field=[]) {
    this._field = field
    this._x = 0
    this._y = 0
    this._playing = true
  }

  _print() {
    let field = ''
    for (let i = 0; i < this._field.length; i++) {
      field += this._field[i].join('') + '\n'
    }
    return field
  }

  _check_in_bounds(direction) {
    switch(direction) {
      case 'w':
        if (this._y - 1 < 0) {
          this._playing = false
        }
        break;
      case 'a':
        if (this._x - 1 < 0) {
          this._playing = false
        }
        break;
      case 's':
        if (this._y + 1 >= this._field.length) {
          this._playing = false
        }
        break;
      case 'd':
        if (this._x + 1 >= this._field[0].length) {
          this._playing = false
          break;
        }
    }
  }

  _check_valid_letter(direction) {
    if (direction != 'w' && 
        direction != 'a' && 
        direction != 's' &&
        direction != 'd') {
          console.log('You have to move with wasd.')
        }
  }

  _update_tile(direction) {
    let prev_x = this._x
    let prev_y = this._y
    switch(direction) {
      case 'w':
        this._y -= 1
        break;
      case 'a':
        this._x -= 1
        break;
      case 's':
        this._y += 1
        break;
      case 'd':
        this._x += 1
        break;
    }
    const tile = this._field[this._y][this._x]
    if (tile === '^') {
      console.log("YOU WON!")
      this._playing = false
      return
    } else if (tile === 'O') {
      console.log("You fell into a hole. YOU LOST!")
      this._playing = false
      return
    } else {
      this._field[this._y][this._x] = '*'
      this._field[prev_y][prev_x] = '.'
      return
    }
  }

  _update_position(direction) {
    direction = direction.toLowerCase()
    this._check_valid_letter(direction)
    this._check_in_bounds(direction)
    if (!this._playing) {
      console.log("Outside the field! YOU LOST!")
      return
    }
    this._update_tile(direction)
  }

  play() {
    while (this._playing) {
      console.log(this._print())
      const direction = prompt('Which way? (WASD): ');
      this._update_position(direction)
    }
  }

  generateField(height, width, percentage=0.1) {
    this._field = []
    for (let h = 0; h < height; h++) {
      this._field.push([])
      for (let w = 0; w < width; w++) {
        let tile = Math.random() < percentage ? 'O' : '░' 
        this._field[h].push(tile)
      }
    }
    let hat = {
      x: Math.floor(Math.random() * (width - 1)) + 1,
      y: Math.floor(Math.random() * (height - 1)) + 1
    }
    this._field[hat.y][hat.x] = '^'
    this._field[0][0] = '*'
    this._print()
  }
}

const field = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);
field.generateField(10, 10, 0.2)
field.play()

