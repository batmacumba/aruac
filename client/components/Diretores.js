import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Diretores extends React.Component {
    constructor() {
        super();
        this.state = {info: []};
        this.getInfo = this.getInfo.bind(this);
    }
    componentDidMount() {
        this.getInfo(this);
    }

    getInfo(ev){
        axios.get('/getInfo')
        .then(function(response) {
            ev.setState({info: response.data});
        });
    }

    render() {
        return (
                <div className="masonry text-timeline">
                <Tabs>
                    <TabList>
                      <Tab>Eryk Rocha</Tab>
                      <Tab>Paula Gaitán</Tab>
                      <Tab>Gabriela Cunha</Tab>
                    </TabList>

                    <TabPanel>
                      <p>
                      Em 2004, Eryk Rocha realizou o curta-metragem “Quimera”, o filme integrou a competição oficial dos festivais de Cannes (2004) e Sundance (2006) e participou em vários festivais no Brasil e no exterior, como Montreal, Nova York, Bilbao, Coréia do Sul e Havana e recebeu o prêmio de melhor curta- metragem no Festival Internacional de Montevideo (2005) e no Festival de Belém (2004).
                      Em 2006, seu segundo longa-metragem “Intervalo Clandestino” é selecionado, entre outros festivais, para Montreal, Montevidéu, Guadalajara, Popolli, recebendo o prêmio Menção Honrosa especial no festival de Guadalajara.<br/><br/>
                      Em 2010 lançou o filme “Pachamama” que foi exibido em 15 Festivais Internacionais e ganhou o prêmio de melhor longa metragem documental no Cineport 2009.<br/><br/>
                      Em 2011 lança no circuito seu primeiro longa-metragem de ficção “Transeunte”. O filme participou do prestigioso Telluride Film Festival no U.S.A. Também participou dos Festivais de Biarritz, na frança, Istambul (túrquia), Havana (Cuba) Guadalajara (méxico), Marseille (França), Vancouver (Canadá), Amsterdam (Holanda), Entre outros. “Transeunte”, foi lançado pelo Museu de Dusseldorf em 12 cidades da Alemanha. O filme foi escolhido pela Abraccine (Associação brasileira de criticos) o melhor longa- metragem brasileiro de 2011, e Fernando Bezerra foi eleito o melhor ator de cinema do ano Premio APCA. O filme ganhou 25 prêmios em festivais nacionais e internacionais. Entre eles, o prêmio da crítica e de melhor ator no Festival de Brasília 2010, o prêmio de melhor filme eleito pelo público no Festival Latino- Americano de São Paulo em 2011, e o prémio de melhor ópera prima no festival e Guadalajara, México.<br/><br/>
                      Em 2013, lançou o documentário “Jards” com o qual recebeu o prêmio de Melhor diretor no Festival do Rio. A première internacional do filme aconteceu no "New Directors 2013" no MOMA e no Lincoln Center em Nova Iorque. O filme também foi exibido no indie Lisboa de Portugal, Mar del plata Argentina, entre outros.<br/><br/>
                      Ainda em 2013, foi convidado pela Canana Films, do ator mexicano Gael Garcia Bernal, para participar do projeto graduate XXI, que originou o longa- metragem “El Aula Vacía" que é financiado pelo BID - Banco Interamericano de Desenvolvimento. O filme é composto por dez curtas-metragens de diversos diretores latino-americanos sobre o tema da evasão escolar. Eryk realizou o curta-metragem "IGOR" que mostra um dia na vida do aspirante a ator e capoerista Igor, morador do Morro dos Prazeres. "El Aula Vacía" foi lançado nos festivais internacionais em 2015, foi exibido nos festivais de Guadalajara (México), Bafici (Argentina), Málaga (Espanha) entre outros.<br/><br/>
                      Em 2015, lançou seu sexto longa-metragem, o documentário “Campo de Jogo”. O filme foi exibido nos festivais: London International Film Festival, CPH: DOX Copenhague International Film Festival, Fortnigth Documentary Film Festival - MoMA e no Festival de Toulouse na França, além dos festivais nacionais: Mostra de Cinema de São Paulo e Festival do Rio. “Campo de Jogo” foi lançado no circuito de cinemas do Brasil Jem ulho de 2015 e lançado no EUA em Dezembro de 2015 pela distribuidora Cinema Slater.<br/><br/>
                      Em 2016, estreou “Cinema Novo”, que teve estreia mundial no Festival de Cannes 2016, onde recebeu o prêmio Olho de Ouro (L ́Oeil D ́or) de melhor documentário do festival. “Cinema Novo” estreou no circuito de cinema do Brasil em Novembro de 2016 sendo exibido em mais de 50 festivais, entre eles na prestigiosa sessão Contenders no MoMA de Nova York entre os doze melhores filmes de 2016. Com sua linguagem inovadora “Cinema Novo” conquistou público e crítica, lhe rendendo diversos prêmios tanto no Brasil quanto no exterior, entre eles, o Colon de Plata no Festival de Huelva na Espanha. Foi escolhido no Festival Sesc melhores do ano o Melhor Documentário documentário de 2016 – pela critica e Público, e ganhou o prêmio APCA 2016 de Melhor Documentário . Em 2017 “Cinema Novo” será lançado nos cinemas da Espanha, Portugal, Estados Unidos, Itália e México.<br/><br/>
                      Em final de 2016 o Festival Porto/Post/Doc (Portugal) realizou uma retrospectiva da obra integral de Eryk Rocha, considerando-o uma das lentes mais poéticas e explosivas do cinema brasileiro contemporaneo.<br/><br/>
                      </p>
                    </TabPanel>
                    <TabPanel>
                      <p>
                        <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (<i>English: /luˈiːdʒi/;
                        Italian: [luˈiːdʒi]</i>) is a fictional character featured in video games and related media
                        released by Nintendo. Created by prominent game designer Shigeru Miyamoto, Luigi is portrayed
                        as the slightly younger but taller fraternal twin brother of Nintendo's mascot Mario, and
                        appears in many games throughout the Mario franchise, often as a sidekick to his brother.
                      </p>
                      <p>
                        Source:{' '}
                        <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
                          Wikipedia
                        </a>
                      </p>
                    </TabPanel>
                    <TabPanel>
                      <p>
                        <b>Princess Peach</b> (<i>Japanese: ピーチ姫 Hepburn: Pīchi-hime, [piː.tɕi̥ çi̥.me]</i>)
                        is a character in Nintendo's Mario franchise. Originally created by Shigeru Miyamoto,
                        Peach is the princess of the fictional Mushroom Kingdom, which is constantly under
                        attack by Bowser. She often plays the damsel in distress role within the series and
                        is the lead female. She is often portrayed as Mario's love interest and has appeared
                        in Super Princess Peach, where she is the main playable character.
                      </p>
                      <p>
                        Source:{' '}
                        <a href="https://en.wikipedia.org/wiki/Princess_Peach" target="_blank">
                          Wikipedia
                        </a>
                      </p>
                    </TabPanel>
                    <TabPanel>
                      <p>
                        <b>Yoshi</b> (<i>ヨッシー Yosshī, [joɕ.ɕiː]</i>) (<i>English: /ˈjoʊʃi/ or /ˈjɒʃi/</i>), once
                        romanized as Yossy, is a fictional anthropomorphic dinosaur who appears in
                        video games published by Nintendo. Yoshi debuted in Super Mario World (1990) on the
                        Super Nintendo Entertainment System as Mario and Luigi's sidekick. Yoshi later starred
                        in platform and puzzle games, including Super Mario World 2: Yoshi's Island, Yoshi's Story
                        and Yoshi's Woolly World. Yoshi also appears in many of the Mario spin-off games, including
                        Mario Party and Mario Kart, various Mario sports games, and Nintendo's crossover fighting
                        game series Super Smash Bros. Yoshi belongs to the species of the same name, which is
                        characterized by their variety of colors.
                      </p>
                      <p>
                        Source:{' '}
                        <a href="https://en.wikipedia.org/wiki/Yoshi" target="_blank">
                          Wikipedia
                        </a>
                      </p>
                    </TabPanel>
                    <TabPanel>
                      <p>
                        <b>Toad</b> (<i>Japanese: キノピオ Hepburn: Kinopio</i>) is a fictional character who primarily
                        appears in Nintendo's Mario franchise. Created by Japanese video game designer Shigeru Miyamoto,
                        he is portrayed as a citizen of the Mushroom Kingdom and is one of Princess Peach's most loyal
                        attendants; constantly working on her behalf. He is usually seen as a non-player character (NPC)
                        who provides assistance to Mario and his friends in most games, but there are times when Toad(s)
                        takes center stage and appears as a protagonist, as seen in Super Mario Bros. 2, Wario's Woods,
                        Super Mario 3D World, and Captain Toad: Treasure Tracker.
                      </p>
                      <p>
                        Source:{' '}
                        <a href="https://en.wikipedia.org/wiki/Toad_(Nintendo)" target="_blank">
                          Wikipedia
                        </a>
                      </p>
                    </TabPanel>
                    </Tabs>

                </div>
                );
    }
}

export default Diretores;
