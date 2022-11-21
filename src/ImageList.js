import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const getNumbers = () => {
  let numbers = [];
  for (let i = 0; i < 30; i++) {
    numbers.push(i);
    // numbers.push(Math.round(Math.random() * 10));
  }
  return numbers;
};

const accessKey = "QJdB1LqVNTR2zvNuim_k5nGByBdqtXjcI_igqVsPAGg";
const count = 30;
const imagesURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

const getImages = async () => {
  try {
    const response = await axios.get(imagesURL);
    console.log("Get Images Response", response);
    const data = response.data;
    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    alert("error", err);
    console.error("err", err);
  }
};

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const ImageList = () => {
  //   const [numbers, setNumbers] = React.useState([]);

  //   const fetchData = () => {
  //     const nums = getNumbers();
  //     console.log("New Images fetched");
  //     setNumbers([...numbers, nums]);
  //   };

  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const images = await getImages();
      setImages(images);
    })();
  }, []);

  const fetchData = () => {
    (async () => {
      const imgs = await getImages();

      setImages(images.concat(imgs));
    })();
  };

  //   React.useEffect(() => {
  //     const nums = getNumbers();
  //     console.log("New Images fetched", nums);
  //     setNumbers(nums);
  //   }, []);

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={fetchData}
      hasMore={true}
      loader={<div>Loading...</div>}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {images.map((number, i) => (
          <div style={style} key={i}>
            div - #{i}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ImageList;
