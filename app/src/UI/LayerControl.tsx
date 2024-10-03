import styled from "@emotion/styled";

export const ClosedLayerIcon = styled.img`
  height: 75%;
  width: 75%;
`;

export const ClosedLayerToggle = styled.button`
  position: relative;
  padding-top: 5px;
  margin-top: 5px;
  border: none;
  border-radius: 5pt;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 32px;
  width: 32px;
  @media (max-width: 900px) {
    height: 50px;
    width: 50px;
    border-radius: 8pt;
  }
`;
