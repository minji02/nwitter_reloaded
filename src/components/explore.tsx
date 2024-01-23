import styled from "styled-components";

const Wrapper = styled.div`
  border-left: 1px solid #c5c5c565;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Search = styled.form`
  display: flex;
  svg {
    width: 30px;
    margin: 5px;
  }
  margin: 15px;
  background-color: #001a4d1e;
  border-radius: 20px;
  width: 100%;
  height: 35px;
`;

const SearchBar = styled.input`
  resize: none;
  border: 0;
  width: 100%;
  background-color: transparent;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const Premium = styled.div`
  background-color: #001a4d1e;
  height: 160px;
  width: 100%;
  margin-left: 20px;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 1.3;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  background-color: #001a4d;
  color: white;
  font-size: 13.5px;
  font-weight: 600;
  height: 35px;
  width: 90px;
`;

const Trend = styled.div`
  background-color: #001a4d1e;
  height: 500px;
  width: 100%;
  margin-left: 20px;
  border-radius: 20px;
  padding: 10px;
`;

const TrendTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export default function Explore() {
  return (
    <Wrapper>
      <Search>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <SearchBar type="text" />
      </Search>
      <Premium>
        <Title>Premium 구독하기</Title>
        <Text>
          구독하여 새로운 기능을 이용해 보세요. 자격을 충족하는 경우 광고 수익
          배분금도 받을 수 있습니다.
        </Text>
        <Button>구독하기</Button>
      </Premium>
      <Trend>
        <TrendTitle>나를 위한 트렌드</TrendTitle>
      </Trend>
    </Wrapper>
  );
}
