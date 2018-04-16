import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../actions/githubActions';
import LoadingComponent from './LoadingComponent';
import RadarComponent from 'react-d3-radar';

let data = {
  variables: [],
  sets: [
    {
      key: 'Total Issues',
      label: 'Total Issues',
      values: {},
    },
    {
      key: 'Open Issues',
      label: 'Open Issues',
      values: {},
    },
  ],
};


const renderData = projects => {
  projects.totalIssues.map(project => {
    data.variables.push({key: project.name, label: project.name});
    data.sets[0].values[project.name] = project.issues.totalCount;
    return data}
  );
  projects.openIssues.map(project => {
    data.sets[1].values[project.name] = project.issues.totalCount;
    return data}
  );
  return data;   
}

class GithubIssues extends React.Component {
  componentWillMount() {
    this.props.github.fetchTotalIssues();
    this.props.github.fetchOpenIssues();    
  }

  render() {
    if (!this.props.projects.openIssues || !this.props.projects.totalIssues) return <LoadingComponent/>;
    
    var radar = <div style={myStyle}>
        <RadarComponent
          width={600}
          height={600}
          padding={70}
          domainMax={
            Math.max.apply(
              Math,this.props.projects.totalIssues.map((project) => {
                return project.issues.totalCount;
              })
            )
          }
          highlighted={null}
          data={renderData(this.props.projects)}     
        />
      </div>
    return (
      radar
    );
  }
}

const myStyle = {
  display: 'flex',
  justifyContent: 'center',
  background: "radial-gradient(circle, white, #ffa500, #ffa500, #ffa500)"
};

function mapStateToProps(state) {
  return {
    projects: state.github,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    github: bindActionCreators(githubActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GithubIssues);
