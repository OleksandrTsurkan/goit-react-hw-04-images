import { styled } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
`;

export const Modaldiv = styled.div`
  background-color: white;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
