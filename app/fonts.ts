import { Inter, Playfair_Display } from "next/font/google";

export const fontSans = Inter({ subsets:["latin"], display:"swap", weight:["400","600","700"]});

export const fontSerif = Playfair_Display({ 
  subsets:["latin"], 
  display:"swap", 
  weight:["700","900"]
});
