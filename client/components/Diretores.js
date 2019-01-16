import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import AddDirector from './AddDirector';
import EditDirector from './EditDirector';
import DelDirector from './DelDirector';

class Diretores extends React.Component {
    constructor() {
        super();
        this.state = {directors: []};
        this.getDirectors = this.getDirectors.bind(this);
    }
    componentDidMount() {
        this.getDirectors(this);
    }

    getDirectors(ev){
        axios.get('/getDirectors')
        .then(function(response) {
            ev.setState({directors: response.data});
        });
    }

    render() {
        return (
                <div className="masonry text-timeline">
                    {this.state.directors.length > 0 &&
                        <Tabs>
                            <TabList>
                                {this.state.directors.map(function(director){
                                  return (
                                      <Tab key={director.name}>{director.name}</Tab>
                                  );})
                                }
                            </TabList>

                            {this.state.directors.map(function (director) {
                              return (
                                  <TabPanel key={director._id}>
                                    <img src={director.photo} className="center-block diretores"/>
                                    <p>
                                        {director.story.split('\n').map(function(line, i) {
                                          return (
                                            <span key={line + i}>
                                              {line}
                                              <br/>
                                            </span>
                                          )
                                          })}
                                    </p>
                                    <EditDirector director={director}/>
                                    <DelDirector director={director}/>
                                  </TabPanel>
                              );})
                            }
                        </Tabs>
                    }
                    <hr/>
                    <AddDirector/>

                </div>
                );
    }
}

export default Diretores;
