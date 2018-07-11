//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Detail from './Detail';
import Update from './Update';

export default class App extends React.Component {
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
                  <Add/>
                  
                  {
                  this.state.data.map(function(exp){
                                      return (
                                              <Detail project={exp} key={exp._id}/>
                                              );})
                  }
                </div>
                );
    }
}
