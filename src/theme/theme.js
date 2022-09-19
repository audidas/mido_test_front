import { createTheme } from "@mui/material";

export const chipTheme =createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette:{
    person:{
      main:"#ffcc5c",
      contrastText: '#fff'
    },
    organization:{
      main:"#71CD9F",
      contrastText: '#fff'
    },
    geopoliticalEntity:{
      main:"#FF8303",
      contrastText: '#fff'
    },
    location:{
      main:"#DD9EF7",
      contrastText: '#fff'
    },
    facility:{
      main:"#F8739E",
      contrastText: '#fff'
    },
    vehicle:{
      main:"#3065AC",
      contrastText: '#fff'
    },
    weapon:{
      main:"#6CBEF4",
      contrastText: '#fff'
    },
    other:{
      main:"#7a8392",
      contrastText: '#fff'
    },
  }
})