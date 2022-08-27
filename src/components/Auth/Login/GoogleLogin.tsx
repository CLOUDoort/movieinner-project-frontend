import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from '../../Loading'
import Signupinfo from '../Signup/Signupinfo'

const GoogleLogin = () => {
    const [valid, setValid] = useState(false)
    useEffect(() => {
        const tokenURL = new URL(window.location.href)
        const hashToken = tokenURL.hash
        console.log(hashToken)
        if (hashToken) {
            const accessToken = hashToken.split('=')[1].split('&')[0]
            console.log(accessToken)
        }
        const getAccessToken = async () => {
            try {
                const response = await axios.post('')
                setValid(true)
            } catch (e) {
                console.log(e.response)
            }
        }
        getAccessToken()
    })
    return <>{valid ? <Signupinfo /> : <Loading />}</>
}

export default GoogleLogin