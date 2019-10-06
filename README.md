# TicTacToe

[![Build Status](https://travis-ci.com/shilangyu/TicTacToe.svg?branch=master)](https://travis-ci.com/shilangyu/TicTacToe)
[Try me!](https://shilangyu.github.io/TicTacToe)
Project where I created a trainer and a previewer of a TicTacToe AI. This project did not abuse the OP neural networks.

---

### Preview

- `npm start`
- open browser in `localhost:8080`

Runs in the browser and draws the board on a canvas. The preview uses the previously trained json file as the "brain" of the AI.
[Try it out](https://shilangyu.github.io/TicTacToe) and see if you can beat it :)

### Trainer

- `npm run train -- <amount of games> <flag?>`

  - `--player` AI will learn games where the player starts
  - `--AI` AI will learn games where the AI starts

The AI bases every move on the current tictactoe board. Each board can be represented in 8 same states: 4 rotations and 4 mirrors, which in result cuts the amount of possible combinations by a factor of 8. Heres how the AI learns:

1. Parse the current board into string
2. Rotate the string and mirror it (we have now 8 strings representing the same board)
3. Check if the json file contains any of the 8 strings
   - yes => get the `x` and `y` from the json file - **make** the `x`,`y` move
   - no => add a property to the json file containing all the possible moves for this board - **make** a random move
4. wait for the player move
5. check the current board state:
   - player won => **forget** about the previous move you've made
   - AI won => **make** the previous move your only one
6. `goto 1`
