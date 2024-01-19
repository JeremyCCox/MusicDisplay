import {createContext, useContext} from "react";

const TrackContext = createContext();

export function TrackProvider({children}){

    const tryDb=async () => {

    }

    return(
        <TrackContext.Provider value={{
            tryDb
        }}>
            {children}
        </TrackContext.Provider>
    )
}

export function useTrackContext(){
    return useContext(TrackContext)
}