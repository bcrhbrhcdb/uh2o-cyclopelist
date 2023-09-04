import Head from "next/head";

const name = "UH2O Cyclopelist"

export default function Layout({children}) {
    return <div>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,300;0,500;0,700;1,100&display=swap" rel="stylesheet"/>
            <title>{name}</title>
            <meta
                name="description"
                content="Официальный циклополист Водоуранска! Только самые сильные циклопослееры Атова имеются в этом списке!"
            />
        </Head>
        {children}
    </div>
}