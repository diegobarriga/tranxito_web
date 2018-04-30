import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';

class Footer extends Component {

  render() {
    return (
      <div className='footer-container'>
        <footer className="classic">
          <Grid>
            <Row>
              <Col sm={3}>
                <ul className="menu">
                  <li>
                    <a href="http://www.e2egroup.co/en/home/" target="_blank">E2E Group</a>
                  </li>
                  <li>
                    <a href="mailto:info@e2egroup.co">Contact</a>
                  </li>
                  <li>
                    <a className="inner-link back-to-top" href="#top">Back To Top</a>
                  </li>
                </ul>
                <ul className="social-profiles">
                  <li>
                    <Button circular color='facebook' href="https://web.facebook.com/E2E-Security-1354816517887114/?_rdc=1&_rdr" icon='facebook' />
                  </li>
                </ul>
              </Col>
              <Col sm={5}>
                <span className="lead color-heading">About E2E Group</span>
                <p>End-2-End plans and executes logistic operations on land in a secure and efficient way. As a social committed organization, E2E promotes positive values in society and establishes a friendly work environment for disabled people.</p>
              </Col>
              <Col sm={4}>
                <ul className="contact-methods">
                  <li><Icon name='mail'/><span>info@e2egroup.co</span></li>
                  <li><Icon name='point'/><span>80 S.W. 8th Street Suite 2000 Miami, Florida</span></li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </footer>
      </div>
    );
  }
}
export default Footer;
