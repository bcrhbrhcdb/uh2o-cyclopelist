import styles from '../styles/Home.module.css';
import {getSortedDemonsData} from "../lib/demons";
import Link from "next/link";
import Layout from "../components/layout";
import Image from "next/image";

export default function Home({allDemonsData}) {
    return (
        <Layout>
            <main className={styles.main}>
                <ul className={styles.list}>
                    {(() => {
                        return allDemonsData.map(({id, title, author, points, difficulty}, index) => (
                            <li className={styles.listItem} key={title}>
                                <Link href={`/cyclope/${id}`}>
                                    <div className={styles.cyclope}>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                width={90}
                                                height={90}
                                                src={`/images/cyclopes/${difficulty}_cyclope.png`}
                                                alt='ЦИКЛОП!'
                                            />
                                        </div>
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

    console.log(JSON.stringify(allDemonsData, null, 2));

    return {
        props: {
            allDemonsData
        },
    };
}