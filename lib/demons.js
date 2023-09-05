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

        if (yamlData.points >= 135) {
            yamlData['difficulty'] = 'sapphire';
        } else if (yamlData.points >= 80) {
            yamlData['difficulty'] = 'platinum';
        } else {
            yamlData['difficulty'] = 'amber';
        }

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

    if (yamlData.points >= 135) {
        yamlData['difficulty'] = 'sapphire';
    } else if (yamlData.points >= 80) {
        yamlData['difficulty'] = 'platinum';
    } else {
        yamlData['difficulty'] = 'amber';
    }

    return {
        id,
        ...yamlData
    };
}