import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  const myTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };

  return (
    <ThemeProvider value={myTheme}>
      <Stack />
    </ThemeProvider>
  );
}
