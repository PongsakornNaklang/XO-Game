var plays = [];
var end;

export const autoPlay = (replay, delay = 1, setState, callback) => {
    document.getElementById("board").style.pointerEvents = 'none';
    setState(prevState => ({ ...prevState, boardSize: replay.boardSize }))

    replay.lines.map((line, index) => {
        plays[index] = setTimeout(() => {
            setState(prevState => {
                console.log('row', line.row, 'col', line.col);
                var boardClone = [...prevState.board]
                boardClone[line.row][line.col] = line.player

                return ({ ...prevState, round: index + 1, board: [...boardClone] })
            })
        }, delay * index * 1000);
    })

    end = setTimeout(() => {
        callback()
    }, delay * replay.lines.length * 1000)

}

export const stopAutoPlay = () => {
    document.getElementById("board").style.pointerEvents = 'visible';
    plays.map((play) => {
        clearTimeout(play)
    })

    clearTimeout(end)
}