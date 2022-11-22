import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import { getImages, getSearchImages } from "./utility";
import { Gallery, Image, Header, SearchBoxInput } from "./StyledComponents";

function Page() {
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
      <Header>
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
      </Header>

      <InfiniteScroll
        dataLength={images?.length}
        next={fetchDataOnScroll}
        hasMore={true}
      >
        <Gallery>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px">
              {images?.map((image, i) => (
                <Image key={i} src={image} alt="" />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </Gallery>
      </InfiniteScroll>
    </>
  );
}

export default Page;
