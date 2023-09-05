import Layout from "../components/layout";
import {getAllPlayers} from "../lib/demons";
import styles from "../styles/Stats.module.css";

export default function StatsViewer({players}) {
    return (
        <Layout>
            <main className={styles.main}>
                <h1>Greatest cyclopeslayers:</h1>
                <ul className={styles.playersList}>
                    {players.map(({name, points}, index) => (
                        <li>#{++index} - {name}: {points}c</li>
                    ))}
                </ul>
            </main>
        </Layout>
    );
}

export function getStaticProps() {
    const players = getAllPlayers();
    console.log("players: " + JSON.stringify(players, null, 2));

    return {
        props: {
            players
        },
    };
}