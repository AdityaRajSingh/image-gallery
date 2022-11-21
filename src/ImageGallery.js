import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const accessKey = "QJdB1LqVNTR2zvNuim_k5nGByBdqtXjcI_igqVsPAGg";
const count = 30;

const getImages = async (searchPrompt) => {
  try {
    const imagesURL =
      searchPrompt.length > 0
        ? `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchPrompt}&per_page=${count}`
        : `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

    console.log(imagesURL);
    const response = await axios.get(imagesURL);
    const data = response.data;
    let imageURLs = [];
    data.forEach((data) => {
      imageURLs.push(data.urls.small);
    });
    return imageURLs;
  } catch (err) {
    console.error("err", err);
  }
};

const ImageGallery = ({ searchPrompt = "" }) => {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const images = await getImages(searchPrompt);
      setImages(images);
    })();
  }, []);

  React.useEffect(() => {
    console.log("Prompt recieved", searchPrompt);
    if (searchPrompt.length > 0) {
      (async () => {
        const images = await getImages(searchPrompt);
        setImages(images);
      })();
    }
  }, [searchPrompt]);

  const fetchData = () => {
    (async () => {
      const imgs = await getImages(searchPrompt);

      setImages(images.concat(imgs));
    })();
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={fetchData}
      hasMore={searchPrompt === "" ? true : false}
    >
      <div style={{ padding: "10px", maxWidth: "1330px", margin: "0 auto" }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                style={{ width: "100%", display: "block" }}
                alt=""
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </InfiniteScroll>
  );
};

export default ImageGallery;
