import { useCookies } from 'react-cookie'
import useToken from '../../pages/Operates/useToken';
const Logout = ({loggedIn}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
    const { token, setToken } = useToken();
    const onButtonClick = () => {
        removeCookie('user');
        removeCookie('token');
        sessionStorage.clear();
        setToken('');
        window.location.href = '/';
      }
    return (
        <>
            <input
              className="danger"
              type="button"
              onClick={onButtonClick}
              value={loggedIn ? 'خارج شوید' : 'Log in'} 
            />
        </>
    )
};
export default Logout;