import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Container, Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { DUTY_STATUS } from '../../utils/eventTypes';
import * as funct from '../../utils/tableFunctions';
import '../../assets/styles/buttons.css';

const styles = {
  container: {
    marginTop: '20px',
  },
  table: {
    width: '19.8%',
    float: 'left',
  },
  badge: {
    width: '40px',
  },
};

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    const stats = funct.objToArr(props.stats);
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

  sortByColumnDown(column) {
    let { stats } = this.state;
    stats = funct.sortByColumnDown(column, stats);
    this.setState({ stats, selectedSortId: column, selectedTypeSort: '0' });
  }

  sortByColumnUp(column) {
    let { stats } = this.state;
    stats = funct.sortByColumnUp(column, stats);
    this.setState({ stats, selectedSortId: column, selectedTypeSort: '1' });
  }

  sortByColumnAZ() {
    let { stats } = this.state;
    if (this.props.type === 'Driver') {
      stats = funct.sortByColumnAZ(this.props.type, stats, this.props.users);
    } else {
      stats = funct.sortByColumnAZ(this.props.type, stats, this.props.vehicles);
    }
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '0' });
  }

  sortByColumnZA() {
    let { stats } = this.state;
    if (this.props.type === 'Driver') {
      stats = funct.sortByColumnZA(this.props.type, stats, this.props.users);
    } else {
      stats = funct.sortByColumnZA(this.props.type, stats, this.props.vehicles);
    }
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '1' });
  }

  render() {
    const { t } = this.props;
    return (
      <Container style={styles.container}>
        <Table striped>
          <thead>
            <tr>
              <th style={styles.table}>
                {this.props.type}
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
              <th style={styles.table}>
                <Badge className="event1" style={styles.badge}>
                  {DUTY_STATUS[1]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'event1_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'event1_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event2" style={styles.badge}>
                  {DUTY_STATUS[2]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '0') ? 'event2_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '1') ? 'event2_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event3" style={styles.badge}>
                  {DUTY_STATUS[3]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('3')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '0') ? 'event3_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('3')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '1') ? 'event3_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event4" style={styles.badge}>
                  {DUTY_STATUS[4]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('4')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '4' && this.state.selectedTypeSort === '0') ? 'event4_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('4')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '4' && this.state.selectedTypeSort === '1') ? 'event4_icon' : ''}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map(stat => (
                <tr key={stat.key}>
                  { this.props.type === 'Driver' &&
                  <td style={styles.table}><Link to={`/drivers/${this.props.users[stat.key].id}`}>{this.props.users[stat.key].firstName} {this.props.users[stat.key].lastName}</Link></td>
                  }
                  { this.props.type === 'Vehicle' &&
                  <td style={styles.table}><Link to={`/vehicles/${this.props.vehicles[stat.key].id}`}>{this.props.vehicles[stat.key].carMaker} {this.props.vehicles[stat.key].model}</Link></td>
                  }
                  <td style={styles.table}>{funct.round(stat['1'])} {t('hours')}</td>
                  <td style={styles.table}>{funct.round(stat['2'])} {t('hours')}</td>
                  <td style={styles.table}>{funct.round(stat['3'])} {t('hours')}</td>
                  <td style={styles.table}>{funct.round(stat['4'])} {t('hours')}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

    );
  }
}

SimpleTable.propTypes = {
  type: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  vehicles: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  users: state.auth.users,
  vehicles: state.auth.vehicles,
});

const translateFunc = translate('translations')(SimpleTable);
export default connect(mapStateToProps)(translateFunc);
