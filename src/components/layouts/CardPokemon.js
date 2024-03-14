import styles from './card_pokemon.module.css'

const CardPokemon = ({ img, name, height, id }) => {

    return (
        <div className={styles.container_card}>
            {/* <strong> # Id - {id}</strong> */}
            <h4>Nome: {name}</h4>
            <strong>Altura: {height}</strong>
            <img src={img} alt="Imagem do Pokémon" />
        </div>

    )
}

export default CardPokemon;