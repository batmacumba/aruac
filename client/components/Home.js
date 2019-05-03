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
        if (cat == "tudo") this.setState({grid: this.state.data});
        else {
            var newGrid = [];
            for (var i = 0; i < this.state.data.length; i++)
                if (this.state.data[i].category == cat) newGrid.push(this.state.data[i]);
            this.setState({grid: newGrid});
        }
    }
    
    render() {
        return (
                <div>
                    {/* FILTER */}
                    <div class="masonry filter-menu">
                        <div class="switch-toggle switch-candy-white" id="filter">
                            <fieldset>
                                <input id="tudo" name="view" type="radio"/>
                                <label for="tudo" onClick={this.filterGrid.bind(this, 'tudo')}>tudo</label>
                                <input id="producao" name="view" type="radio"/>
                                <label for="producao" onClick={this.filterGrid.bind(this, 'producao')}>produção</label>
                                <input id="longas" name="view" type="radio"/>
                                <label for="longas" onClick={this.filterGrid.bind(this, 'longas')}>longas</label>
                                <input id="tv" name="view" type="radio"/>
                                <label for="tv" onClick={this.filterGrid.bind(this, 'tv')}>tv</label>
                                <input id="teatro" name="view" type="radio"/>
                                <label for="teatro" onClick={this.filterGrid.bind(this, 'teatro')}>teatro</label>
                                <a></a>
                            </fieldset>
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
