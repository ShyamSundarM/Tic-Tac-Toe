import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div>
      <h3>Tic Tac Toe (Online MultiPlayer)</h3>
      <div className={styles.Links}>
        <Link className={styles.Link} to={"GamePage?mode=offline"}>
          Play With Friend (Offline)
        </Link>
        <Link className={styles.Link} to={"GamePage?mode=online"}>
          Play With Friend (Online)
        </Link>
        <Link className={styles.Link} to={"GamePage?mode=computer"}>
          Play With Computer
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
