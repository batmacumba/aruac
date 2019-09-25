//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Detail from './Detail';
import Update from './Update';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    isFitWidth: true,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            grid: [],
            filterColor: "switch-toggle switch-candy-white",
        };
        this.getData = this.getData.bind(this);
        this.filterGrid = this.filterGrid.bind(this);
    }
    componentDidMount() {
        this.getData(this);
    }

    getData(ev) {
        axios.get('/getAll')
        .then(function(res) {
              ev.setState({data: res.data});
              ev.setState({grid: res.data});
        });
    }
    
    filterGrid(cat) {
        /* filtragem de projetor no grid */
        if (cat == "tudo") this.setState({grid: this.state.data});
        else {
            var newGrid = [];
            for (var i = 0; i < this.state.data.length; i++)
                if (this.state.data[i].category == cat) newGrid.push(this.state.data[i]);
            this.setState({grid: newGrid});
        }
        /* atualiza cor do menu de filtragem */
        console.log(cat);
        switch (cat) {
            case "tudo":
                this.setState({filterColor: "switch-toggle switch-candy-white"});
                break;
            case "producao":
                this.setState({filterColor: "switch-toggle switch-candy-red"});
                break;
            case "cinema":
                this.setState({filterColor: "switch-toggle switch-candy-green"});
                break;
            case "tv":
                this.setState({filterColor: "switch-toggle switch-candy-blue"});
                break;
            case "teatro":
                this.setState({filterColor: "switch-toggle switch-candy-yellow"});
                break;
            default:
                this.setState({filterColor: "switch-toggle switch-candy-white"});
        }
    }
    
    render() {
        return (
                <div>
                    {/* FILTER */}
                    <div class="masonry filter-menu">
                        <div class={this.state.filterColor} id="filter">
                            {this.props.lang == 'pt' &&
                                <fieldset>
                                    <input id="tudo" name="view" type="radio"/>
                                    <label for="tudo" onClick={this.filterGrid.bind(this, 'tudo')}>tudo</label>
                                    <input id="producao" name="view" type="radio"/>
                                    <label for="producao" onClick={this.filterGrid.bind(this, 'producao')}>em produção</label>
                                    <input id="cinema" name="view" type="radio"/>
                                    <label for="cinema" onClick={this.filterGrid.bind(this, 'cinema')}>cinema</label>
                                    <input id="tv" name="view" type="radio"/>
                                    <label for="tv" onClick={this.filterGrid.bind(this, 'tv')}>tv</label>
                                    <input id="teatro" name="view" type="radio"/>
                                    <label for="teatro" onClick={this.filterGrid.bind(this, 'teatro')}>teatro</label>
                                    <a></a>
                                </fieldset>
                            }
                            {this.props.lang == 'en' &&
                                <fieldset>
                                    <input id="tudo" name="view" type="radio"/>
                                    <label for="tudo" onClick={this.filterGrid.bind(this, 'tudo')}>all</label>
                                    <input id="producao" name="view" type="radio"/>
                                    <label for="producao" onClick={this.filterGrid.bind(this, 'producao')}>in production</label>
                                    <input id="cinema" name="view" type="radio"/>
                                    <label for="cinema" onClick={this.filterGrid.bind(this, 'cinema')}>films</label>
                                    <input id="tv" name="view" type="radio"/>
                                    <label for="tv" onClick={this.filterGrid.bind(this, 'tv')}>tv</label>
                                    <input id="teatro" name="view" type="radio"/>
                                    <label for="teatro" onClick={this.filterGrid.bind(this, 'teatro')}>theater</label>
                                    <a></a>
                                </fieldset>
                            }
                
                        </div>
                    </div>
                    {/* MASONRY GRID */}
                    <Masonry className={'masonry'} options={masonryOptions}>
                        {this.state.grid.map((exp) => {
                          return (
                            <Detail project={exp} key={exp._id} lang={this.props.lang}
                                                                token={this.props.token}
                                                                isLogged={this.props.isLogged}/>
                          );})
                        }
                    </Masonry>
                    { this.props.isLogged && <Add token={this.props.token}/> }
                </div>
                );
    }
}
