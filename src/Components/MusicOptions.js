import styled from "styled-components";

const DisplayBody = styled.div`
  display: flex;
  //background-color: white;
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align:start;
  flex-flow: wrap;
  padding: 0;
  margin: 0;
  //align-items: center;
  //justify-content: space-evenly;
  //align-items: center;
  overflow-y: scroll;
  scroll-snap-type: y mandatory; 
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar{
    display: none;
  }
`
const DisplayWindow=styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  //flex-grow: .5;
  //flex-basis: 50%;
  scroll-snap-align: start;
  width: 49%;
  border: dashed white 5px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  //height: 25vh;
`
const SliceyButton = styled.input`
  //background: rgba(0,0,0,0);
  color: aliceblue;
  //border-color: rgba(0,0,0,0);
  background: radial-gradient(ellipse 35% 35%, rgba(255,255,255,10%),transparent);
  height: 1lh;
  font-size: x-large;
  //margin: 15px;
  flex-basis: 30%;
  width:33%;  
  &:nth-child(2){
    flex-basis: 45%;
    width:50%;
  }
  &:first-child{
    flex-basis: 45%;
    width:50%;
  }
`

function MusicOptions(props){
    return(
        <DisplayBody>
            <DisplayWindow>
                <SliceyButton type={"button"} />
                <SliceyButton type={"button"} />
                <SliceyButton type={"button"} />
                <SliceyButton type={"button"} />
                <SliceyButton type={"button"} />
            </DisplayWindow>
            <DisplayWindow>test</DisplayWindow>
            <DisplayWindow>test</DisplayWindow>
            <DisplayWindow>test</DisplayWindow>
        </DisplayBody>
    )
}export default MusicOptions