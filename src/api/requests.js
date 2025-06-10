import axios from "axios";

const url = "https://mushub-back-production.up.railway.app";
// const url = "http://localhost:8000";

export const verifyToken = async (token) => {
  const { data } = await axios.get(`${url}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post(`${url}/api/auth/register`, registerData);

  return data;
};

export const login = async (loginData) => {
  const { data } = await axios.post(`${url}/api/auth/login`, loginData);

  return data;
};

export const createCategory = async (categoryData, token) => {
  const { data } = await axios.post(`${url}/api/category/create`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get(`${url}/api/category`);

  return data;
};

export const updateCategory = async (id, categoryData, token) => {
  const { data } = await axios.put(`${url}/api/category/update/${id}`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteCategory = async (id, token) => {
  const { data } = await axios.delete(`${url}/api/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllMedia = async () => {
  const { data } = await axios.get(`${url}/api/media`);

  return data;
};

export const getMediaByCategories = async (sort, categoryId) => {
  const { data } = await axios.get(`${url}/api/media/categories?sort=${sort}&category=${categoryId || ""}`);

  return data;
};

export const getSearch = async (query, token) => {
  const { data } = await axios.get(`${url}/api/media/search?query=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const postMedia = async (mediaData, token) => {
  const { data } = await axios.post(`${url}/api/media/upload`, mediaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const postToggleLike = async (mediaId, token) => {
  const { data } = await axios.post(
    `${url}/api/media/like/${mediaId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const postComment = async (mediaId, commentData, token) => {
  const { data } = await axios.post(`${url}/api/media/comment/${mediaId}`, commentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllComments = async (mediaId) => {
  const { data } = await axios.get(`${url}/api/media/comment/${mediaId}`);

  return data;
};

export const deleteMedia = async (mediaId, token) => {
  const { data } = await axios.delete(`${url}/api/media/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateMedia = async (mediaId, mediaData, token) => {
  const { data } = await axios.put(`${url}/api/media/${mediaId}`, mediaData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getMediaById = async (mediaId) => {
  const { data } = await axios.get(`${url}/api/media/${mediaId}`);

  return data;
};

export const incrementListens = async (mediaId) => {
  const { data } = await axios.post(`${url}/api/media/${mediaId}/listens`);

  return data;
};

export const getCheckLike = async (mediaId, token) => {
  const { data } = await axios.get(`${url}/api/media/${mediaId}/check-like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const postPlaylist = async (playlistData, token) => {
  const { data } = await axios.post(`${url}/api/playlists`, playlistData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getUserPlaylists = async (token) => {
  const { data } = await axios.get(`${url}/api/playlists/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getPlaylistById = async (playlistId, token) => {
  const { data } = await axios.get(`${url}/api/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updatePlaylist = async (playlistId, editData, token) => {
  const { data } = await axios.patch(`${url}/api/playlists/${playlistId}`, editData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deletePlaylist = async (playlistId, token) => {
  const { data } = await axios.delete(`${url}/api/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const addToPlaylist = async (playlistId, mediaId, token) => {
  const { data } = await axios.post(
    `${url}/api/playlists/${playlistId}/add/${mediaId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteFromPlaylist = async (playlistId, mediaId, token) => {
  const { data } = await axios.delete(`${url}/api/playlists/${playlistId}/remove/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAllUsers = async (token) => {
  const { data } = await axios.get(`${url}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getUser = async (userId, token) => {
  const { data } = await axios.get(`${url}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateUser = async (userId, editData, token) => {
  const { data } = await axios.put(`${url}/api/users/update/${userId}`, editData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteUser = async (userId, token) => {
  const { data } = await axios.delete(`${url}/api/users/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
