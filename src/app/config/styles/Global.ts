import { createGlobalStyle } from "styled-components";
import { FontFamilies } from "./FontFamilies";
import { Colors } from "./Colors";

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
    font-family: ${() => FontFamilies.dmsans}, sans-serif;
    color: ${() => Colors.white};
    background-color: ${() => Colors.backgroundGrey};
  }

  html {
    width: 100%;
    scroll-behavior: smooth;
  }

  h1 {
    font-family: ${() => FontFamilies.poppins}, sans-serif ${"!important"};
  }

  button {
    font-family: ${() => FontFamilies.roboto}, sans-serif ${"!important"};
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  .dashboard-section {
    color: #111;
    background-color: #f9f9f9;
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
