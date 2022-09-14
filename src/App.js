import './App.css';
import Formulario from "./Formulario";
import {useState} from "react";

function App() {
    const [financiamento , setFinanciamento] = useState();

    const TiposFinanciamento = {
        "EXTERNO": 0,
        "INTERNO": 1
    }

    function handleFinanciamento(financiamento){
        setFinanciamento(financiamento)
    }

    function handleSave(){
        financiamento.nome="Paulo";
        financiamento.contacto="926005024";
        fetch("/prestacoes/salvar", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(financiamento)
        })
        console.log("Teste");
    }

    return (
        <div className="App">
            <Formulario handleFinanciamento={handleFinanciamento}/>
            <div>
                <table border={1}>
                    <thead>
                    <tr>
                        <th colSpan={2}>Financiamento</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>Valor Compra</td>
                        <td>{financiamento?.valor}</td>
                    </tr>
                    <tr>
                        <td>Nº Mensalidades</td>
                        <td>{financiamento?.mensalidades}</td>
                    </tr>
                    <tr>
                        <td>Tipo Financiamento</td>
                        <td>{financiamento?.tipo === TiposFinanciamento.EXTERNO.valueOf() ? "Externo" : "Interno" }</td>
                    </tr>
                    <tr>
                        <td>Prestação Mensal</td>
                        <td>{financiamento?.prestacao}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <input type="button" onClick={handleSave} value={"Salvar"}/>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default App;
