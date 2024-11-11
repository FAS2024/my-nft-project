const { Connection, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
require('dotenv').config();

// Create a connection to the Solana devnet
const connection = new Connection(process.env.SOLANA_URL, 'confirmed');

// Load the wallet from the secret key
const secretKey = Uint8Array.from([
    171, 247, 135, 165, 223, 41, 195, 252, 61, 59, 247, 217, 234, 178, 175, 4,
    43, 123, 205, 83, 198, 156, 139, 203, 22, 44, 135, 44, 245, 196, 75, 87,
    158, 213, 59, 239, 230, 64, 209, 97, 216, 87, 168, 65, 74, 58, 56, 110,
    208, 64, 229, 146, 255, 195, 185, 108, 87, 226, 7, 243, 131, 79, 193, 74
]);

const keypair = Keypair.fromSecretKey(secretKey);
console.log("Wallet Address:", keypair.publicKey.toBase58());

// Function to check the balance of the wallet
async function checkBalance() {
    try {
        const balance = await connection.getBalance(keypair.publicKey);
        console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error("Error checking balance:", err);
    }
}

// Call checkBalance to verify the wallet balance before sending a transaction
checkBalance();

// Function to send a transaction
async function sendTransaction() {
    try {
        // Check the balance before sending the transaction
        const balance = await connection.getBalance(keypair.publicKey);
        console.log(`Wallet balance before transaction: ${balance / LAMPORTS_PER_SOL} SOL`);

        // Ensure the wallet has enough balance to cover the transaction fee
        if (balance < 0.000005 * LAMPORTS_PER_SOL) {
            console.log("Not enough SOL to cover transaction fees.");
            return;
        }

        // Example recipient (replace this with a real recipient address)
        const recipient = new Keypair().publicKey;

        // Create the transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: recipient,
                lamports: 0.1 * LAMPORTS_PER_SOL, // Sending 0.1 SOL
            })
        );

        // Send the transaction and confirm it
        const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
        console.log("Transaction successful with signature:", signature);
    } catch (err) {
        console.error("Error sending transaction:", err);
    }
}

// Call the sendTransaction function
sendTransaction();



const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
