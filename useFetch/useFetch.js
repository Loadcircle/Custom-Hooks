import { useEffect, useRef, useState } from "react"

export const useFetch = (url, initialState = {data: null, loading: true, error: null}) => {

    const isMounted = useRef(true)

    const [state, setState] = useState(initialState);

    useEffect(()=>{

        return()=>{
            isMounted.current = false;
        }

    }, [])

    useEffect(() => {
        setState({...initialState, loading: true})
        fetch(url)
            .then(resp=>resp.json())
            .then(data=>{
                if(isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data,
                    });
                }
            })
            .catch(()=>{
                if(isMounted.current){
                    setState({
                        loading: false,
                        error: 'No se pudo cargar la data',
                        data: null,
                    });
                }
            });


    }, [url])

    return state;
    
}
