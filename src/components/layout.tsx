import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Explore from "./explore";
import Menu from "./menu";

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  max-width: 1200px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
      <Explore />
    </Wrapper>
  );
}
