import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from '../context/ChallengesContext';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { Menu } from '../components/Menu';

import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
 
export default function Home({ level, currentExperience, challengesCompleted}: HomeProps) {


  return (
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />


        <CountdownProvider>
        <Menu menuActive='home' />
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
