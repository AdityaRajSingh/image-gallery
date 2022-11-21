import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";

const getNumbers = () => {
  let numbers = [];
  for (let i = 0; i < 30; i++) {
    numbers.push(i);
  }
  console.log("Get numbers");
  return numbers;
};

const style = {
  height: 60,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const NumbersGallery = () => {
  const [numbers, setNumbers] = React.useState([]);

  const fetchData = () => {
    setTimeout(() => {
      const nums = getNumbers();

      setNumbers(numbers.concat(nums));
    }, 1500);
  };

  React.useEffect(() => {
    console.log("Use effect");
    const nums = getNumbers();
    setNumbers(nums);
  }, []);

  return (
    <InfiniteScroll dataLength={numbers.length} next={fetchData} hasMore={true}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {numbers.map((number, i) => (
          <div style={style} key={i}>
            div - #{i}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default NumbersGallery;
