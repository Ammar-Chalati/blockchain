import { useState } from 'react';
import Header from '../../../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import Footer from '../../../components/Footer';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [accept, setAccept] = useState(false);
	const [Err, setErr] = useState(false);
	const [Errtext, setErrtext] = useState('');

	const nav = useNavigate();

	const cookie = Cookie();
	// Get User

	async function submit(e){
		e.preventDefault();
		try {
				await axios.post("http://localhost:9982/auth/login", {
					email: email,
					password: password,
				},{
					withCredentials: true
				});
				axios.get('http://localhost:9982/Users/current',{
					withCredentials: true
				})
				.then((data) => {
					cookie.set('identification', (data.data.user_id));
					cookie.set('access', (data.data.is_admin));
					nav(`/profile/${data.data.user_id}`);
				})
		}catch(err) {
			if (err.response.status === 400) {
				setErr(true);
			}
			setErrtext(err.response.data);
			setAccept(true);
		}
	}

	return (
		<div>
			<Header />
			<div className='login'>
				<div className='container'>
					<div className='parent'>
						<form onSubmit={submit} className='card'>
							<h1>Login Now</h1>
							<label htmlFor="email">Email: </label>
							<input id="email" type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required/>
							<label htmlFor="password">Password: </label>
							<input id="password" type='password' placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} />
							{password.length < 8 && accept && <p className='error'>Password must be more than 8 char</p>}
							{Err && accept && <p className='error'>{Errtext}</p>}
							<div style={{textAlign: "center"}}>
								<button type='submit'>Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
