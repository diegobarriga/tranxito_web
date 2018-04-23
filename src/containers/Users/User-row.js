import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button, Row, Col, Container } from 'reactstrap';
import styles from './Users.css';
console.log(styles);

class UserRow extends React.Component {

  render() {
    const pStyle = {
      justifyContent: "flex-end"
    };


    const divStyle = {
      display: "flex",
      flexDirection: "row",

    }

    return(
      <ListGroupItem style={divStyle} className="justify-content-between">
        <figure className="media-left">
          <img className="media-object" width="64px" src={this.props.picture} />
        </figure>
        <Link to="/">{this.props.first_name} {this.props.last_name} - {this.props.username}</Link>

        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
        </div>
      </ListGroupItem>
    )
  }
}

export default UserRow
