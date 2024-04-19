import React, { useState } from 'react';
import '../Recover-password/style.css';

function RecoverPassword() {
  const [contactInfo, setContactInfo] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setContactInfo(value);

    const isValidInput = /^\d{9}$/.test(value) || (value.includes('@') && value.length > 15);
    setIsValid(isValidInput);
    
    if (!isValidInput) {
      setErrorMessage('Por favor, ingresa un número de 9 dígitos o un email válido.');
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isValid) {
      alert(`Solicitud de recuperación enviada para: ${contactInfo}`);
      setContactInfo('');
    }
  };

  return (
    <div className="recuperar-container">
      <h1>Recuperar Contraseña</h1>
      <h2>Enviar nueva contraseña a:</h2>
      <h3>Celular/Teléfono/Email</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={contactInfo}
          onChange={handleChange}
          placeholder="Email, teléfono o celular (9 números o email válido)"
          className={!isValid ? 'invalid' : ''}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
}

export default RecoverPassword;
