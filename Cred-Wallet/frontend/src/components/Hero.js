import React from 'react'
import './styles/Hero.style.css'

const Hero = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className='hero-container'>
        <div className='content'>
            <h1 className='hero-title'>Secure and protect your finances with Cred Wallet</h1>
            <p className='hero-description'>Manage all your cards securely in one place. Please login or sign up to continue.</p>
            <div className='hero-buttons'>
                <button className='login-btn' onClick={onLoginClick}>Login</button>
                <button className='signup-btn' onClick={onSignupClick}>Sign Up</button>
            </div>
        </div>
        <div className='hero-image'>
            <img src='/credit_flip.gif' alt='Hero' className='hero-img' />
        </div>
    </div>
  )
}

export default Hero