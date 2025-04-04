import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    // destructure our formstate into individual vars
    const {username, password, passwordConf} = formData;

    const handleChange = (evt) => {
        setMessage('');
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    }
    
    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        name="username"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="passwordConf">Confirm Password:</label>
                    <input 
                        type="password"
                        id="passwordConf"
                        name="passwordConf"
                        value={passwordConf}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default SignUpForm;