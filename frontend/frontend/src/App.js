// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [balance, setBalance] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  // Fetch balance from the backend
  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://localhost:3000/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Call to initiate transaction
  const initiateTransaction = async () => {
    try {
      setTransactionStatus('Sending transaction...');
      const response = await axios.post('http://localhost:3000/send-transaction');
      setTransactionStatus(`Transaction Successful! Signature: ${response.data.signature}`);
    } catch (error) {
      console.error('Error initiating transaction:', error);
      setTransactionStatus('Error sending transaction.');
    }
  };

  // Fetch balance on component mount
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="App">
      <h1>Solana Wallet Interaction by <strong>FATAI</strong></h1>
      <p>Current Wallet Balance: {balance ? `${balance} SOL` : 'Loading...'}</p>
      <button onClick={initiateTransaction}>Send Transaction</button>
      {transactionStatus && <p>{transactionStatus}</p>}
    </div >
  );
}

export default App;

