import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import ButtonFull from '../../components/Button/button';
import './style.css';
import {Link, useHistory} from 'react-router-dom';
// import imgUSenaiInova from '../../assets/images/senai_Inova.png';
// import add from '../../assets/images/mais_Cinza.png';
// import Button from '../../components/Button/Index';
// import Footer from '../../components/Footer/Index';
// import Header from '../../components/Header/Index';

//const [get, set]
function CadastrarVagas() {
    useEffect(() => {
        listarAreaVaga();
        FormaContratacao();
    },[])
    const [FormaContratacaomap, setFormaContratacaomap] = useState([]); //Para lista
    const [AreaVagamap, setAreaVagamap] = useState([]);
    const [IdVaga, setIdVaga] = useState(0);
    const [NomeVaga, setNomeVaga] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [Requisitos, setRequisitos] = useState('');
    const [Endereco, setEndereco] = useState('');
    const [NumeroCandidatos, setNumeroCandidatos] = useState(0);
    const [VagaAtiva, setVagaAtiva] = useState('');
    const [DataEncerramento, setDataEncerramento] = useState('');
    const [DataCadastro, setDataCadastro] = useState('');
    const [Salario, setSalario] = useState('');
    const [IdEmpresa, setIdEmpresa] = useState(0);
    const [IdFormaContratacao, setIdFormaContratacao] = useState('0');
    const [IdAreaVaga, setIdAreaVaga] = useState('0');
    const [Candidatura, setCandidatura] = useState('');

        //nao usar use effect pq ele carrega assim q esntrar na pagina
        //chave(api) e valor(react) 
    const Cadastrar = () => {
        const form = {
            nomeVaga: NomeVaga,
            descricao: Descricao,
            requisitos: Requisitos,
            endereco: Endereco,
            vagaAtiva: true,
            dataEncerramento: DataEncerramento,
            dataCadastro: DataCadastro,
            salario: Salario,
            idEmpresa: IdEmpresa,
            idFormaContratacao: IdFormaContratacao,
            idAreaVaga: IdAreaVaga,
        }
        console.log(JSON.stringify(form))
        const url = 'http://localhost:5000/api/Vaga';
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(CadastrarVagas),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-inova')
            }
        })
        .then(() =>{alert("Tudo certinho")})
        .catch(err => {
            console.error(err); //retornar um erro 
        });
    }
    const FormaContratacao = () => {
        fetch('http://localhost:5000/api/AreaVaga', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-inova')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setFormaContratacaomap(dados);
                console.log('' + FormaContratacaomap)

            })
            .catch(err => console.error(err));
    }

    const listarAreaVaga = () => {
        fetch('http://localhost:5000/api/AreaVaga', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-inova')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setAreaVagamap(dados);
                console.log('' + AreaVagamap)

            })
            .catch(err => console.error(err));
    }

    return (
        <div> 
            <div className="titulo">
                {/* <div className="img">
                    <img src={add} alt=""/>
                </div> */}
                <h1>Adicionar vaga</h1>
            </div>
            <div className='box'>
                {/* <Header/> */}
                <div className="form">
                    <form action="formulario" onSubmit={event => {
                        event.preventDefault();
                        Cadastrar();
                    }}>
                        <Input className="inputs" type="Text" name="titulovaga" label="NomeVaga" placeholder="Nome Vaga" required value={NomeVaga} onChange={e => setNomeVaga(e.target.value)} />
                        <select name='IdFormaContratacao' value={IdFormaContratacao} placeholder='FormaContratacao' onChange={e => setIdFormaContratacao(e.target.value)} required>
                            <option value='0' disabled >Forma de Contratacao</option>
                            {
                                FormaContratacaomap.map((item: any) =>{ //map = uma lista
                                    return <option key={item.IdFormaContratacao} value={item.IdFormaContratacao}>{item.nomeFormaContratacao}</option>
                                })
                            }
                        </select>

                        <select name='idareavaga' value={IdAreaVaga} placeholder='IdAreaVaga' onChange={e => setIdAreaVaga(e.target.value)} required>
                            <option value='0' disabled >Area</option>
                            {
                                AreaVagamap.map((item: any) =>{
                                    return <option key={item.IdAreaVaga} value={item.IdAreaVaga}>{item.nomeAreaVaga}</option>
                                })
                            }
                        </select>
                        <Input className="inputs" type="Text" name="salario" label="Salario" placeholder="Salario" required value={Salario} onChange={e => setSalario(e.target.value)}/>
                        <Input className="inputs" type="Text" name="descricao" label="Descricao" placeholder="Descricao" required value={Descricao} onChange={e => setDescricao(e.target.value)}/>
                        
                        <div className="row1">
                            <Input className="inputs" type="Text" name="requisitos" label="Requisitos" placeholder="Requisitos" required value={Requisitos} onChange={e => setRequisitos(e.target.value)}/>
                        </div>
                    </form>
                </div>
        </div>

                <div className="botoes">
                        <ButtonFull
                            name="Cadastrar"
                            tamanho="lg"/>
                    </div>

                    {/* <div className="logos">
                        <img src={imgUSenaiInova} /> 
                    </div> */}


                
            {/* <Footer/> */}
        </div>
    );
}
export default CadastrarVagas;