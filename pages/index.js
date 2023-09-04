import styles from '../styles/Home.module.css';
import {getSortedDemonsData} from "../lib/demons";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home({allDemonsData}) {
    return (
        <Layout>
            <main className={styles.main}>
                <ul className={styles.list}>
                    {(() => {
                        return allDemonsData.map(({id, title, author, points}, index) => (
                            <li className={styles.listItem} key={title}>
                                <Link href={`/cyclope/${id}`}>
                                    <div className={styles.cyclope}>
                                        <div className={styles.imageContainer}></div>
                                        <div className={styles.mainContainer}>
                                            <div className={styles.title}><p>{`#${++index} - ${title}`}</p></div>
                                            <div>
                                                <p  className={styles.author}>{author}</p>
                                                <p  className={styles.points}>{points}c</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ));
                    })()}
                </ul>
            </main>
        </Layout>
    )
}

export async function getStaticProps() {
    const allDemonsData = getSortedDemonsData();
    console.log("allDemonsData - " + allDemonsData)
    console.log("allDemonsData.length - " + allDemonsData.length)

    return {
        props: {
            allDemonsData
        },
    };
}