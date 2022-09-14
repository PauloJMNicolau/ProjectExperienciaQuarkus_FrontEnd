import {useState} from "react";

export default function Financiamento({financiamento, tabelaVisivel}){

    const [nome, setNome] = useState('');
    const [contacto, setContacto] = useState('');
    const [camposVisivel , setCamposVisivel] = useState(false);


    const handleSave = async () => {
        if(financiamento === undefined){
            alert("Necessário calcular primeiro");
            return;
        }
        if(!camposVisivel) {
            setCamposVisivel(true)
            if (nome.length === 0 || contacto.length === 0) {
                alert("Necessário indicar nome e contacto")
                return;
            }

        }
        financiamento.nome = nome;
        financiamento.contacto = contacto;
        const response = await fetch("/prestacoes/salvar", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(financiamento)
        })
        if(response.ok && (response.status >= 200 && response.status<= 299))
            alert("Registo guardado");
        else
            alert(response.statusText)
    }
    const TiposFinanciamento = {
        "EXTERNO": 0,
        "INTERNO": 1
    }

    function onChangeNome(event){
        setNome(event.target.value);
    }


    function onChangeContacto(event){
        setContacto(event.target.value);
    }


    return (
        <div className={tabelaVisivel ? "tabelaSpace": "tabelaEscondida"} >
            <table border={1} className="tabela">
                <thead>
                <tr>
                    <th colSpan={2}>Financiamento</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="tabelaLabel">Valor Compra</td>
                    <td>{financiamento?.valor}</td>
                </tr>
                <tr>
                    <td className="tabelaLabel">Nº Mensalidades</td>
                    <td>{financiamento?.mensalidades}</td>
                </tr>
                <tr>
                    <td className="tabelaLabel">Tipo Financiamento</td>
                    <td>{financiamento !== undefined && financiamento?.tipo === TiposFinanciamento.EXTERNO.valueOf() ? "Externo" : "Interno" }</td>
                </tr>
                <tr>
                    <td className="tabelaLabel">Prestação Mensal</td>
                    <td>{financiamento?.prestacao}</td>
                </tr>
                <tr className={camposVisivel ? "": "tabelaEscondida"}>
                    <td className="tabelaLabel">Nome</td>
                    <td>
                        <input type="text"  name="nome" onChange={onChangeNome} value={nome} title={"nome"} />
                    </td>
                </tr>
                <tr className={camposVisivel ? "": "tabelaEscondida"}>
                    <td className="tabelaLabel">Contacto</td>
                    <td>
                        <input type="text"  name="contacto" onChange={onChangeContacto} value={contacto} title={"contacto"} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <input className="buttonStyle" type="button" onClick={handleSave} value={"Salvar"}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}