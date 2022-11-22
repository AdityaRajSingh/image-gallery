import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBoxInput = styled.input`
  width: 500px;
  height: 25px;
  border-radius: 16px;
  border: none;
  font-size: 16px;
  padding: 15px 16px;
  background: #eeeeee;
  &:focus {
    border: none;
    outline: none;
  }

  @media (max-width: 560px) {
    width: 90%;
  }

  @media (max-width: 440px) {
    width: 85%;
  }
`;

export const Gallery = styled.div`
  padding: 0 10px 10px;
  maxwidth: 1330px;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 100%;
  display: block;
`;
