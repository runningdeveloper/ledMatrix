const express = require('express')
const five = require("johnny-five"),
  board = new five.Board();

const app = express()
const port = 3000

app.use(express.static('public'))

// app.get('/', (req, res) => res.send('Hello World!'))



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

  // matrix.draw(':')
  // matrix.draw(')')
  app.get('/char/:char', (req, res) => {
    matrix.draw(req.params.char)
    res.send(`Should display ${req.params.char}`)
  })

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))





// // some testing 
// const five = require("johnny-five"),
//   board = new five.Board();

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// board.on("ready", async () => {
//   console.log('hello board is ready!')

//   const matrix = new five.Led.Matrix({
//     pins: {
//       data: 2,
//       clock: 3,
//       cs: 4
//     }
//   });

//   matrix.on();
//   matrix.brightness(50);

//   // 'hello'.split("").map(async (char)=>{
//   //   await delay(3000)
//   //   matrix.draw(char)
//   // })

//   // 'geoffrey'.split("").forEach((char,i)=>{
//   //   setTimeout(()=>{
//   //     matrix.draw(char)
//   //   }, 1000*i)
//   // })

//   matrix.draw(':')
//   // matrix.draw(')')

// });