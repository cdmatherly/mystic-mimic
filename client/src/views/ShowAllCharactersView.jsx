import { useEffect, useState } from 'react'
import axios from 'axios'
import charImg from '../images/bard_lute_char_img.jpeg';
import { useCookies } from 'react-cookie'
import EachCharacter from '../components/EachCharacter'

const ShowAllCharacters = (props) => {
    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
    }, [])

    return (
        <div className="min-h-screen py-16 bg-black">
            <div className="grid gap-8 items-start justify-center">
                {characters.map((character) =>
                <EachCharacter key={character._id} charImg={charImg} character={character} />
                )}
            </div>
        </div>
    )
}
export default ShowAllCharacters;