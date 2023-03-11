import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="">
        <h1 className="text-red-500 text-7xl">Home Page</h1>
        <p>Welcome To The App</p>
      </div>
    </main>
  );
}
