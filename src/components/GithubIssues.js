import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as githubActions from '../actions/githubActions';
import PropTypes from 'prop-types';
import React from 'react';

class GithubIssues extends React.Component {
    
    componentWillMount() {
        this.props.github.fetchIssues();
    }

    renderData(item, index) {
        console.log(item)
        return <div key={index}>{JSON.stringify(item)}</div>;
    }

    render() {
        if(!this.props.issues){
            return (
                <div>
                    Loading Issues...
                </div>
            )
        }else{
            return (
                <div>
                    {
                        this.props.issues.map(this.renderData)
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    console.log('NewState: ', state);
    return {
        issues: state.github.timescomponents,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        github: bindActionCreators(githubActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GithubIssues);