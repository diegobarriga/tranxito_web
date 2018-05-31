import React from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

const style = {
  image: {
    border: '.5rem solid rgba(255,255,255,.2)',
    borderRadius: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  center: {
    textAlign: 'center',
  },
};

const userView = props => (
  <div className="userWrapper">
    <div className="userMotorCarrier">
      <h4 style={style.center}>{props.mc}</h4>
    </div>
    <div className="profileImage">
      <img style={style.image} alt="profile-pic" height="100" width="100" src={api.images.userImageLink(props.image)} />
    </div>
    <div className="userName">
      <h6 style={style.center}>{props.name} {props.last}</h6>
    </div>
    <div className="userRole">
      { props.isAdm ?
        <p style={style.center}> Administrator </p>
        :
        <p style={style.center}> Supervisor </p>
      }
    </div>
  </div>
);

export default userView;

userView.propTypes = {
  image: PropTypes.string,
  isAdm: PropTypes.bool.isRequired,
  name: PropTypes.string,
  last: PropTypes.string,
  mc: PropTypes.string,
};

userView.defaultProps = {
  name: null,
  last: null,
  mc: null,
  image: null,
};
