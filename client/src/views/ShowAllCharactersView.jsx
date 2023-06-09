import { useEffect, useState } from 'react'
import axios from 'axios'
import charImg from '../images/bard_lute_char_img.jpeg';
import { useCookies } from 'react-cookie'
import EachCharacter from '../components/EachCharacter'
import LoadingScreen from '../components/LoadingScreen';

const ShowAllCharacters = (props) => {
    const [characters, setCharacters] = useState([])
    const [races, setRaces] = useState([])
    const [classes, setClasses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletedCharacter, setDeletedCharacter] = useState(null)
    const [updatedCharacter, setUpdatedCharacter] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    useEffect(() => {
        axios.get(`http://localhost:8000/api/${user}/characters`)
            .then(res => {
                console.log(res)
                setCharacters(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('https://www.dnd5eapi.co/api/races')
            .then(res => {
                // console.log(res)
                setRaces(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('https://www.dnd5eapi.co/api/classes')
            .then(res => {
                // console.log(res)
                setClasses(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [deletedCharacter, updatedCharacter])

    const updateCharacters = (delCharacter) => {
        setDeletedCharacter(delCharacter)
    }

    const handleEdit = (character) => {
        setUpdatedCharacter(character)
    }


    return (
        <>
            {isLoading ?
                <LoadingScreen /> :
                <div className="grid grid-cols-4 gap-10">
                    {characters.map((character) =>
                        <EachCharacter key={character._id}
                            charImg={charImg}
                            character={character}
                            allCharacters={characters}
                            updateCharacters={updateCharacters}
                            handleEdit={handleEdit}
                            races={races}
                            classes={classes} />
                    )}
                </div>
            }
        </>
    )
}
export default ShowAllCharacters;