import React from 'react'
import './styles/Features.style.css'

const Features = () => {
  return (
    <div className='features-container'>
        <h1 className='features-title'>Why Cred Wallet?</h1>
        <div className='features'>
        <div className='features-content'>
            <img src="./security.png" alt="bank-level-security"/>
            <h3>Bank-Level Security</h3>
            <p>your data is protected with cutting edge encryption</p>
        </div>
        <div className='features-content'>
            <img src="./fraud-detection.png" alt="instant-fraud-detection"/>
            <h3>Instant Fraud Detection</h3>
            <p>Real-time alerts to suspicious transictions</p>
        </div>
        <div className='features-content'>
            <img src="./one_tap_access.png" alt="one-tap-access"/>
            <h3>One-Tap Card Access</h3>
            <p>Quickly access all your cards in one place</p>
        </div>
        </div>
    </div>
  )
}

export default Features