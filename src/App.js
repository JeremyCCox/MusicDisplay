import MusicDisplay from "./Components/MusicDisplay";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    background-color: rgb(0, 0, 51);
  }
`

function App(){
    return(
        <>
            <GlobalStyle/>
            <MusicDisplay/>
        </>

    )
}export default App;