import React, { Component } from 'react';
import '../styles/Life.scss';

const newBoardStatus = (rows, columns, cellStatus = () => Math.random() < 0.3) => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < columns; c++) {
      grid[r][c] = cellStatus();
    }
  }
  return grid;
};

const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
  const handleClick = (r, c) => onToggleCellStatus(r, c);

  const tr = [];
  for (let r = 0; r < boardStatus.length; r++) {
    const td  = [];
    for (let c = 0; c < boardStatus[0].length; c++) {
      td.push(
        <td
          key={`${r},${c}`}
          className={ (boardStatus[r][c] ? 'alive' : 'dead')}
          onClick={() => handleClick(r, c)}
        />
      );
    }
    tr.push(<tr key={r}>{td}</tr>);
  }
  return <table><tbody>{tr}</tbody></table>;
};

const Slider = ({ speed, onSpeedChange }) => {
  const handleChange = e => onSpeedChange(e.target.value);

  return (
    <div className='form-item'>
    <label>Speed</label>
    <select onChange={handleChange} type='range'
      min='50'
      max='500'>
      <option value={500}>slow</option>
      <option value={200}>normal</option>
      <option value={20}>fast</option>
    </select>
    </div>

  );
};
const GridWidth = ({ grid, setWidth}) => {
  const handleChange = e => setWidth && setWidth(e.target.value);

  return (
    <div className='form-item'>
    <label>Grid Width </label>
    <br />
    <select onChange={handleChange}>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={40}>40</option>
      <option value={50}>50</option>
      <option value={60}>60</option>
      <option value={70}>70</option>
      <option value={80}>80</option>
    </select>
    </div>
  )
  
}

class Life extends Component {
  state = {
    rows: 40,
    columns: 50,
    boardStatus: newBoardStatus(40, 50),
    generation: 0,
    isGameRunning: false,
    speed: 500,
    
  };

  runStopButton = () => {
    return this.state.isGameRunning ?
      <button className='life-button' type='button' onClick={this.handleStop}>Resume</button> :
      <button className='life-button'  type='button' onClick={this.handleRun}  >Pause</button>;
  }

  handleClearBoard = () => {
    this.setState({
      boardStatus: newBoardStatus(this.state.rows, this.state.columns, () => false),
      generation: 0
    });
  }

  handleNewBoard = () => {
    this.setState({
      
      boardStatus: newBoardStatus(this.state.rows, this.state.columns),
      generation: 0
    });
  }

  handleToggleCellStatus = (r, c) => {
    const toggleBoardStatus = prevState => {
      const clonedBoardStatus = JSON.parse(JSON.stringify(prevState.boardStatus));
      clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
      return clonedBoardStatus;
    };

    this.setState(prevState => ({
      boardStatus: toggleBoardStatus(prevState)
    }));
  }

  handleStep = () => {
    const nextStep = prevState => {
      const boardStatus = prevState.boardStatus;

      /* Must deep clone boardStatus to avoid modifying it by reference when updating clonedBoardStatus.
      Can't use `const clonedBoardStatus = [...boardStatus]`
      because Spread syntax effectively goes one level deep while copying an array. 
      Therefore, it may be unsuitable for copying multidimensional arrays.
      Note: JSON.parse(JSON.stringify(obj)) doesn't work if the cloned object uses functions */
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const amountTrueNeighbors = (r, c) => {
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard = (x >= 0 && x < boardStatus.length && y >= 0 && y < boardStatus[0].length);
          /* No need to count more than 4 alive neighbors due to rules */
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < boardStatus.length; r++) {
        for (let c = 0; c < boardStatus[0].length; c++) {
          const totalTrueNeighbors = amountTrueNeighbors(r, c);

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3) clonedBoardStatus[r][c] = false;
          }
        }
      }

      return clonedBoardStatus;
    };

    this.setState(prevState => ({
      boardStatus: nextStep(prevState),
      generation: prevState.generation + 1
    }));
  }

  handleSpeedChange = newSpeed => {
    this.setState({ speed: newSpeed });
  }

  handleGridWidth = newWidth => {
    this.setState({ columns: newWidth });
  }
  
  handleRun = () => {
    this.setState({ isGameRunning: true });
  }

  handleStop = () => {
    this.setState({ isGameRunning: false });
  }

  componentDidUpdate(prevProps, prevState) {
    const { isGameRunning, speed } = this.state;
    const speedChanged = prevState.speed !== speed;
    const gameStarted = !prevState.isGameRunning && isGameRunning;
    const gameStopped = prevState.isGameRunning && !isGameRunning;

    if ((isGameRunning && speedChanged) || gameStopped) {
      clearInterval(this.timerID);
    }

    if ((isGameRunning && speedChanged) || gameStarted) {
      this.timerID = setInterval(() => {
        this.handleStep();
      }, speed);
    }
  }

  render() {
    const { boardStatus, isGameRunning, generation, speed } = this.state;

    return (
      <div className='game-of-life'>
        <div className='inline'>
        <h1>CONWAYS GAME OF LIFE</h1>
        <div className='twn-life'>
        <div className='flexRow lowerControls'>
          <GridWidth grid={0} setWidth={this.handleGridWidth}/>
          <div className='form-item'>
          <label>Grid height </label>
          <br />
          <select>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </select>
          </div>
          <div className='form-item'>
          <span>
            <Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
          </span>
          </div>
          <div className='form-item'>
          <label>Initial life probability </label>
          <select>
            <option>10%</option>
            <option>20%</option>
            <option>30%</option>
            <option>40%</option>
            <option>50%</option>
            <option>60%</option>
            <option>70%</option>
            <option>80%</option>
            <option>90%</option>
            <option>100%</option>
          </select>
          </div>
          {this.runStopButton()}
          <button className='life-button' type='button' disabled={isGameRunning}  onClick={this.handleNewBoard}>Apply</button>
        </div>
        <div className='flexRow upperControls'>
          {`Generation: ${generation}`}
        </div>
        <BoardGrid boardStatus={boardStatus} onToggleCellStatus={this.handleToggleCellStatus} />
        </div>
      </div>
      </div>
    );
  }
}

export default Life;