import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import * as funct from '../../utils/tableFunctions';
import '../../assets/styles/buttons.css';


class AlertsTable extends React.Component {
  constructor(props) {
    super(props);
    const stats = funct.objToArr(this.props.stats.driversAlerts);
    this.state = {
      stats,
      selectedSortId: null,
      selectedTypeSort: null,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
    this.sortByColumnAZ = this.sortByColumnAZ.bind(this);
    this.sortByColumnZA = this.sortByColumnZA.bind(this);
  }

  sortByColumnDown(column, id) {
    let { stats } = this.state;
    stats = funct.sortByColumnDown(column, stats);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '0' });
  }

  sortByColumnUp(column, id) {
    let { stats } = this.state;
    stats = funct.sortByColumnUp(column, stats);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '1' });
  }

  sortByColumnAZ() {
    let { stats } = this.state;
    stats = funct.sortByColumnAZ('Driver', stats, this.props.users);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '0' });
  }

  sortByColumnZA() {
    let { stats } = this.state;
    stats = funct.sortByColumnZA('Driver', stats, this.props.users);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '1' });
  }

  render() {
    Object.entries(this.props.stats.driversAlerts).forEach(([key, value]) => {

    });
    const { t } = this.props;
    return (
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>
                {t('Driver')}
                <button onClick={() => this.sortByColumnAZ()} className="default">
                  <FontAwesomeIcon
                    icon="sort-alpha-down"
                    className={(this.state.selectedSortId === '0' && this.state.selectedTypeSort === '0') ? 'grey_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnZA()} className="default">
                  <FontAwesomeIcon
                    icon="sort-alpha-up"
                    className={(this.state.selectedSortId === '0' && this.state.selectedTypeSort === '1') ? 'grey_icon' : ''}
                  />
                </button>
              </th>
              <th>
                <span className="speedButton">{t('Amount of Excess Speed')}</span>
                <button onClick={() => this.sortByColumnDown('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'purple_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'purple_icon' : ''}
                  />
                </button>
              </th>
              <th>
                <span className="timeButton">{t('Amount of Excess Hours of Driving')}</span>
                <button onClick={() => this.sortByColumnDown('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '0') ? 'green_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map(stat => (
                <tr key={stat.key}>
                  <td><Link to={`/drivers/${this.props.users[stat.key].id}`}>{this.props.users[stat.key].firstName} {this.props.users[stat.key].lastName}</Link></td>
                  <td>{stat.speedLimit}</td>
                  <td>{stat.timeLimit}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

    );
  }
}

AlertsTable.propTypes = {
  stats: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  users: state.auth.users,
});
const translateFunc = translate('translations')(AlertsTable);
export default connect(mapStateToProps)(translateFunc);
