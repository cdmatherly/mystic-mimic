import { useCookies } from "react-cookie"
import Dash from "../views/DashView"
import LandingPage from "../views/LandingPageView"

const Index = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    return (
        <>
        {user?
        <Dash /> :
        <LandingPage />
        }
        </>
    )
}

export default Index