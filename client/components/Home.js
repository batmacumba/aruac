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
        this.state = {data: []};
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData(this);
    }

    getData(ev){
        axios.get('/getAll')
        .then(function(response) {
              ev.setState({data: response.data});
        });
    }
    render() {
        console.log("this.props.token", this.props.token);
        return (
                <div>
                    <Masonry className={'masonry'} options={masonryOptions}>
                        {this.state.data.map((exp) => {
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
