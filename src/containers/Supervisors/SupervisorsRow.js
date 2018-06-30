import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import '../../assets/styles/users.css';
import api from '../../services/api';

class SupervisorsRow extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="item">
        <div className="user_wrapper">
          <figure className="left">
            <img style={{ borderRadius: '50%' }} alt="profile-pic" height="100" width="100" src={api.images.userImageLink(this.props.image)} />
          </figure>
          <div className="right">
            <ul>
              <li>{this.props.firstName} {this.props.lastName}</li>
              <li>{t('Username')}: {this.props.username}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});


SupervisorsRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const translateFunc = translate('translations')(SupervisorsRow);
export default connect(mapStateToProps)(translateFunc);
