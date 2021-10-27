import './App.scss';
import './Reset.scss';
import DonationList from './components/DonationsList/DonationsList';
import React from 'react';
import AddDonation from './components/AddDonation/AddDonation';

function App() {
  return (
      <div className="App">
          <div className="container">
          <h1>ניהול תרומות</h1>
          <DonationList />
          <AddDonation/>
    </div>
    </div>
  );
}

export default App;
