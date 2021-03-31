import { useState, useEffect } from "react";
import StartGameModal from "../components/startGameModal";
import GameOverModal from "../components/gameOverModal";
import { readAllHistory, updateHistory } from "../hooks/firebase";
import { stopAutoPlay } from "../components/autoPlay";

const initialState = {
    boardSize: 3,
    start: false,
    board: [],
    round: 1,
    player: 'X',
    history: [],
    winner: null,
    winContainer: {},
    replays: []
};

const Index = () => {
    const [{ boardSize, start, board, round, player, history, winner, winContainer, replays }, setState] = useState(initialState);

    const initialFormat = () => {
        readAllHistory(setState)
        setState(prevState => ({
            ...prevState,
            board: Array.from({ length: boardSize }, () => Array.from({ length: boardSize }, () => null)),
            winContainer: {
                X: {
                    rows: Array.from({ length: boardSize }, () => 0),
                    cols: Array.from({ length: boardSize }, () => 0),
                    diagonal: Array.from({ length: boardSize }, () => 0),
                    antiDiagonal: Array.from({ length: boardSize }, () => 0),
                },
                O: {
                    rows: Array.from({ length: boardSize }, () => 0),
                    cols: Array.from({ length: boardSize }, () => 0),
                    diagonal: Array.from({ length: boardSize }, () => 0),
                    antiDiagonal: Array.from({ length: boardSize }, () => 0),
                },
            }
        }))
    }

    useEffect(() => {
        initialFormat()
    }, [boardSize])

    const Update = () => {
        const date = new Date(Date.now()).toLocaleString('th-TH')
        console.log(date);
        updateHistory(date, boardSize, history, winner).then((res) => {
            if (res) {
                setState(prevState => ({ ...prevState, replays: Object.values(res) }))
            }
        })
    }

    useEffect(() => {
        if (winner) {
            Update()
        }
    }, [winner])

    const Move = ([row, col]) => {
        let boardClone = [...board]
        boardClone[row][col] = player
        const newLines = { player, row, col }

        setState(prevState => ({ ...prevState, board: boardClone, history: [...history, newLines] }))
        checkWin(row, col)
    }

    const checkWin = (row, col) => {
        let winContainerClone = { ...winContainer }
        let size = board.length
        winContainerClone[player]['rows'][row] += 1
        winContainerClone[player]['cols'][col] += 1
        if (row == col) winContainerClone[player]['diagonal'][row] += 1
        if (row + col + 1 == size) winContainerClone[player]['antiDiagonal'][row] += 1

        setState(prevState => ({ ...prevState, winContainer: winContainerClone }))

        if (winContainerClone[player]['rows'][row] === size
            || winContainerClone[player]['cols'][col] === size
            || winContainerClone[player]['diagonal'].reduce((a, b) => a + b) === size
            || winContainerClone[player]['antiDiagonal'].reduce((a, b) => a + b) === size) {
            setState(prevState => ({ ...prevState, winner: player }))
        } else if (round === size * size) {
            setState(prevState => ({ ...prevState, winner: 'Draw' }))
        }
        else {
            setState(prevState => ({
                ...prevState,
                player: player === 'X' ? 'O' : 'X',
                round: round + 1
            }))
        }
    }

    const clearState = () => {
        setState({
            ...initialState
        });
        initialFormat()
    };

    return (
        <div className='h-full w-full flex justify-center items-center p-10'>
            {!start ? <StartGameModal setState={setState} clearState={clearState} boardSize={boardSize} board={board} replays={replays} /> : null}
            {winner !== null ? <GameOverModal winner={winner} clearState={clearState} /> : null}
            <div className="grid grid-cols-1 gap-2 ">
                <div className="col-span-1">
                    <p id='round' className='text-sm text-center text-gray-700 w-40'>Round {round} / size ({boardSize}*{boardSize})</p>
                    <p id='turn' className='text-xs text-center text-gray-700'>Turn : Player {player}</p>
                </div>
                <div className="col-span-1">
                    <div id='board' className={`grid grid-flow-row gap-0 `}
                        style={{
                            gridTemplateColumns: `repeat(${boardSize},  1fr)`,
                            gridTemplateRows: `repeat(${boardSize},1fr)`,
                            gridAutoRows: `minmax(min-content, max-content)`,
                        }}
                    >
                        {
                            board.map((rows, i) => {
                                return rows.map((value, j) => {
                                    return (
                                        <button className='h-14 w-14' key={i + ',' + j} disabled={value !== null ? true : false} onClick={() => Move([i, j])}>
                                            <div id={i + ',' + j} className='move-box h-14 w-14 border border-gray-800 flex items-center justify-center text-3xl' >
                                                {value}
                                            </div>
                                        </button>
                                    )
                                }
                                )
                            })
                        }
                    </div>
                    <button type="button"
                        onClick={() => {
                            clearState()
                            stopAutoPlay()
                        }}
                        className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-red-700 border text-white focus:outline-none">
                        Back
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Index
