import styles from './styles/Sidebar.module.css';
import { BiMovie, BiShow, BiListCheck } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation().pathname;
    const linkStyle = styles.nav__item;
    const activeLinkStyle = [styles.nav__item, styles.nav__item__selected].join(" "); 
    return (
        <header className={styles.sidebar}>
            <div className={styles.user}>
                <div className={styles.user__avatar__container}>
                    <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/394/314/c62.jpg" alt="" className={styles.user__avatar}/>
                </div>
                <span className={styles.user__name}>Martin Jones</span>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.nav__list}>
                    <li>
                        <Link className={(location == "/" ? activeLinkStyle : linkStyle)} to="/">
                            <BiMovie className={styles.nav__icon}/>
                            <span>Descubre</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={(location == "/watchlist" ? activeLinkStyle : linkStyle)} to="/watchlist">
                            <BiShow className={styles.nav__icon}/>
                            <span>Por ver</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={(location == "/lists" ? activeLinkStyle : linkStyle)} to="/lists">
                            <BiListCheck className={styles.nav__icon}/>
                            <span>Mis listas</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Sidebar
