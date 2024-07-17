import { createContext } from "react";

const PreferenceContext = createContext({
    theme: "",
    ToggleTheme: () => {}
});

export default PreferenceContext;