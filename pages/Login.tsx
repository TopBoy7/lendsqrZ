import signIn from '../src/assets/images/sign-in.svg';
import logo from '../src/assets/images/logo.svg';
import '../src/assets/styles/login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // remove error message when user changes input 
        setShowError(false);
        setPassword(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // remove error message when user changes input 
        setShowError(false);
        setEmail(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        // prevent button click from reloading page 
        event.preventDefault()
        setShowError(false);
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = (password.length > 7);

        if (!isEmailValid) {
            setShowError(true);
            setError('Please enter a valid email')
            return;
        } else if (!isPasswordValid) {
            setShowError(true);
            setError('Please enter a password up to 8 characters')
            return;
        } else {
            navigate('/dashboard');
        }
    }

    return (
        <div className="login-row">
            <div className="login-col">
                <img src={logo} className='logo' alt="Lendsqr Logo" />
                <img src={signIn} className='left-img' alt="Log in page image" />
            </div>

            <div className="login-col">
                <img src={logo} className='right-logo' alt="Lendsqr Logo" />
                <div className="form">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>

                    {showError? (
                        <div className="error">
                            <p>{ error }</p>
                        </div>
                    ): (<span></span>)}
                    <form action="/">
                        <input type="text" placeholder='Email' value={email} onChange={handleEmailChange} />
                        <div className="password">
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={handlePasswordChange} />
                            {showPassword? 
                                (<h6 onClick={toggleShowPassword} >HIDE</h6>) :
                                (<h6 onClick={toggleShowPassword} >SHOW</h6>)
                            }
                        </div>
                        <h6 className='forgot'>FORGOT PASSWORD?</h6>
                        <button onClick={handleSubmit} >LOG IN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;