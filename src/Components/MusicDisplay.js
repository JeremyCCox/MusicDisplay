import styled from "styled-components";
import {useReducer, useState} from "react";
import MP3Tag from "mp3tag.js"


const DisplayBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //align-items: center;
  justify-content: space-evenly;
  align-items: center;
`
const MusicBox = styled.div`
  margin-top: 15%;
  width: 360px;
  height: 360px;
  border:solid 2px white;
  border-radius: 5px;
  background-image: url(${(props) => props.url});
`
const MusicInfo = styled.div`
  //background-color: rgb(0, 0, 77);
  //background-image: linear-gradient(45deg, white , transparent, transparent, transparent, white );
  width: 500px;
  height: 200px;
  display: flex;
  flex-flow: row wrap;
`
const InfoInput = styled.input`
  padding: 5px;
  margin: 5px;
  border-image: linear-gradient(10deg, white 1%, transparent 25%, transparent 75%,white 99%) 10%10%;
  border-width: 2px;
  background-color: transparent;
  //background-image:radial-gradient(circle,rgba(0,0,81,20),rgba(0,0,81,0)) ;
  color:white;
  font-size: large;
  height: 1lh;
  text-align: center;
  &:hover{
    border-image: linear-gradient(10deg, white 1%, transparent 35%, transparent 65%,white 99%) 10% 10%;
  }
  &:focus{
    border-image: linear-gradient(10deg, white 5%, transparent 45%, transparent 55%,white 95%) 10% 10%;
    outline: none;
  }
  &:first-child{
    flex-basis: 100%;
  }
  transition: border-image 1s;
  &::placeholder{
    color:rgba(255,255,255,25%);
    //text-align: center;
  }
`
const InfoInputGradient = styled.input`
  border-image: linear-gradient(45deg, white , transparent, white );
  background-image: linear-gradient(45deg, white , transparent, white );
`
const InfoDivGradient = styled.div`
  border-image: radial-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34.48%, rgba(0,0,0,0) 100%);
  background-image: linear-gradient(top to bottom,red , transparent, red);
`

const trackReducer = (state,action) =>{
    switch (action.type){
        case("setAttrib"):
            return {
                ...state,
                [action.attrib]: action.value
            }
        case("setTags"):
            return {
                ...state,
                title: action.tags.title,
                artist: action.tags.artist,
                album: action.tags.album,
                genre: action.tags.genre,
                comment: action.tags.comment,
                year: action.tags.year,
                track: action.tags.track

            }
        case("change"):
            return {
                ...state,
                [action.tag]:action.value
            }
    }
}


function MusicDisplay(props){
    const [track, trackDispatch] = useReducer(trackReducer,{},undefined)
    const [buffer,setBuffer]=useState()
    const dropImage=async (e)=>{
        e.preventDefault()
        e.stopPropagation()
        let files = e.dataTransfer.files;
        if(files && files[0]){
            for(const file of files){
                console.log(file)
                switch (true){
                    case(file.type.includes("image")):
                        readImage(file)
                        break
                    case(file.type.includes("audio")):
                        readAudio(file)
                        getMetaData(file)
                        getImage(file)
                        trackDispatch({type:"change",tag:"name",value:file.name})
                        break
                    default:
                        console.log(file)
                }
            }
        }
    }
    const readImage=(file)=>{
        const reader = new FileReader();
        reader.onloadend=()=>{
            let img = document.createElement("img");
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.height=360;
                canvas.width=360;

                ctx.drawImage(this, 0, 0, 360, 360);


                let uri = canvas.toDataURL();
                trackDispatch({type:"setAttrib",attrib:"image",value:uri})
            }
            img.onerror=(error)=>{
                console.error(error)
            }
            img.src = reader.result;

        }
        reader.readAsDataURL(file);
    }
    const readAudio=(file)=>{
        const reader = new FileReader();
        reader.onloadend=()=>{
            trackDispatch({type:"setAttrib",attrib:"audio",value:reader.result})
            reader.result
        }
        reader.readAsDataURL(file);

    }
    const getImage=(apic)=>{
        let reader = new FileReader()
        reader.onload=()=>{
            let img= document.createElement("img")
            img.onloadend=()=> {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.height = 360;
                canvas.width = 360;

                ctx.drawImage(img, 0, 0, 360, 360);

                let uri = canvas.toDataURL();
                console.log("imgUri", uri)
                trackDispatch({type: "setAttrib", attrib: "image", value: uri})
            }
            img.src= "data:"+apic.format+";base256,"+apic.data;
        }
        let blob = new Blob(apic.data)
        reader.readAsBinaryString(blob)
        // (apic.data)

    }
    const getMetaData=(file)=>{
        var reader = new FileReader();
        reader.onloadend = async function () {
            let buff = reader.result;
            let mp3Tag = new MP3Tag(buff)
            mp3Tag.read();
            console.log(mp3Tag.tags.picture)
            trackDispatch({type: "setTags", tags: mp3Tag.tags})
            trackDispatch({type: "change", tag:"extension",value:"lll"})
            if (mp3Tag.error !== '') throw new Error(mp3Tag.error)
            setBuffer(buff)
        }
        reader.readAsArrayBuffer(file)
    }
    const writeMetaData= async (buffer)=> {
        return new Promise((resolve)=>{
            let mp3Tag = new MP3Tag(buffer)
            mp3Tag.read()
            mp3Tag.tags.album = track.album
            mp3Tag.tags.artist = track.artist
            mp3Tag.tags.track = track.track
            mp3Tag.tags.title = track.title
            mp3Tag.tags.year = track.year
            mp3Tag.tags.comment = track.comment
            mp3Tag.tags.genre = track.genre
            trackDispatch({type: "setTags", tags: mp3Tag.tags})
            mp3Tag.save()
            getImage(mp3Tag.tags.v2.APIC[0])
            if(mp3Tag.error!==""){
                console.log("Error: ",mp3Tag.error)
            }
            let blob = new Blob([mp3Tag.buffer])
            let a = document.createElement("a");
            a.download=track.name
            a.href= window.URL.createObjectURL(blob)
            document.body.appendChild(a)
            // a.click()
            a.remove()
            resolve(mp3Tag.buffer)
        });
    }

    const saveChanges=()=>{
        writeMetaData(buffer).then(res=> {
            setBuffer(res)
        })
    }
const changeTag=(e)=>{
    trackDispatch({type:"change",tag:e.target.id,value:e.target.value})
}
    return(
        <DisplayBody>
            <MusicBox url={track.image} onDrop={dropImage} onDragOver={e=>e.preventDefault()} >

            </MusicBox>
            <audio id={"audio"} src={track.audio} controls/>
            <input type={"button"} onClick={saveChanges}/>
            <MusicInfo>
                <InfoInput id={"track"} placeholder={"Track Title"} value={track.title} onChange={changeTag}/>
                <InfoInput id={"artist"} placeholder={"Artist"} value={track.artist} onChange={changeTag}/>
                <InfoInput id={"album"} placeholder={"Album"} value={track.album} onChange={changeTag}/>
            </MusicInfo>
        </DisplayBody>
    )
}export default MusicDisplay;