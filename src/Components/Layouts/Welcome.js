import { useCookies } from 'react-cookie'
const Welcome = ({loggedIn}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
    return (
        <>
            {loggedIn ? <div>خوش آمدید {cookies.user}</div> : <div />}
        </>
    )
};
export default Welcome;