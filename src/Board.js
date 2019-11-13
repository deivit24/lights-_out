import React from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends React.Component {
  static defaultProps = {
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      level: 3,
      hasWon: false,
      board: this.createBoard(5)
    };
    this.easy = this.easy.bind(this);
    this.med = this.med.bind(this);
    this.hard = this.hard.bind(this);
  }

  easy() {
    this.setState({
      level: 2,
      board: this.createBoard(2)
    });
  }
  med() {
    this.setState({
      level: 3,
      board: this.createBoard(3)
    });
  }
  hard() {
    this.setState({
      level: 5,
      board: this.createBoard(5)
    });
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard(n) {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    if (n === 2) {
      for (let y = 0; y < 2; y++) {
        let row = [];
        for (let x = 0; x < 2; x++) {
          row.push(Math.random() < this.props.chanceLightStartsOn);
        }
        board.push(row);
      }
    }
    if (n === 3) {
      for (let y = 0; y < 3; y++) {
        let row = [];
        for (let x = 0; x < 3; x++) {
          row.push(Math.random() < this.props.chanceLightStartsOn);
        }
        board.push(row);
      }
    }
    if (n === 5) {
      for (let y = 0; y < 5; y++) {
        let row = [];
        for (let x = 0; x < 5; x++) {
          row.push(Math.random() < this.props.chanceLightStartsOn);
        }
        board.push(row);
      }
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let level = this.state.level;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < level && y >= 0 && y < level) {
        board[y][x] = !board[y][x];
      }
    }
    // Flip Initial Cell
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    console.log(board[0], coord);
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  resetGame() {
    window.location.reload();
  }

  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon) {
      return (
        <div>
          <div className="board-Title">
            <div className="neon">You</div> <div className="flux">Win</div>
          </div>
          <div>
            <button id="resetButton" className="neon" onClick={this.resetGame}>
              {" "}
              reset
            </button>
          </div>
        </div>
      );
    }

    let tblBoard = [];
    for (let y = 0; y < this.state.level; y++) {
      let row = [];
      for (let x = 0; x < this.state.level; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
      <div>
        <div className="board-Title">
          <div className="neon">Lights</div> <div className="flux">Out</div>
        </div>

        <div className="levels">
          <button className="flux" onClick={this.easy}>
            Easy
          </button>
          <button className="flux" onClick={this.med}>
            Medium
          </button>
          <button className="flux" onClick={this.hard}>
            Hard
          </button>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO
  }
}

export default Board;
