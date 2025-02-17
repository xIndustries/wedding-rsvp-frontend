import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// ✅ Fetch guest details by token
export const getGuestDetails = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invite/${token}`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching guest details:",
      error.response?.data || error.message,
    );
    return null;
  }
};

// ✅ Submit RSVP response
export const submitRSVP = async (token, rsvp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rsvp`, { token, rsvp });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error submitting RSVP:",
      error.response?.data || error.message,
    );
    return null;
  }
};

// ✅ Fetch all guests and their RSVP statuses
export const getAllGuests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rsvp/all`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching guests:",
      error.response?.data || error.message,
    );
    return [];
  }
};

// ✅ Send an invite to a guest with Authorization header
// ✅ api.js - Ensure correct field names in request payload
export const sendInvite = async (name, email, familySide) => {
  try {
    const response = await axios.post("http://localhost:8080/api/invite", {
      name,
      email,
      family_side: familySide, // ✅ Ensure this matches the backend struct
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error sending invite:",
      error.response?.data || error.message,
    );
    return null;
  }
};
