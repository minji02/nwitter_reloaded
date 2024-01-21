import styled, { createGlobalStyle } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const GlobalStyles = createGlobalStyle`
  *::-webkit-scrollbar {
    display:none; 
  };
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
