import axios from "axios";

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const count = 30;

export const getImages = async () => {
  try {
    const imagesURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

    const response = await axios.get(imagesURL);
    const data = response.data;

    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    console.log("err", err.response.data);
  }
};

export const getSearchImages = async (searchPrompt, page) => {
  try {
    const imagesURL = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchPrompt}&per_page=${count}&page=${page}`;
    const response = await axios.get(imagesURL);
    const data = response.data.results;
    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    console.log("err", err.response.data);
  }
};
