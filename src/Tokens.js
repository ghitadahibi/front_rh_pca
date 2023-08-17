import queryString from "query-string";

export const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('http://localhost:8080/realms/srs/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          grant_type: 'authorization_code',
          client_id: 'front-rh',
          client_secret:'bAdgZknXZS3CqEoXPiL251FJDHHJPWbH',
          code: code,
          redirect_uri: 'http://localhost:3000/dash',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error exchanging code for token: ${response.statusText}`);
      }
  
      const data = await response.json();
      const token = data.access_token;
      console.log('Tokens.js'+token)
      return token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return null;
    }
  };