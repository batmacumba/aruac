import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Produtora extends React.Component {
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
                    BLZ
                </div>
                );
    }
}
