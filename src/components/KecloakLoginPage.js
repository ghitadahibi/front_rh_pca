import React, { useEffect } from 'react';

const KeycloakLoginPage = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8080/realms/srs/protocol/openid-connect/auth?client_id=front-rh&response_type=code';
  }, []);

  return null; // Ou n'importe quel contenu que vous souhaitez afficher pendant le chargement
};

export default KeycloakLoginPage;
