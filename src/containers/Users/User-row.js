import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';
import '../../assets/styles/users.css';
import * as actions from '../../store/actions/index';


class UserRow extends React.Component {

  onDeleteBtnClick(userId, token){
    console.log(userId);
    console.log(token);
    this.props.deleteUser(userId, token);
  }


  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };


    const divStyle = {
      display: 'flex',
      flexDirection: 'row',

    };

    return (
      <ListGroupItem style={divStyle} className="justify-content-between">
        <div className="user_wrapper">
          <figure className="left">
            <img className="media-object" width="100px" src={`https://e2e-eld-test.herokuapp.com/api/imageContainers/People/download/${this.props.image}`} />
          </figure>
          <div className="right">
            <ul>
              <li><Link to={`/drivers/${this.props.id}`}>{this.props.first_name} {this.props.last_name}</Link></li>
              <li>Username: {this.props.username}</li>
              <li>License Number: {this.props.license_number}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
            <Link className="btn btn-secondary btn-sm" to={`/drivers/${this.props.id}/edit`}>Edit</Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}>Delete</Button>
        </div>
      </ListGroupItem>

    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (userId, token) => dispatch(actions.onDelete(userId, token))
});




UserRow.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRow);