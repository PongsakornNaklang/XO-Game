import { useState } from "react"
import { autoPlay } from "./autoPlay"

const StartGameModal = ({ setState, clearState, boardSize, replays, board }) => {
    const [showReplays, setShowReplays] = useState(false)

    const watchReplay =  (replay) => {
        setState(prevState => ({ ...prevState, boardSize: replay.boardSize, start: true }))

        autoPlay(replay, 1, setState, () => clearState())

    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto " aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="overflow-auto max-h-96 inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">XO Game</h3>
                                <div className="mt-2">
                                    Board size : <input className='border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200' type='number'
                                        onChange={(e) => setState(prevState => ({ ...prevState, boardSize: e.target.value }))}
                                        min="3" max="100" defaultValue={3}
                                    ></input> * {boardSize}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex-row">
                        <button type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none "
                            onClick={() => setState(prevState => ({ ...prevState, start: true }))}
                            disabled={board.length == 0}
                        >
                            Start</button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            onClick={() => setShowReplays(!showReplays)}
                            disabled={replays.length == 0}
                        >
                            {replays.length == 0 ?
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                : null
                            }
                            {
                                showReplays ? 'Close' : 'History'
                            }
                        </button>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 flex-row">
                        {
                            showReplays ?
                                replays.reverse().map((replay) => {
                                    return (
                                        <div key={replay.date} className="mt-3 w-full h-16 bg-gray-700 text-white rounded-md p-4 items-center grid grid-cols-3 gap-1" >
                                            <div>
                                                {replay.date}
                                            </div>
                                            <div>
                                                {
                                                    replay.winner === 'Draw' ? 'Draw!' : `Winner is ${replay.winner} player!`
                                                }
                                            </div>
                                            <div className='text-right'>
                                                <button
                                                    className='focus:outline-none'
                                                    onClick={() => watchReplay(replay)}
                                                >
                                                    Watch
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        </div >

    )
}

export default StartGameModal
