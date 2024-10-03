import styled from "@emotion/styled";

export const ClosedLayerIcon = styled.img`
  height: 60%;
  width: 60%;
`;

export const ClosedLayerToggle = styled.button`
  position: relative;
  padding-top: 5px;
  margin-top: 5px;
  border: none;
  border-radius: 4pt;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 30px;
  width: 30px;
  &:hover {
    cursor: pointer;
    background-color: #eee;
    border: 1pt solid black;
  }
  @media (max-width: 900px) {
    height: 50px;
    width: 50px;
  }
`;
