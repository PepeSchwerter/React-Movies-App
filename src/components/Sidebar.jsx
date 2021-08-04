import styles from './styles/Sidebar.module.css';
import { BiMovie, BiShow, BiListCheck } from "react-icons/bi";

const Sidebar = () => {
    return (
        <header className={styles.sidebar}>
            <div className={styles.user}>
                <div className={styles.user__avatar__container}>
                    <img src="https://i.pinimg.com/originals/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg" alt="" className={styles.user__avatar}/>
                </div>
                <span className={styles.user__name}>Martin Jones</span>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.nav__list}>
                    <li className={[styles.nav__item, styles.nav__item__selected].join(" ")}>
                        <BiMovie className={styles.nav__icon}/>
                        <span>Descubre</span>
                    </li>
                    <li className={styles.nav__item}>
                        <BiShow className={styles.nav__icon}/>
                        <span>Por ver</span>
                    </li>
                    <li className={styles.nav__item}>
                        <BiListCheck className={styles.nav__icon}/>
                        <span>Mis listas</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Sidebar
