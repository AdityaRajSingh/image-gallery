import React from "react";
import styled from "styled-components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const SearchHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #475766;
`;

const SearchBoxInput = styled.input`
  width: 500px;
  height: 25px;
  border-radius: 16px;
  border: none;
  font-size: 16px;
  padding: 15px 16px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const count = 30;

const getImages = async () => {
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

const getSearchImages = async (searchPrompt, page) => {
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

function SearchBox() {
  const [searchText, setSearchText] = React.useState("");
  const [scrollCounter, setScrollCounter] = React.useState(1);
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const images = await getImages();
      setImages(images);
    })();
  }, []);

  const fetchDataOnScroll = () => {
    (async () => {
      const imgs =
        searchText.length > 0
          ? await getSearchImages(searchText, scrollCounter + 1)
          : await getImages();

      if (searchText.length > 0) setScrollCounter(scrollCounter + 1);

      setImages(images.concat(imgs));
    })();
  };

  const fetchSearchData = () => {
    setScrollCounter(1);
    (async () => {
      const imgs = await getSearchImages(searchText, 1);

      setImages(imgs);
    })();
  };

  return (
    <>
      <SearchHeader>
        <SearchBoxInput
          value={searchText}
          placeholder="Search free high-resolution photos"
          onChange={(ev) => {
            setSearchText(ev.target.value);
          }}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              searchText.length === 0
                ? alert("Add query to search")
                : fetchSearchData();
            }
          }}
        />
      </SearchHeader>

      <InfiniteScroll
        dataLength={images?.length}
        next={fetchDataOnScroll}
        hasMore={true}
      >
        <div style={{ padding: "10px", maxWidth: "1330px", margin: "0 auto" }}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px">
              {images?.map((image, i) => (
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
    </>
  );
}

export default SearchBox;
