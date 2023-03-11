import './App.css';
import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import icon1 from '../icons/img4.png';
import CloseButton from '../Closebtn';
import abi from "./utilis/gNaira.json";
import {ethers} from "ethers";
import Typewriter from "typewriter-effect";








const getEthereumObject = () => window.ethereum;
const findMetaMaskAccount = async () => {
  try {
    
    const ethereum = getEthereumObject();
    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  
};




const App = () => {

const [currentAccount, setCurrentAccount] = useState("");
const [address, setAddress] = useState('');
const [showPopup, setShowPopup] = useState(false);
const [amount, setAmount] = useState('');




const getAddress = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  setAddress(accounts[0]);
};

getAddress();

const contractABI = abi.abi;
const contractAddress = "0xd845f5fC9e38Ed56c9F1aE71A0fa6c58Be129639"; 



  
const connectWallet = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.error(error);
  }
};



const handleSubmit = async () => {
  const { ethereum } = window;
  

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const gNGN = new ethers.Contract(contractAddress, contractABI, signer);
  gNGN.mint(amount);
  const transaction = await gNGN.mint(amount);

  alert('Check your console');

  console.log('Transaction hash:', transaction.hash);

  setShowPopup(false);
  

 
};





function Popup() {


  
  return (
    <>
    <div className="width">
    
    <div className="popup open ">
    <div className='closeButton'  >
    <CloseButton  onClick={togglePopup} />
    </div>
      
      <Typewriter onInit={(typewriter)=> { typewriter.typeString("Type in the amount you want to mint").pauseFor(50000).start();}}
  />
  
      {/* <h2>Type in amount you want to mint</h2> */}
      <input type="number"  name="Amout" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <button className='btn mint'  type="submit" onClick={handleSubmit}>Mint</button>
    </div>
    <div className='background'></div>
    </div>

    </>
    
    
  );
}
useEffect(() => {
  

  findMetaMaskAccount().then((account) => {
    if (account !== null) {
      setCurrentAccount(account);
    }
  });
  
 
}, []);


function handleOpenPopup() {
  setShowPopup(true);
}

function handleClosePopup() {
  setShowPopup(false);
}
function togglePopup() {
  setShowPopup(!showPopup);
}



  return (
    <>
    
    <header> 
    <div className='logo'>
        <h2>Naira <b>₦</b> </h2>
        <div className='list'>
      <div className='li home'>Home </div>
      <div className='li le'>Use Cases</div>
      <div className='li le'>Products</div>
      <div className='li'>FAQs</div>
    </div>
    </div>
   <div className='login'> 
   <div className='sign'>
   
    <Link to="/signup" className='link'>  <h4 className='col'>SignIn</h4></Link>
    <Link to="/signin" className='link'><h4 className='color'>SignUp</h4></Link>

   </div>
    {!currentAccount ? (
    <button type="button" className='btn btn-connect' onClick={connectWallet} >Connect Wallet</button>
    ) : (
      <button className="btn-connect" onClick={null}>
      Connected
      <span className="address">{address}</span>
    </button>
    )}
    </div>

    
    </header>
     <div className="App" >
      
      <div className='left'>
         <h2> Welcome to a new era!💚 </h2>
         <h1>NaijaCoin <b className='text'>Nigeria </b>  is a Digital currency 🇳🇬</h1>
         <Typewriter
  
  onInit={(typewriter)=> {
  typewriter
  .typeString("Secure your position for a spot at the physical event by minting the <b className='text'>NaijaCoin Token </b>  that would be required to attend the event.")
  .pauseFor(50000)
  .start();
  
  }}
  />
  
         {/* <p> Secure your position for a spot at the physical event by minting the <b className='text'>NaijaCoin Token </b>  that would be required to attend the event.</p> */}
         <button type="button" className='btn' onClick={handleOpenPopup}>Mint Token</button>
         {showPopup ? <Popup onClose={handleClosePopup} /> : null}

         
        </div>    
        <div className='right'>
        <img src={icon1 } className="side-img" alt="logo" />
       

        </div>
        
    </div>
    <div className='line'></div>
    {/* <div className='line lins'></div> */}
    <div className='footer'> Made with 👽 by Bigjoe.js</div>
    
    </>
   
  );
};


export default App;
