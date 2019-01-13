import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Produtora extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData(this);
    }
    componentWillReceiveProps(nextProps) {
        this.getData(this);
    }
    getData(ev){
        axios.get('/getAll')
        .then(function(response) {
              ev.setState({data: response.data});
              });
    }
    render() {
        return (
                <div>
                    <div className="container-fluid masonry">
                        <div className="row">
                            <div className="col-md-6 text-menu">
                                Produtora brasileira de cinema, teatro e televisão com 16 anos de experiência, a ARUAC Filmes visa realizar projetos de qualidade no que concerne a forma e conteúdo artísticos sempre alinhada com a criação de trabalhos autorais e na experimentação de linguagem. Com uma longa e consistente trajetória no mercado audiovisual brasileiro, teve seus filmes selecionados em festivais importantes como Cannes, Veneza, Rotterdam, Sundance, Bafici, Locarno, New Directors/New Movies (MoMA – NY), Guadalajara, Barcelona, Havana, Montreal e Tribeca.<br/><br/>

                                A ARUAC também recebeu inúmeros prêmios no Brasil e no exterior, sendo o último o prêmio L'Oeil d'Or de melhor documentário no Festival de Cannes de 2016 com o filme “CINEMA NOVO”, direção de Eryk Rocha. Atualmente, prepara o longa de ficção “BREVES MIRAGENS DE SOL”, que será filmado no segundo semestre de 2017, e ainda "XINGU", primeira etapa da trilogia teatral “MARGENS - sobre rios, crocodilos e vaga-lumes”.
                            </div>
                            <div className="col-md-6 text-menu">
                                <img className="img-responsive cartazes" src="img/cartazes/campo_de_jogo.jpg"/>
                                <img className="img-responsive cartazes" src="img/cartazes/cinema_novo.jpg"/><br/>
                                <img className="img-responsive cartazes" src="img/cartazes/exilados.jpg"/>
                                <img className="img-responsive cartazes" src="img/cartazes/rocha_que_voa.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
                );
    }
}

export default Produtora;
