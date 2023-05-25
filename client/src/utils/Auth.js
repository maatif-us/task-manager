import { useEffect, useState } from 'react';


const Auth = {
  useAuthentication: () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {

      checkLoginStatus();

    }, []);

    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    return isLoggedIn;
  }
};

export default Auth;
