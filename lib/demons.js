import path from 'path';
import fs from 'fs';
import * as yaml from "js-yaml";

const demonsDirectory = path.join(process.cwd(), 'demons');

export function getSortedDemonsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(demonsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // remove file extension to get a proper id
        const id = fileName.replace(/\.yml$/, '');

        // read yaml file as string
        const fullPath = path.join(demonsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Parse YAML content using js-yaml
        const yamlData = yaml.load(fileContents, 'utf8');

        // Combine the data with an id
        return {
            id,
            ...yamlData
        };
    });

    console.log('allPostsData ' + allPostsData);

    return allPostsData.sort((a, b) => {
        if (Number(a.points) > Number(b.points)) {
            return -1
        } else {
            return 1;
        }
    })
}

export function getAllDemonIds() {
    const fileNames = fs.readdirSync(demonsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.yml$/, ''),
            },
        };
    });
}

export function getDemonData(id) {
    // read yaml file as string
    const fullPath = path.join(demonsDirectory, `${id}.yml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse YAML content using js-yaml
    const yamlData = yaml.load(fileContents);

    return {
        id,
        ...yamlData
    };
}

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