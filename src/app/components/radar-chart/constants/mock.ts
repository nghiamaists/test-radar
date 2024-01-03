import { RadarChartDataModel } from '../models/radar-chart-data.model';

export const MOCK_DATA: RadarChartDataModel = {
  'labels': [
    'ARTISTIC',
    'CONVENTIONAL',
    'ENTERPRISING',
    'INVESTIGATE',
    'REALISTIC',
    'SOCIAL'
  ],
  'datasets': [
    {
      'label': 'Christine\'s Interests',
      'data': [
        {
          value: 19, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        },
        {
          value: 14, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        },
        {
          value: 21, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        },
        {
          value: 8, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        },
        {
          value: 4, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        },
        {
          value: 33, 'pointBackgroundColor': '#00538A',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#fff',
          'pointHoverBorderColor': '#00538A',
          pointerRadius: 4,
        }
      ],
      'backgroundColor': '#00538A33',
      'borderColor': '#00538A',
      'borderDash': true,
      'tension': 0.4,
      backgroundOpacity: 0.7
    },
    {
      'label': 'Your Interests',
      'data': [
        {
          value: 9, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        },
        {
          value: 9, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        },
        {
          value: 14, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        },
        {
          value: 17, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        },
        {
          value: 24, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        },
        {
          value: 27, 'pointBackgroundColor': '#A0001F',
          'pointBorderColor': '#fff',
          'pointHoverBackgroundColor': '#A0001F',
          'pointHoverBorderColor': '#A0001F',
          pointerRadius: 4,
        }
      ],
      'backgroundColor': '#A0001F33',
      'borderColor': '#A0001F',

      'tension': 0.4,
      borderDash: false,
      backgroundOpacity: 0.5,
    }
  ]
};
