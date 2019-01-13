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
                    <Masonry className={'masonry'} options={masonryOptions}>
                        {this.state.data.map(function(exp){
                          return (
                            <Detail project={exp} key={exp._id}/>
                          );})
                        }
                    </Masonry>
                    <Add/>
                </div>
                );
    }
}

// <div className="grid-box" id="portifolio">
//   <div className="container-fluid filter-menu">
//     <div className="row">
//       <div className="col-md-4"></div>
//       <div className="switch-toggle switch-candy-white col-md-4" id="filter">
//         <fieldset>
//           <input id="week" name="view" type="radio" checked />
//             <label htmlFor="week">tudo</label>
//             <input id="month" name="view" type="radio" />
//             <label htmlFor="month">cinema</label>
//             <input id="day" name="view" type="radio" />
//             <label htmlFor="day">tv</label>
//             <input id="hour" name="view" type="radio" />
//             <label htmlFor="hour">teatro</label>
//             <a></a>
//         </fieldset>
//       </div>
//       <div className="col-md-4"></div>
//     </div>
//   </div>
