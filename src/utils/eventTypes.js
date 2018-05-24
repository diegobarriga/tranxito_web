export const EVENT_TYPES = {
  1: 'Duty status',
  2: 'Intermediate log',
  3: 'Driver indication',
  4: 'Daily record certification',
  5: 'ELD authentication activity',
  6: 'Engine',
  7: 'Malfunction or data diagnostic',
};

export const EVENT_CODES = {
  1: {
    1: 'Off-duty',
    2: 'Sleeper Berth',
    3: 'Driving',
    4: 'On-duty not driving',
  },
  2: {
    1: 'Conventional location precision',
    2: 'Reduced location precision',
  },
  3: {
    0: 'PC, YM and WT cleared',
    1: 'Authorized personal use of CMV',
    2: 'Yard moves',
  },
  4: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
  },
  5: {
    1: 'Login',
    2: 'Logout',
  },
  6: {
    1: 'Power-up, conventional location precision',
    2: 'Power-up, reduced location precision',
    3: 'Shut-down, conventional location precision',
    4: 'Shut-down, reduced location precision',
  },
  7: {
    1: 'Malfunction logged',
    2: 'Malfunction cleared',
    3: 'Data diagnostic logged',
    4: 'Data diagnostic cleared',
  },
};

export const DUTY_STATUS = {
  1: 'OFF',
  2: 'SB',
  3: 'D',
  4: 'ON',
  5: 'UNDEF',
};

export const COLORS = {
  1: 'danger',
  2: 'success',
  3: 'primary',
  4: 'secondary',
};

export const EVENT_COLORS = {
  1: '#ED2024',
  2: '#2EC1D8',
  3: '#282D74',
  4: '#76C043',
  5: '#6B6B6B',
}

