import { useState } from 'react';
import { createUser } from '../Services/userService';

function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        const userData = {
          first_name: firstName,
          last_name: lastName,
          username: userName,
          email: email,
          password: password,
        };

    try {
        const result = await createUser(userData).then(response => console.log(response));

            setUserCreated(result);
            setMessage("User created successfully!")

            setFirstName('');
            setLastName('');
            setUserName('');
            setEmail('');
            setPassword('');
        } catch {
            setMessage('Failed to create user!')
        }
     
};
return (
    <div className='p-4'>
        <h2 className='text-x1 mb-4'><strong>Create User</strong></h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block'>First Name:</label>
                <input
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Firstname'
                required
                />
            </div>
            <div>
                <label className='block'>Last Name:</label>
                <input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Lastname'
                required
                />
            </div>
            <div>
                <label className='block'>User Name:</label>
                <input
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username'
                required
                />
            </div>
            <div>
                <label className='block'>Email:</label>
                <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
                />
            </div>
            <div>
                <label className='block'>Password</label>
                <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
                />
            </div>
            <div>
                <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>Create User</button>
            </div>
            {message && <p className="mt-4">{message}</p>}
        </form>
        {userCreated ? (
          <div className="mt-4">
          <h3>User created:</h3>
          <p>
            {userCreated.first_name} {userCreated.last_name} ({userCreated.username})
          </p>
        </div>  
        ) : null }
    </div>
);
}

export default CreateUser;