import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [view, setView] = useState('register');
  const [token, setToken] = useState('');
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const API = 'http://localhost:5000/api';

  useEffect(() => {
    if (view === 'gallery') fetchPhotos();
  }, [view]);

  async function fetchPhotos() {
    const res = await fetch(`${API}/photos`);
    setPhotos(await res.json());
  }

  async function handleRegister() {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.token) { setToken(data.token); setView('verify'); }
  }

  async function handleVerify() {
    const res = await fetch(`${API}/auth/verify`, {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ token })
    });
    if ((await res.json()).message) setView('login');
  }

  async function handleLogin() {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    });
    const data = await res.json();
    if (data.token) { setToken(data.token); setView('gallery'); }
  }

  async function handleUpload() {
    const fd = new FormData();
    fd.append('photo', file);
    await fetch(`${API}/photos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    fetchPhotos();
  }

  return (
    <div className="container">
      {view === 'register' && (
        <>
          <h2>Register</h2>
          <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button onClick={handleRegister}>Register</button>
        </>
      )}

      {view === 'verify' && (
        <>
          <h2>Verify Account</h2>
          <p>Click to verify your account</p>
          <button onClick={handleVerify}>Verify</button>
        </>
      )}

      {view === 'login' && (
        <>
          <h2>Login</h2>
          <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button onClick={handleLogin}>Login</button>
        </>
      )}

      {view === 'gallery' && (
        <>
          <h2>Gallery</h2>
          <input type="file" onChange={e=>setFile(e.target.files[0])}/>
          <button onClick={handleUpload}>Upload Photo</button>
          <div>
            {photos.map(p=>(
              <div className="photo" key={p._id}>
                <img src={`http://localhost:5000/uploads/${p.filename}`} alt={p.originalName}/>
                <p>{p.user.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;