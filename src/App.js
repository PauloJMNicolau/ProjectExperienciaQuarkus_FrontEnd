import './App.css';
import Formulario from "./Formulario";
import {useState} from "react";
import Financiamento from "./Financiamento";

function App() {
    const [financiamento , setFinanciamento] = useState();
    const [tabelaVisivel, setTabelaVisivel] = useState(false);


    function handleFinanciamento(financiamento){
        setFinanciamento(financiamento)
        if(financiamento !== undefined)
            handleVisibilidade(true)
    }

    function handleVisibilidade(visibilidade){
        setTabelaVisivel(visibilidade)
    }

    return (
        <div className="App">
            <section className="headerFormulario">
                <h1>Cálculo de Prestações</h1>
            </section>
            <div className="conteudo">
                <Formulario handleFinanciamento={handleFinanciamento}/>
                <Financiamento financiamento={financiamento} tabelaVisivel={tabelaVisivel}/>
            </div>
        </div>
    );
}

export default App;
