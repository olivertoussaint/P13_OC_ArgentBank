import axios from "axios";

// Fonction pour gérer les erreurs API
const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.response) {
    const errorCode = error.response.status;

    switch (errorCode) {
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
    throw new Error(error.response.data.message || "An error occurred");
  } else {
    console.error("Network error or server is down.");
    throw new Error("Network error or server is down");
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email, password }
    );
    return {
      token: response.data.body.token,
      user: response.data.body.user, // Si l'API retourne les informations utilisateur avec le token
    };
  } catch (error) {
    return handleApiError(error); // Propagation de l'erreur
  }
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (jwtToken) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data.body; // Retourne directement les informations utilisateur
  } catch (error) {
    return handleApiError(error); // Propagation de l'erreur
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (jwtToken, updatedProfile) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      updatedProfile,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data.body; // Retourne directement les informations mises à jour
  } catch (error) {
    return handleApiError(error); // Propagation de l'erreur
  }
};
