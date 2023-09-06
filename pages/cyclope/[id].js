import {getAllDemonIds, getDemonData} from "../../lib/demons";
import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/Cyclope.module.css";
import Image from "next/image";

export default function Demon({demonData}) {
    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.cyclope}>
                    <div className={styles.nameAndImage}>
                        <div className={styles.imageContainer}>
                            <Image
                                width={250}
                                height={250}
                                src={`/images/cyclopes/${demonData.difficulty}_cyclope.png`}
                                alt='ЦИКЛОП!'
                                />
                        </div>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>{demonData.title}</h1>
                        </div>
                    </div>
                    <h2 className={styles.author}>by {demonData.author}</h2>
                </div>
                <div className={styles.info}>
                    <h1>Bounty: {demonData.points}<Image src="/images/cyclope-eye.png" alt="Глаз Циклопа" width={48} height={48}/></h1>
                </div>
                <div className={styles.victors}>
                    <ul>
                        {demonData.victors.map((victor, index) => (
                            <li key={index}><Link href={`/players/${victor}`}>{`#${++index} - ${victor}`}</Link></li>
                            ))}
                    </ul>
                </div>
                <Link href='/' className={styles.homeLink}><div>home</div></Link>
            </main>
        </Layout>
    );
}

export function getStaticPaths() {
    const paths = getAllDemonIds();

    console.log(JSON.stringify(paths, 2, null));

    return {
        paths,
        fallback: false,
    };
}

export function getStaticProps({params}) {
    const demonData = getDemonData(params.id);

    return {
        props: {
            demonData,
        },
    };
}