import styled from "@emotion/styled";

export const ClosedLayerIcon = styled.img`
  height: 90%;
  width: 90%;
`;

export const ClosedLayerToggle = styled.button`
  position: relative;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 4pt;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 34pt;
  width: 34pt;
  &:hover {
    cursor: pointer;
    background-color: #eee;
    border: 1pt solid black;
  }
`;
