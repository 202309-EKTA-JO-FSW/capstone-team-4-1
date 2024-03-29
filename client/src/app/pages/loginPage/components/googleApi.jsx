import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from '../index';

const clientId = "63738745837-k81ls7845ijo98r0k1bk2ktoema1akf0.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="justify-center transform 
      xl:scale-75 md:scale-55 2xs:scale-40">
        <LoginPage />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;