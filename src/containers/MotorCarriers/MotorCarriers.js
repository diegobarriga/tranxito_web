import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/Loader/Loader';


class MotorCarriers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pages: '5',
      currentPage: '1',
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.onInitMC(this.props.token);
  }
  onDeleteBtnClick(mCarrierId) {
    const confirmDelete = window.confirm('Are you sure you want to delete this motor carrier');
    if (confirmDelete) {
      this.props.onDeleteMCarrier(mCarrierId, this.props.token);
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    const rowStyle = {
      paddingTop: '20px',
    };

    const flexContainer = {
      display: 'flex',
    };

    const containedObject = {
      flexGrow: '1',
    };


    if (this.props.mCarrierList == null) return <Loader />;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (!this.props.isAdmin) {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    const filteredMotorCarriers = Object.values(this.props.mCarrierList).filter(mCarrier => ((
      mCarrier.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)));

    const totalMotorCarriers = filteredMotorCarriers.length;
    const { t } = this.props;
    return (
      <Aux>
        { authRedirect }

        <Container>
          <div className="inlineBox">
            <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder={t('Search')} value={this.state.search} onChange={this.updateSearch} />
            <div className="buttons">
              <Link className="btn btn-sm green spacing" to="/motor_carriers/create"><FontAwesomeIcon icon="user" color="white" /> {t('Create MotorCarrier')} </Link>
            </div>
          </div>
          <Row style={rowStyle}>
            <Col sm="12" md={{ size: 11 }}>
              <div className="ui divided items">
                {this.props.mCarrierList !== null &&
                  filteredMotorCarriers.slice(
                    ((this.state.currentPage * this.state.pages) - 5),
                     this.state.currentPage * this.state.pages,
                    )
                  .map(carrier => (
                    <div key={carrier.id} style={flexContainer} className="item">
                      <div key={carrier.id} style={containedObject}>
                        <Button
                          color="link"
                          key={carrier.id}
                          onClick={() => {
                          this.props.getMotorCarrier(carrier.id, this.props.token, carrier.name);
                          this.props.history.push(`/motor_carriers/${carrier.id}`);
                           }}
                        >
                          {carrier.name}
                        </Button>
                      </div>

                      <div>
                        <Link className="btn btn-sm green spacing" to={`/motor_carriers/${carrier.id}/new_supervisor`} >{t('Add Devices')}</Link>
                        <Link className="btn btn-sm green spacing" to={`/motor_carriers/${carrier.id}/new_supervisor`} >{t('Add Supervisor')}</Link>
                        <Link className="btn btn-secondary btn-sm" to={`/motor_carriers/${carrier.id}/edit`} ><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
                        <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(carrier.id)}><FontAwesomeIcon icon="trash" color="white" /></Button>
                      </div>
                    </div>

                  ))
                }
              </div>
              <Col sm="12" md={{ size: 5, offset: 4 }}>
                { totalMotorCarriers > 5 &&
                  <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={totalMotorCarriers}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />}
              </Col>
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}


MotorCarriers.propTypes = {
  mCarrierList: PropTypes.any.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onInitMC: PropTypes.func.isRequired,
  onDeleteMCarrier: PropTypes.func.isRequired,
  getMotorCarrier: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  mCarrierList: state.mCarrier.motorCarriers,

});

const mapDispatchToProps = dispatch => ({
  onInitMC: token => dispatch(actions.initMCarriers(token)),
  onDeleteMCarrier: (mCarrierId, token) => dispatch(actions.deleteMotorCarrier(mCarrierId, token)),
  getMotorCarrier: (Id, token, name) => dispatch(actions.getMotorCarrier(Id, token, name)),
});

const translateFunc = translate('translations')(MotorCarriers);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
