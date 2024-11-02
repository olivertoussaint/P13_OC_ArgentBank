import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; 

// Fonction pour gérer les erreurs API
const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.response) {
    switch (error.response.status) {
      case 400:
        console.error("Invalid fields or bad request.");
        break;
      case 401:
        console.error("Unauthorized access. Please log in.");
        break;
      case 500:
        console.error("Internal server error.");
        break;
      default:
        console.error("An unexpected error occurred.");
    }
  } else {
    console.error("Network error or server is down.");
    throw error;
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${apiUrl}/v1/user/login`,
      { email, password }
    );
    return {
      token: response.data.body.token,
      user: response.data.body.user, // Si l'API retourne les informations utilisateur avec le token
    };
  } catch (error) {
    handleApiError(error);
  }
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (jwtToken) => {
  try {
    const response = await axios.post(
      `${apiUrl}/v1/user/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (jwtToken, updatedProfile) => {
  try {
    const response = await axios.put(
      `${apiUrl}/v1/user/profile`,
      updatedProfile,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log(response.data.body);
    return response.data.body;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fonction pour récupérer les transactions d'un compte utilisateur
export const fetchTransactions = async (accountId, jwtToken) => {
  try {
    const response = await axios.get(
      `${apiUrl}/v1/accounts/${accountId}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
