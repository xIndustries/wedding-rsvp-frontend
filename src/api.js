import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Fetch guest details by token
export const getGuestDetails = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invite/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guest details:", error);
    return null;
  }
};

// Submit RSVP response
export const submitRSVP = async (token, rsvp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rsvp`, { token, rsvp });
    return response.data;
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return null;
  }
};

// Fetch all guests and their RSVP statuses
export const getAllGuests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rsvp/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
    return [];
  }
};
