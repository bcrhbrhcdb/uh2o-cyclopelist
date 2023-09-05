import {getSortedDemonsData} from "./demons";

export function getAllPlayers() {
    const players = [];
    const allDemonsData = getSortedDemonsData();

    for (const demonData of allDemonsData) {
        for (const player of demonData.victors) {
            let playerExists = false;
            for (let i = 0; i < players.length; i++) {
                if (players[i].name === player) {
                    players[i].points += Number(demonData.points);
                    playerExists = true;
                    break;
                }
            }
            if (!playerExists) {
                players.push({'name': player, 'points': Number(demonData.points) || 0});
            }
        }
    }

    return players.sort((a, b) => b.points - a.points);
}

export function getPlayerData(playerName) {
    const player = getAllPlayers().find((player) => player.name === playerName);
    //TODO
}