import firebase from './firebase.config';

export const readAllHistory = (callback) => {
    var historyRef = firebase.database().ref('history');
    historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        callback(prevState => ({ ...prevState, replays: Object.values(data) }))
    })
}

export const updateHistory = (date, boardSize, lines, winner) => {
    var data = { date, boardSize, lines, winner }
    var newHistoryKey = firebase.database().ref().child('history').push().key;
    var updates = {};

    updates['/history/' + newHistoryKey] = data;

    return firebase.database().ref().update(updates);
}