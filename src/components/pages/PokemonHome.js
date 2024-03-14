import styles from './pokemon_home.module.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

import CardPokemon from '../layouts/CardPokemon';
import Button from '../layouts/Button';
import InputSearch from '../inputs/Search_Input';

const PokemonHome = () => {
    const [pokemons, setPokemons] = useState([])
    const [filterPokemons, setFilterPokemons] = useState([])
    const [offset, setOffset] = useState(20);
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [backButton, setBackButton] = useState(false)
    const [countPoke, setCountPoke] = useState(10)
    const searchTermRef = useRef('')

    useEffect(() => {
        // Verifica se o componente está montado para evitar a atualização de estado após a desmontagem
        let isMounted = true;


        const fetchData = async () => {

            try {
                let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                const fetchedPokemons = await Promise.all(data.results.map(async (pokemon) => {
                    const pokemonData = await fetch(pokemon.url).then(response => response.json());
                    return pokemonData;
                }));

               

                if (isMounted) {
                    setPokemons((prevPokemons) => [...prevPokemons, ...fetchedPokemons]);
                    // setCountPoke(prevCountPoke => prevCountPoke + 10)

                }
            } catch (error) {
                console.error("Erro ao buscar Pokémon:", error);
            }
        };

        fetchData();

        // Função de limpeza para definir isMounted como false quando o componente é desmontado
        return () => {
            isMounted = false;
        };


    }, [offset]);
    //console.log("poke", pokemons)

    const loadMore = () => {
        setBtnDisabled(true)
        setBackButton(true)
        setTimeout(() => {
            setBtnDisabled(false)
            setBackButton(false)
        }, 1000)
        setOffset(prevOffset => prevOffset + 10);
        setCountPoke(prevCountPoke => prevCountPoke + 10)
        if (countPoke >= 40) {
            setTimeout(() => {
                setBtnDisabled(true)
                setBackButton(true)
            }, 1500)
            console.log('akiii')
        }
    }

    const handleSearch = () => {
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTermRef.current.toLowerCase())
        ).slice(0, 5);

        setFilterPokemons(filteredPokemons)
    }

    return (
        <div className={styles.container_pokemon}>
            <InputSearch
                name="inputSearch"
                text="Buscar Pokemon:"
                type="text"
                placeHolder="Insira o nome do Pokemon"
                handleOnChange={(event) => {
                    searchTermRef.current = event.target.value;
                    handleSearch();
                }}
            />
            <div className={styles.cards_pokemon}>
                {searchTermRef.current ? filterPokemons
                    .map((poke) => (
                        <Link key={poke.id} to={`/pokemon_details/${poke.id}`}>
                            <CardPokemon
                               
                                // id={poke.id}
                                img={poke.sprites.front_default}
                                name={poke.name}
                                height={poke.height}
                            />
                        </Link>
                    ))
                    : pokemons.map((poke) => (
                        <Link  key={poke.id} to={`/pokemon_details/${ poke.id}`}>
                            <CardPokemon
                                // id={poke.id}
                                img={poke.sprites.front_default}
                                name={poke.name}
                                height={poke.height}
                            />
                        </Link>
                    ))}
            </div>
            <div>
                <Button text="Buscar mais" backButton={backButton} disabled={btnDisabled} onClick={loadMore} />
            </div>
        </div>
    )
}

export default PokemonHome