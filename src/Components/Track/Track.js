import React from 'react';
import './Track.css';

export class Track extends React.Component {
  
  renderAction() {
    let buttonType;
    if (this.props.isRemoval) {
      buttonType = '+';
    } else {
      buttonType = '-';
    }

    return <button className='Track-action'>{buttonType}</button>;
  }

  render() {
    return (
      <div className='Track'>
        <div className='Track-information'>
          {/* <h3>track name</h3> */}
          {/* <p>track artist | track album</p> */}
        </div>
        {this.renderAction()}
      </div>
    );
  } 
};