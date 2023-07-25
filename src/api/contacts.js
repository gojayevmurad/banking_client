import { axiosClient } from ".";

const getUserContacts = () => {
  return axiosClient.get("/api/contacts/get-contacts");
};

const sendContactRequest = (body) => {
  return axiosClient.post("/api/contacts/send-request", body);
};

const getPendingContacts = () => {
  return axiosClient.get("/api/contacts/get-pendings");
};

const acceptContact = (id) => {
  return axiosClient.put(`/api/contacts/accept/${id}`);
};

const rejectContact = (id) => {
  return axiosClient.delete(`api/contacts/reject/${id}`);
};

export {
  getUserContacts,
  acceptContact,
  rejectContact,
  getPendingContacts,
  sendContactRequest,
};
