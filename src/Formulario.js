import {useEffect, useState} from "react";

export default function Formulario({handleFinanciamento}){

    const [tipos, setTipos]  = useState();
    const [mensalidades, setMensalidades]  = useState();
    const [valor, setValor]  = useState(0);
    const [tipo, setTipo]  = useState(0);
    const [mensalidade, setMensalidade]  = useState(12);


    function onChangeValor(event) {
        setValor(event.target.value);
    }

    function onChangeTipo(event) {
        setTipo(event.target.value);
    }

    function onChangeMensalidade(event) {
        setMensalidade(event.target.value);
    }

    const onSubmitCalc = async()=> {
        if (mensalidade === undefined || tipo === undefined || valor === undefined){
            alert("Falta dados")
        }
        const response = await fetch(
            "/prestacoes/getValor?mensalidades=" + mensalidade + "&financiamento=" + tipo + "&valor=" + valor
        ).then(response => response.json());
        handleFinanciamento(response)
    }

    const getTipos = async() => {
        if(tipos !== undefined)
            return;
        try {
            const response = await fetch(
                "/financiamento/getTipos"
            ).then(response => response.json())
            setTipos(response);
        } catch (err) {
            setTipos(null);
        }
    };

    const getMensalidades = async() => {
        try {
            if(tipo === undefined || tipo === null)
                return;
            const response = await fetch(
                "/financiamento/getListaMensalidades/"+tipo
            ).then(response => response.json())
            setMensalidades(response)
        } catch (err) {
            setMensalidades(null);
        }
    };

    useEffect(() => {
        getTipos();
    });

    useEffect(() => {
        getMensalidades();
    }, [tipo]);

    return (
        <form>
            <p>Tipo de Financiamento:
            <select value={tipo} onChange={onChangeTipo}>
                {tipos && tipos.map((item, index) =>
                    (<option key={item} value={index} >{item}</option>)
                )}
            </select>
            </p>
            <p>Mensalidades:
                <select value={mensalidade} onChange={onChangeMensalidade}>
                    {mensalidades && mensalidades.map((item) =>
                        (<option key={item} value={item}>{item}</option>)
                    )}
                </select>
            </p>
            <p>Valor:
                <input type="text"  name="Valor" onChange={onChangeValor} value={valor} title={"Valor"} />
            </p>
            <p>
                <input type="button" name="submit" value="Calcular" onClick={onSubmitCalc}/>
            </p>
        </form>
    );


}