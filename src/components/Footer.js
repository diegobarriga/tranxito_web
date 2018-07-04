import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <footer className="classic">
          <Grid>
            <Row>
              <Col sm={2}>
                <p><a href="http://www.e2egroup.co/en/home/" target="_blank" rel="noopener noreferrer">E2E Group</a></p>
                <p><a href="mailto:info@e2egroup.co">Contact</a></p>
                <Button circular color="facebook" href="https://web.facebook.com/E2E-Security-1354816517887114/?_rdc=1&_rdr" icon="facebook" />
              </Col>
              <Col sm={8}>
                <span className="lead color-heading">About E2E Group</span>
                <p>End-2-End plans and executes logistic operations on land in a
                 secure and efficient way. As a social committed organization,
                 E2E promotes positive values in society and establishes a friendly
                work environment for disabled people.
                </p>
              </Col>
              <Col sm={2}>
                <p><Icon name="mail" /><span>info@e2egroup.co</span></p>
                <Icon name="point" /><span>80 S.W. 8th Street Suite 2000 Miami, Florida</span>
              </Col>
            </Row>
          </Grid>
        </footer>
      </div>
    );
  }
}
export default Footer;
