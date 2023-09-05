import {getAllDemonIds, getDemonData} from "../../lib/demons";
import Link from "next/link";
import Layout from "../../components/layout";
import styles from "../../styles/Cyclope.module.css";

export default function Demon({demonData}) {
    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.cyclope}>
                    <h1 className={styles.title}>{demonData.title}<h2 className={styles.author}>by {demonData.author}</h2></h1>
                </div>
                <div className={styles.victors}>
                    <ul>
                        {demonData.victors.map((victor, index) => (
                            <li key={index}>{`#${++index} - ${victor}`}</li>
                            ))}
                    </ul>
                </div>
                <Link href='/' className={styles.homeLink}><div>home</div></Link>
            </main>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllDemonIds();

    return {
        paths,
        fallback: false,
    };
}

export function getStaticProps({params}) {
    console.log("params: " + params);
    const demonData = getDemonData(params.id);

    return {
        props: {
            demonData
        }
    };
}