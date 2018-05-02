import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListGroupItem, Button } from 'reactstrap';
import '../../assets/styles/users.css';


class UserRow extends React.Component {
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
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
        </div>
      </ListGroupItem>





    );
  }
}

export default UserRow;


UserRow.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
