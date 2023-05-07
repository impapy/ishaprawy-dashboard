import { createTheme } from "@mui/material/styles"

const muiTheme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    allVariants: { color: "#15170F" },
    h5: { fontWeight: 500 },
    body2: { fontWeight: 500 },
  },
  palette: {
    primary: { main: "#6363FC" },
    secondary: { main: "#9CCEA6" },
    background: { default: "#F9FAFB" },
    text: { secondary: "#667085" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiStepConnector: {
      styleOverrides: { line: ({ theme }) => `border-color: ${theme.palette.secondary.main};` },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: ({ theme }) => `
          fill: ${theme.palette.secondary.main};
        `,
      },
    },
    MuiButton: {
      styleOverrides: {
        containedSecondary: `color: white;`,
        root: `
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
          text-transform: initial;
          font-weight: 500;
          font-size: 20px;
          padding: 8px 40px;
          `,
      },
    },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: ({ theme }) => `
    //       background: #fff;
    //       border: 1px solid #EAECF0;
    //       box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    //       border-radius: ${theme.shape.borderRadius};
    //       &::after, &::before {
    //         display: none;
    //       }`,
    //   },
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => `
          padding-top: 0 !important;
          padding-left: 0 !important;
          padding-bottom: 0 !important;
          background: #F9FAFB;
        `,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: `padding:14px !important`,
      },
    },
  },
})

export default muiTheme
