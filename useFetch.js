import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {
    const isMounted = useRef(true); //la idea de esto es que mantenga la referencia de que si el componente sigue vivo o no. 

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        //El cuerpo de este useEffect no tiene nada, no quiero que haga nada. 
        return () => {
            isMounted.current = false;
            /**     ESTO ES PARA RESOLVER ESTA FALLA
             * 
             * Can't perform a React state update on an unmounted component. This is a no-op,
             *  but it indicates a memory leak in your application. To fix, cancel all subscriptions 
             * and asynchronous tasks in a useEffect cleanup function.
             */




        }   //Lo unico que quiero es que cuando se desmonte, cambie el valor del isMounted
    }, []);// Dependencia vacía: solo quiero que se ejecute cuando el componente se cargue por primera vez

    useEffect(() => {   /**Hace que se renderice el componente cuando hay cambios. Se ejecuta siempre una primera vez y luego cuando hay cambios en algo específico */

        setState({ data: null, loading: true, error: null });    //para que denuevo se ponga con los valores por defecto, al detectar un cambio en la url
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch(()=>{
                setState({
                    data:null,
                    loading:false,
                    error:'No se pudo cargar la info'
                })
            })
    }, [url]);

    return state;
}
