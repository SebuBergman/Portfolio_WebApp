import { type LinkProps, createTheme } from "@mui/material";
import { FontFamilies } from "./FontFamilies";
import { FontWeights } from "./FontWeights";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#ffffff",
      dark: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },
    grey: {
      [100]: "#1A191D",
    },
    error: {
      main: "#EB5757",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontFamily: FontFamilies.roboto,
          fontWeight: FontWeights.regular,
          fontSize: "1rem",
          lineHeight: "1.5rem",
          color: "#000000",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1.313rem",
          fontFamily: FontFamilies.roboto,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          "& svg": {
            fontSize: "1.5 !important",
          },
        },
        endIcon: {
          "& svg": {
            fontSize: "1.5 !important",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#248823",
          },
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.bold,
  fontSize: "2rem",
  lineHeight: "3rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "2.25rem",
  },
};

theme.typography.h2 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  fontSize: "1.875rem",
  lineHeight: "2.813rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.375rem",
    lineHeight: "2.063rem",
  },
};

theme.typography.h3 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  fontSize: "1.7rem",
  lineHeight: "2.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.3rem",
    lineHeight: "1.955rem",
  },
};

theme.typography.h4 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  fontSize: "1.5rem",
  lineHeight: "2.25rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
};

theme.typography.h5 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  fontSize: "1.375rem",
  lineHeight: "2.063rem",
};

theme.typography.h6 = {
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  fontSize: "1.25rem",
  lineHeight: "1.875rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  },
};

theme.typography.body1 = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.regular,
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.body2 = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.semibold,
  fontSize: "1.125rem",
  lineHeight: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.subtitle1 = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.regular,
  fontSize: "1rem",
  lineHeight: "1.5rem",
};

theme.typography.subtitle2 = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.semibold,
  fontSize: "1rem",
  lineHeight: "1.5rem",
};

theme.typography.caption = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.regular,
  fontSize: "1rem",
  lineHeight: "1.313rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
  },
};

theme.typography.button = {
  fontFamily: FontFamilies.dmsans,
  fontWeight: FontWeights.semibold,
  fontSize: "1.125rem",
  lineHeight: "1.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.2rem",
  },
};

export default theme;
