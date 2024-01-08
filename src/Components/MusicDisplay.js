import styled from "styled-components";
import {useState} from "react";
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
  background-color: rgb(0, 0, 77);
  width: 450px;
  height: 200px;
`

function MusicDisplay(props){
    const [imageSource,setImageSource] = useState("")
    const [audioSource,setAudioSource] = useState("")

    const dropImage=async (e)=>{
        e.preventDefault()
        e.stopPropagation()
        let files = e.dataTransfer.files;
        if(files && files[0]){
            for(const file of files){
                switch (true){
                    case(file.type.includes("image")):
                        readImage(file)
                        break
                    case(file.type.includes("audio")):
                        readAudio(file)
                        getMetaData(file)
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
            // console.log(reader.result)
            let img = document.createElement("img");
            img.onload = function () {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                // console.log(img.width)
                canvas.height=360;
                canvas.width=360;

                ctx.drawImage(this, 0, 0, 360, 360);


                let uri = canvas.toDataURL();
                setImageSource(uri)
            }
            img.onerror=(error)=>{
                console.error(error)
            }
            img.src = reader.result;

        }
        reader.readAsDataURL(file);
    }
    const audio = document.createElement("audio");
    const readAudio=(file)=>{
        // const url = URL.createObjectURL(file)
        // setAudioSource(url)
        console.log(file)
        const reader = new FileReader();
        reader.onloadend=()=>{

            // let audioBlob = new Blob(reader.result, {type: 'audio/wav'})
            setAudioSource(reader.result)
        }
        reader.readAsDataURL(file);

    }
    function readString(dataView, offset, length) {
        var o = '';
        for (var i = offset; i < offset + length; i++) {
            // keep only printable characters
            if (i >= 32) o += String.fromCharCode(dataView.getUint8(i));
        }
        return o;
    }
    const getMetaData=(file)=>{
        var blob = file.slice(file.size - 128, file.size);
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var buff = evt.target.result;
            let mp3Tag = new MP3Tag(buff, true)
        }
        // reader.onloadend=()=>{
        //     let length = reader.result.byteLength;
        //     let dv = new DataView(reader.result,length-128, 128)
        // }
        console.log(blob)
        reader.readAsArrayBuffer(blob)
    }
    return(
        <DisplayBody>
            <MusicBox url={imageSource} onDrop={dropImage} onDragOver={e=>e.preventDefault()} >

            </MusicBox>
            <audio id={"audio"} src={audioSource} controls/>
            <MusicInfo></MusicInfo>
        </DisplayBody>
    )
}export default MusicDisplay;