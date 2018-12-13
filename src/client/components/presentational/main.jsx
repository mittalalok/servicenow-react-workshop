import React from 'react';
import CandidateView from './views/candidate';
import ManagerView from './views/manager';
import InterviewerView from './views/interviewer';


const FallBackView = () => <div className="well">
  Please <a href="/#/login">Login</a> again.
</div>;

const MainView = (props) => {
  if (!props.currentUser || !props.currentRole) {
    return <FallBackView/>;
  }
  switch(props.currentRole.name.toLowerCase()) {
  case 'candidate':
    return <CandidateView user={props.currentUser}/>;
  case 'interviewer':
    return <InterviewerView user={props.currentUser}/>;
  case 'manager':
    return <ManagerView user={props.currentUser}/>;
  default:
    return <FallBackView/>;
  }
};

export default MainView;
