import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [number, setNumber] = useState('');
	const [password, setPassword] = useState('');
	const [passwordC, setPasswordC] = useState('');
	const [accept, setAccept] = useState(false);
	const [err,setErr] = useState('')
	const [numberErr,setNumberErr] = useState(false)

	const nav = useNavigate();

	async function submit(e){
		e.preventDefault();
		if(password === passwordC){
			try {
				let res = await axios.post("http://localhost:9982/users/register_user", {
					firstname: fname,
					lastname: lname,
					phone_number: number,
					email: email,
					password: password,
				},{
					withCredentials: true
				});
				nav("/dashboard/users");
			}catch(err) {
				setErr(err.response.data);
				setAccept(true);
			}
		}
		else {
			setNumberErr(true);
		}
	}

	return (
		<div className='createUser'>
			<div className='container'>
				<div className='parent'>
					<form onSubmit={submit} className='card'>
						<h1>Create User</h1>
						<label htmlFor="fname">First Name: </label>
						<input id="fname" type='text' placeholder='First Name...' value={fname} onChange={(e) => setFname(e.target.value)} required/>
						{fname.length < 2 && accept && <p className='error'>First Name must be more than 2 char</p>}
						<label htmlFor="lname">Last Name: </label>
						<input id="lname" type='text' placeholder='Last Name...' value={lname} onChange={(e) => setLname(e.target.value)} required/>
						{lname.length < 2 && accept && <p className='error'>Last Name must be more than 2 char</p>}
						<label htmlFor="email">Email: </label>
						<input id="email" type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required/>
						<label htmlFor='number'>Phone Number: </label>
						<input id='number' type='tel' placeholder='Phone Number...' value={number} onChange={(e) => setNumber(e.target.value)} required/>
						<label htmlFor="password">Password: </label>
						<input id="password" type='password' placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} required/>
						{password.length < 8 && accept && <p className='error'>Password must be more than 8 char</p>}
						<label htmlFor="passwordCo">Password Confirmation: </label>
						<input id="passwordCo" type='password' placeholder='Password Confirmation...' value={passwordC} onChange={(e) => setPasswordC(e.target.value)} required/>
						{numberErr && <p className='error'>Password does not match</p>}
						{accept && <p className='error'>{err}</p>}
						<button type='submit'>Create User</button>
					</form>
				</div>
			</div>
		</div>
	)
}
