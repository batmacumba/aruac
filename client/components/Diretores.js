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

                             {this.state.directors.map((director) => {
                              return (
                                  <TabPanel key={director._id}>
                                    <img src={director.photo} className="center-block diretores"/>
                                    <p>
                                        {this.props.lang == 'pt' &&
                                         director.story.split('\n').map(function(line, i) {
                                          return (
                                            <span key={line + i}>
                                              {line}
                                              <br/>
                                            </span>
                                          )
                                          })}
                                          {this.props.lang == 'en' &&
                                           director.story_en.split('\n').map(function(line, i) {
                                            return (
                                              <span key={line + i}>
                                                {line}
                                                <br/>
                                              </span>
                                            )
                                            })}
                                    </p>
                                    {this.props.isLogged &&
                                      <div>
                                        <EditDirector director={director} token={this.props.token}/>
                                        <DelDirector director={director} token={this.props.token} />
                                      </div>
                                    }
                                  </TabPanel>
                              );})
                            }

                        </Tabs>
                    }
                    <hr/>
                    {this.props.isLogged &&
                        <AddDirector token={this.props.token}/>
                    }

                </div>
                );
    }
}

export default Diretores;
