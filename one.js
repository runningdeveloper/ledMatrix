// some testing 
const five = require("johnny-five"),
  board = new five.Board();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

board.on("ready", async () => {
  console.log('hello board is ready!')

  const matrix = new five.Led.Matrix({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    }
  });

  matrix.on();
  matrix.brightness(50);

  // 'hello'.split("").map(async (char)=>{
  //   await delay(3000)
  //   matrix.draw(char)
  // })

  // 'geoffrey'.split("").forEach((char,i)=>{
  //   setTimeout(()=>{
  //     matrix.draw(char)
  //   }, 1000*i)
  // })

  matrix.draw(':')
  // matrix.draw(')')

});