import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';
import LaunchVideo from './launchVideo';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      details
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
      links {
        wikipedia
        video_link
        article_link
        mission_patch_small
      }
    }
  }
`;
export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return(
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{flight_number}}>
          {
            ({loading, error, data}) => {
              if(loading) return <h4>Loading...</h4>
              if(error) console.log(error);

              const {
                mission_name,
                launch_year,
                launch_success,
                launch_date_local,
                flight_number,
                details,
                rocket: {rocket_type, rocket_name, rocket_id },
                links: {wikipedia, video_link, article_link, mission_patch_small}
              } = data.launch;
              
              return(
                <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission:</span> {mission_name}
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <div className="container">
                <div className="row">
                <div className="col">
                  <ul className="list-group">
                    <li className="list-group-item">Flight Number: {flight_number}</li>
                    <li className="list-group-item">Launch Year: {launch_year}</li>
                    <li className="list-group-item">Launch Date: <Moment format="MM-DD-YYYY HH:mm">{ launch_date_local }</Moment></li>
                    <li className="list-group-item">Launch Successful:{ ' ' }
                     <span
                        className={classNames({
                          'text-success': launch_success,
                          'text-danger': !launch_success
                        })}
                      >
                        {launch_success ? 'Yes' : 'No'}
                      </span>
                    </li>
                    <li className="list-group-item"><a href={wikipedia}
                      target="_blank" rel="noopener noreferrer">Mission Wiki</a>
                    </li>
                  </ul>
                  <h4 className="my-3">Rocket Details</h4>
                  <ul className="list-group">
                    <li className="list-group-item">Rocket ID: {rocket_id}</li>
                    <li className="list-group-item">Rocket Type: {rocket_type}</li>
                    <li className="list-group-item">Rocket Name: {rocket_name}</li>
                  </ul>
                  </div>
                  <div className="col-md-auto">
                    <LaunchVideo video={video_link} mission={mission_name}/>
                  </div>
                  </div>
                </div>

                <div className="container">
                <div className="row">
                <div className="col">
                <div className="card mb-3">
                  <h4 className="card-header">Mission Details</h4>
                  <div className="card-body">
                    <p>{details}</p>
                    <a href={article_link} target="_blank" rel="noopener noreferrer">Official Press Release</a>
                  </div>
                </div>
                <hr />
                  <Link to="/" className="btn btn-secondary">Back To Mission List</Link>
                </div>

                <div className="card mb-3">
                  <h4 className="card-header">Official Mission Patch</h4>
                  <div className="card-body">
                    <img className="img-thumbnail" src={mission_patch_small} />
                  </div>
                </div>
                </div>
                </div>
              </div>
            );
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Launch
