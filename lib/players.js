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
                    players[i].levelsCompleted.push(demonData.title);
                    playerExists = true;
                    break;
                }
            }
            if (!playerExists) {
                players.push({'name': player, 'points': Number(demonData.points) || 0, 'levelsCompleted': [demonData.title]});
            }
        }
    }

    return players.sort((a, b) => b.points - a.points);
}

export function getAllPlayerNames() {
    const playerNames = [];
    const players = getAllPlayers();

    for (const player of players) {
        playerNames.push(player.name);
    }

    return playerNames.map((playerName) => {
        return {
            params: {
                player: playerName,
            },
        };
    });
}

export function getPlayerData(playerName) {
    return getAllPlayers().find((player) => player.name === playerName);
}