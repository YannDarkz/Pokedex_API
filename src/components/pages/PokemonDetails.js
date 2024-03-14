import styles from './pokemon_details.module.css'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";


const PokemonDetails = () => {
    const { id } = useParams(); // Obtém o ID do Pokémon da rota
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [types, setTypes] = useState([])
    const [abilities, setAbilities] = useState([])
    const [moves, setMoves] = useState([])

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await response.json();
                setPokemonDetails(data);
                setTypes(data.types)
                getAbilities(data)
                getMoves(data)
            } catch (error) {
                console.error("Erro ao buscar detalhes do Pokémon:", error);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    const getAbilities = async (pokemon) => {
        let urlAbility = []

        urlAbility = pokemon.abilities.map((abili) => urlAbility = (abili.ability.url))
        const responses = await Promise.all(urlAbility.map((url) => fetch(url)))
        const abilitiesFinal = await Promise.all(responses.map((response) => response.json()));
        setAbilities(abilitiesFinal)
    }

    const getMoves = (pokemon) => {
        const movesTotal = []
        for (let i = 0; i <= pokemon.moves.length - 1; i++) {
            movesTotal.push(pokemon.moves[i])
        }
        setMoves(movesTotal);
    }

    if (!pokemonDetails) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.container_details}>
            <div className={styles.card_details}>
            
            <Link className={styles.btn_voltar}  to={`/`}> <IoArrowBackCircle />  </Link>
                <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                <div className={styles.info_details}>
                    <h2>{pokemonDetails.name}</h2>
                    <p> <strong>Experiência Básica: </strong> {pokemonDetails.base_experience}</p>
                    <p><strong>Altura: </strong> {pokemonDetails.height}</p>
                    <p><strong>Comprimento: </strong> {pokemonDetails.weight}</p>
                    <ul className={styles.container_type}>
                        <strong>Tipos: </strong>
                        {types
                            .map((types) =>
                                <li className={styles.types_info} key={types.type.name} type={types.type.name} >
                                    {types.type.name}
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className={styles.abilities_container}>
                    <h3>Habilidades</h3>
                    {abilities.map((abilitys) =>
                        <div key={abilitys.id}>
                            <h4 className="title-ability">{abilitys.name} </h4>
                            <p className="text-ability">
                                {abilitys.effect_entries.length === 0 ? '' : abilitys.effect_entries[1].effect}
                            </p>
                        </div>

                    )}
                </div>
                <div className={styles.moves_container}>
                    <h3>Movimentos</h3>
                    <section>
                        {moves.map((move) =>
                            <span key={move.move.name}>{move.move.name}</span>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;