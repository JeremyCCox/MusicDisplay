import MusicDisplay from "../src/Components/MusicDisplay";
import styled, {createGlobalStyle} from "styled-components";
import MusicOptions from "../src/Components/MusicOptions";

const GlobalStyle = createGlobalStyle`
  html{
    scroll-snap-type: y mandatory;
  }
  body{
    background-color: rgb(0, 0, 51);
    
    //scroll-snap-stop: normal;
    overflow-y:hidden;
  }
`
const ScrollZone = styled.div`
  overflow-y: scroll;
  height: 100vh;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar{
    display: none;
  }
`

function App(){
    return(
        <>
            <GlobalStyle/>
            <ScrollZone>
                <MusicDisplay/>
                <MusicOptions/>
            </ScrollZone>
        </>

    )
}export default App;