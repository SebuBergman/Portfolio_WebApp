import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

export const GlobalStyles = styled.createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fonts.dmsans}, sans-serif;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }

  html {
    width: 100%;
    scroll-behavior: smooth;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.poppins},
      sans-serif ${"!important"};
  }

  button {
    font-family: ${({ theme }) => theme.fonts.roboto},
      sans-serif ${"!important"};
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
