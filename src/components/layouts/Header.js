import styles from './header.module.css'
import Logo from '../../images/PokedexNome.png'

const Header = () => {
    return (
        <header className={styles.container_header}>
            <img src={Logo} alt="pokédex-nome" />
        </header>
    )

}

export default Header