import { ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react'
import { createContext } from 'react'
interface DarkThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
  }
  
export  const DarkThemeContext =createContext<DarkThemeContextType>({
    darkMode:false,
    toggleTheme:()=>{}
});

export const DarkThemeProvider:React.FC< { children :React.ReactNode}>=({children}) => {
    const [dark, setDarkTheme]=useState(false);

    // const toggleTheme=()=>setDarkTheme(prevstate=>!prevstate);
     const theme = createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      });
    return(
    <DarkThemeContext.Provider value={{darkMode:dark,toggleTheme:()=>setDarkTheme(prevstate=>!prevstate)}}>
        <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
    </DarkThemeContext.Provider>
    )
}
