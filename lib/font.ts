import {Inter} from "next/font/google"
import localFont from "next/font/local";
    
export const inter = Inter({
    weight: ["100","200","300","400","500","600","700"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})
export const magda = localFont({
  src: "../public/Magda Text Regular.otf",
  variable: "--font-magda",
});