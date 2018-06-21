import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../assets/styles/users.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class UserRow extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this driver?');
    if (confirmDelete) {
      this.props.deleteUser(userId, token);
    }
  }

  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };
    const { t } = this.props;
    return (
      <div className="item no-padding">
        <div className="user_wrapper">
          <figure className="left">
            <Link to={`/drivers/${this.props.id}`}>
              <img style={{ borderRadius: '50%' }} alt="profile-pic" height="70" width="70" src={api.images.userImageLink(this.props.image)} />
            </Link>
          </figure>
          <div className="right">
            <ul>
              <li><Link to={`/drivers/${this.props.id}`}>{this.props.firstName} {this.props.lastName}</Link></li>
              <li>{t('Username')}: {this.props.username}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to={`/drivers/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token)),
});


UserRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const translateFunc = translate('translations')(UserRow);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
