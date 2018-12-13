import React from 'react';
import EventForm from './eventForm';
const MainView = () => {
  return (<div className="">
    <form className="form-horizontal">
      <div className="form-group">
        <div className="col-sm-4">
          <select className="form-control">
            <option>Choose an event</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
    </form>
    <hr/>
    <EventForm/>
  </div>);
};

export default MainView;
