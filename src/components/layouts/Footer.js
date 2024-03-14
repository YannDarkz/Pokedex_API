import styles from './footer.module.css'
import PokeBall from '../../images/Pokeball.png'
import Logo from '../../images/PokedexNome.png'

const Footer = () => {

    return(
        <div  className={styles.container_footer}>
            <img className={styles.img_pokeball} src={PokeBall} alt="pokeball" />
            <img className={styles.img_pokedex} src={Logo} alt="pokemon-name" />
            <img className={styles.img_pokeball}  src={PokeBall} alt="pokeball" />
        </div>
    )
}

export default Footer