const DEVICE_DATA_ADDRESS = [
  {
    name: 'Reserved',
    address: '4950-4951',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Reserved',
    address: '4952-4953',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Reserved',
    address: '4954-4968',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '4969-4983',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '4984-4989',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'SN',
    address: '4990-4999',
    unit: '',
    dataType: 'UTF-8',
  },
  {
    name: 'Device type code',
    address: '5000',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Nominal active power',
    address: '5001',
    unit: '0.1kW',
    dataType: 'U16',
  },
  {
    name: 'Output type',
    address: '5002',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Daily power yields',
    address: '5003',
    unit: '0.1 kWh',
    dataType: 'U16',
  },
  {
    name: 'Total power yields',
    address: '5004-5005',
    unit: 'kWh',
    dataType: 'U32',
  },
  {
    name: 'Total running time',
    address: '5006-5007',
    unit: 'h',
    dataType: 'U32',
  },
  {
    name: 'Internal temperature',
    address: '5008',
    unit: '0.1℃',
    dataType: 'S16',
  },
  {
    name: 'Total apparent power',
    address: '5009-5010',
    unit: 'VA',
    dataType: 'U32',
  },
  {
    name: 'MPPT 1 voltage',
    address: '5011',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 1 current',
    address: '5012',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 2 voltage',
    address: '5013',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 2 current',
    address: '5014',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 3 voltage',
    address: '5015',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 3 current',
    address: '5016',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'Total DC power',
    address: '5017-5018',
    unit: 'W',
    dataType: 'U32',
  },
  {
    name: 'A-B line voltage/phase A voltage',
    address: '5019',
    unit: '0.1 V',
    dataType: 'U16',
  },
  {
    name: 'B-C line Voltage/phase B Voltage',
    address: '5020',
    unit: '0.1 V',
    dataType: 'U16',
  },
  {
    name: 'C-A line Voltage/phase C Voltage',
    address: '5021',
    unit: '0.1 V',
    dataType: 'U16',
  },
  {
    name: 'Phase A current',
    address: '5022',
    unit: '0.1 A',
    dataType: 'U16',
  },
  {
    name: 'Phase B current',
    address: '5023',
    unit: '0.1 A',
    dataType: 'U16',
  },
  {
    name: 'Phase C current',
    address: '5024',
    unit: '0.1 A',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5025-5026',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Reserved',
    address: '5027-5028',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Reserved',
    address: '5029-5030',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Total active power',
    address: '5031-5032',
    unit: 'W',
    dataType: 'U32',
  },
  {
    name: 'Total reactive power',
    address: '5033–5034',
    unit: 'Var',
    dataType: 'S32',
  },
  {
    name: 'Power factor',
    address: '5035',
    unit: '0.001',
    dataType: 'S16',
  },
  {
    name: 'Grid frequency',
    address: '5036',
    unit: '0.1 Hz',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5037',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Work state',
    address: '5038',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5039',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5040',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5041',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5042',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5043',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm time:',
    address: '5044',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Fault/Alarm code 1',
    address: '5045',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5046-5048',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Nominal reactive power',
    address: '5049',
    unit: '0.1kVar',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5050-5070',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Array insulation resistance',
    address: '5071',
    unit: '1kΩ',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5072',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5073-5076',
    unit: '',
    dataType: '',
  },
  {
    name: 'Active Power Regulation Setpoint',
    address: '5077-5078',
    unit: '1w',
    dataType: 'U32',
  },
  {
    name: 'Reactive Power Regulation Setpoint',
    address: '5079-5080',
    unit: '1Var',
    dataType: 'S32',
  },
  {
    name: 'Work state',
    address: '5081-5082',
    unit: '',
    dataType: 'U32',
  },
  {
    name: 'Meter power',
    address: '5083-5084',
    unit: '1w',
    dataType: 'S32',
  },
  {
    name: 'Meter A phase power',
    address: '5085-5086',
    unit: '1w',
    dataType: 'S32',
  },
  {
    name: 'Meter B phase power',
    address: '5087-5088',
    unit: '1w',
    dataType: 'S32',
  },
  {
    name: 'Meter C phase power',
    address: '5089-5090',
    unit: '1w',
    dataType: 'S32',
  },
  {
    name: 'Load power',
    address: '5091-5092',
    unit: '1w',
    dataType: 'S32',
  },
  {
    name: 'Daily export energy',
    address: '5093-5094',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Total export energy',
    address: '5095-5096',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Daily import energy',
    address: '5097-5098',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Total import energy',
    address: '5099-5100',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Daily direct energy consumption',
    address: '5101-5102',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Total direct energy consumption',
    address: '5103-5104',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Reserved',
    address: '5105-5112',
    unit: '',
    dataType: '',
  },
  {
    name: 'Daily running time',
    address: '5113',
    unit: '1min',
    dataType: 'U16',
  },
  {
    name: 'Present country',
    address: '5114',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'MPPT 4 voltage',
    address: '5115',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 4 current',
    address: '5116',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 5 voltage',
    address: '5117',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 5 current',
    address: '5118',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 6 voltage',
    address: '5119',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 6 current',
    address: '5120',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 7 voltage',
    address: '5121',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 7 current',
    address: '5122',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 8 voltage',
    address: '5123',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 8 current',
    address: '5124',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5125',
    unit: '',
    dataType: '',
  },
  {
    name: 'Reserved',
    address: '5126-5127',
    unit: '',
    dataType: '',
  },
  {
    name: 'Monthly power yields',
    address: '5128-5129',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'MPPT 9 voltage',
    address: '5130',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 9 current',
    address: '5131',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 10 voltage',
    address: '5132',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 10 current',
    address: '5133',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 11 voltage',
    address: '5134',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 11 current',
    address: '5135',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'MPPT 12 voltage',
    address: '5136',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'MPPT 12 current',
    address: '5137',
    unit: '0.1A',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5138-5139',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5140',
    unit: '',
    dataType: '',
  },
  {
    name: 'Reserved',
    address: '5141',
    unit: '',
    dataType: '',
  },
  {
    name: 'Reserved',
    address: '5142',
    unit: '',
    dataType: '',
  },
  {
    name: 'Reserved',
    address: '5143',
    unit: '',
    dataType: '',
  },
  {
    name: 'Total power yields',
    address: '5144-5145',
    unit: '0.1kWh',
    dataType: 'U32',
  },
  {
    name: 'Negative voltage to the ground',
    address: '5146',
    unit: '0.1V',
    dataType: 'S16',
  },
  {
    name: 'Bus voltage',
    address: '5147',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'Grid frequency',
    address: '5148',
    unit: '0.01Hz',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5149',
    unit: '0.1V',
    dataType: 'U16',
  },
  {
    name: 'PID work state',
    address: '5150',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'PID alarm code',
    address: '5151',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5152',
    unit: '',
    dataType: 'U16',
  },
  {
    name: 'Reserved',
    address: '5153-7012',
    unit: '',
    dataType: '',
  },
  {
    name: 'String 1 current',
    address: '7013',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 2 current',
    address: '7014',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 3 current',
    address: '7015',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 4 current',
    address: '7016',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 5 current',
    address: '7017',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 6 current',
    address: '7018',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 7 current',
    address: '7019',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 8 current',
    address: '7020',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 9 current',
    address: '7021',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 10 current',
    address: '7022',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 11 current',
    address: '7023',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 12 current',
    address: '7024',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 13 current',
    address: '7025',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 14 current',
    address: '7026',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 15 current',
    address: '7027',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 16 current',
    address: '7028',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 17 current',
    address: '7029',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 18 current',
    address: '7030',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 19 current',
    address: '7031',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 20 current',
    address: '7032',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 21 current',
    address: '7033',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 22 current',
    address: '7034',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 23 current',
    address: '7035',
    unit: '0.01A',
    dataType: 'U16',
  },
  {
    name: 'String 24 current',
    address: '7036',
    unit: '0.01A',
    dataType: 'U16',
  },
];

const LOGGER_DATA_ADDRESS = [
  {
    name: 'Device type code',
    address: '8000',
    dataType: 'U16',
    unit: '',
  },
  {
    name: 'Protocol number',
    address: '8001',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'Communication protocol version',
    address: '8003',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'Total devices connected',
    address: '8005',
    dataType: 'U16',
    unit: 'Set',
  },
  {
    name: 'Total faulty devices',
    address: '8006',
    dataType: 'U16',
    unit: 'Set',
  },
  {
    name: 'Reserved',
    address: '8015',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'Reserved',
    address: '8017',
    dataType: 'U16',
    unit: '',
  },
  {
    name: 'Digital input state',
    address: '8021',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'Reserved',
    address: '8023',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'Reserved',
    address: '8025',
    dataType: 'U32',
    unit: '',
  },
  {
    name: 'PT100-1',
    address: '8027',
    dataType: 'S16',
    unit: '℃',
  },
  {
    name: 'PT100-2',
    address: '8028',
    dataType: 'S16',
    unit: '℃',
  },
  {
    name: 'ADC1 voltage',
    address: '8029',
    dataType: 'S16',
    unit: 'V',
  },
  {
    name: 'ADC1 current',
    address: '8030',
    dataType: 'S16',
    unit: 'mA',
  },
  {
    name: 'ADC2 voltage',
    address: '8031',
    dataType: 'S16',
    unit: 'V',
  },
  {
    name: 'ADC2 current',
    address: '8032',
    dataType: 'S16',
    unit: 'mA',
  },
  {
    name: 'ADC3 voltage',
    address: '8033',
    dataType: 'S16',
    unit: '',
  },
  {
    name: 'ADC4 voltage',
    address: '8034',
    dataType: 'S16',
    unit: '',
  },
  {
    name: 'ADC3 current',
    address: '8035',
    dataType: 'S16',
    unit: 'mA',
  },
  {
    name: 'ADC4 current',
    address: '8036',
    dataType: 'S16',
    unit: 'mA',
  },
  {
    name: 'Reserved',
    address: '8037',
    dataType: 'S16',
    unit: '',
  },
  {
    name: 'Longitude',
    address: '8054',
    dataType: 'S32',
    unit: 'º',
  },
  {
    name: 'Latitude',
    address: '8056',
    dataType: 'S32',
    unit: 'º',
  },
  {
    name: 'Max. total nominal active power',
    address: '8058',
    dataType: 'U16',
    unit: 'kW',
  },
  {
    name: 'Min. total nominal active power',
    address: '8059',
    dataType: 'U16',
    unit: 'kW',
  },
  {
    name: 'Max. total nominal reactive power',
    address: '8060',
    dataType: 'U16',
    unit: 'kvar',
  },
  {
    name: 'Min. total nominal reactive power',
    address: '8061',
    dataType: 'S16',
    unit: 'kvar',
  },
  {
    name: 'Inverter preset total active power',
    address: '8066',
    dataType: 'U16',
    unit: 'kW',
  },
  {
    name: 'Inverter preset total reactive power',
    address: '8067',
    dataType: 'S16',
    unit: 'kvar',
  },
  {
    name: 'Logger On/Off state',
    address: '8068',
    dataType: 'U16',
    unit: '',
  },
  {
    name: 'Logger unlatch state',
    address: '8069',
    dataType: 'U16',
    unit: '',
  },
  {
    name: 'Total active power',
    address: '8070',
    dataType: 'U64',
    unit: 'W',
  },
  {
    name: 'Daily power yield',
    address: '8074',
    dataType: 'U32',
    unit: 'kWh',
  },
  {
    name: 'Total reactive power',
    address: '8076',
    dataType: 'S64',
    unit: 'var',
  },
  {
    name: 'Total power yield',
    address: '8080',
    dataType: 'U64',
    unit: 'kWh',
  },
  {
    name: 'Min. adjustable active power',
    address: '8084',
    dataType: 'U32',
    unit: 'kW',
  },
  {
    name: 'Max. adjustable active power',
    address: '8086',
    dataType: 'U32',
    unit: 'kW',
  },
  {
    name: 'Min. adjustable reactive power',
    address: '8088',
    dataType: 'S32',
    unit: 'kvar',
  },
  {
    name: 'Max. adjustable reactive power',
    address: '8090',
    dataType: 'S32',
    unit: 'kvar',
  },
  {
    name: 'Nominal active power',
    address: '8092',
    dataType: 'U32',
    unit: 'kvar',
  },
  {
    name: 'Nominal reactive power',
    address: '8094',
    dataType: 'U32',
    unit: 'kvar',
  },
  {
    name: 'Grid-connected devices',
    address: '8096',
    dataType: 'U16',
    unit: 'Set',
  },
  {
    name: 'Off-grid devices',
    address: '8097',
    dataType: 'U16',
    unit: 'Set',
  },
  {
    name: 'Monthly yield of array',
    address: '8098',
    dataType: 'U64',
    unit: 'kWh',
  },
  {
    name: 'Annual yield of array',
    address: '8102',
    dataType: 'U64',
    unit: 'kWh',
  },
  {
    name: 'Apparent power of array',
    address: '8106',
    dataType: 'U64',
    unit: 'VA',
  },
];

const DEVICE_WORK_STATE_1 = [
  {
    state: 'Run',
    hexValue: '0x0',
    paraphrase:
      'After being energized, inverter tracks the PV arrays’ maximum power point (MPP) and converts the DC power into AC power. This is the normal operation mode',
  },
  {
    state: 'Stop',
    hexValue: '0x8000',
    paraphrase: 'Inverter is stopped.',
  },
  {
    state: 'Key stop',
    hexValue: '0x1300',
    paraphrase:
      'Inverter will stop operation by manually “stop” via app. In this way, inverter internal DSP stops. To restart the inverter, manually start via app',
  },
  {
    state: 'Emergency Stop',
    hexValue: '0x1500',
    paraphrase: '',
  },
  {
    state: 'Standby',
    hexValue: '0x1400',
    paraphrase:
      'Inverter enters standby mode when DC side input is insufficient. In this mode inverter will wait within the standby duration.',
  },
  {
    state: 'Initial standby',
    hexValue: '0x1200',
    paraphrase: 'The inverter is in the initial power-on standby state.',
  },
  {
    state: 'Starting',
    hexValue: '0x1600',
    paraphrase: 'The inverter is initializing and synchronizing with the grid',
  },
  {
    state: 'Alarm run',
    hexValue: '0x9100',
    paraphrase: 'Warning information is detected.',
  },
  {
    state: 'Derating run',
    hexValue: '0x8100',
    paraphrase: 'The inverter derates actively due to environmental factors such as temperature or altitude',
  },
  {
    state: 'Dispatch run',
    hexValue: '0x8200',
    paraphrase: 'The inverter runs according to the scheduling instructions received from the monitoring background',
  },
  {
    state: 'Fault',
    hexValue: '0x5500',
    paraphrase:
      'If a fault occurs, inverter will automatically stop operation, and disconnect the AC relay. The fault information will be displayed in the app. Once the fault is removed in recovery time, inverter will automatically resume running.',
  },
  {
    state: 'Communicate fault',
    hexValue: '0x2500',
  },
];

const DEVICE_FAULT_CODE = [
  {
    value: '2',
    hexValue: '0x0002',
    description: 'Grid overvoltage',
    type: 'Fault',
  },
  {
    value: '3',
    hexValue: '0x0003',
    description: 'Grid transient overvoltage',
    type: 'Fault',
  },
  {
    value: '4',
    hexValue: '0x0004',
    description: 'Grid undervoltage',
    type: 'Fault',
  },
  {
    value: '5',
    hexValue: '0x0005',
    description: 'Grid low voltage',
    type: 'Fault',
  },
  {
    value: '7',
    hexValue: '0x0007',
    description: 'AC instantaneous overcurrent',
    type: 'Fault',
  },
  {
    value: '8',
    hexValue: '0x0008',
    description: 'Grid over frequency',
    type: 'Fault',
  },
  {
    value: '9',
    hexValue: '0x0009',
    description: 'Grid underfrequency',
    type: 'Fault',
  },
  {
    value: '10',
    hexValue: '0x000A',
    description: 'Grid power outage',
    type: 'Fault',
  },
  {
    value: '11',
    hexValue: '0x000B',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '12',
    hexValue: '0x000C',
    description: 'Excessive leakage current',
    type: 'Fault',
  },
  {
    value: '13',
    hexValue: '0x000D',
    description: 'Grid abnormal',
    type: 'Fault',
  },
  {
    value: '14',
    hexValue: '0x000E',
    description: '10-minute grid overvoltage',
    type: 'Fault',
  },
  {
    value: '15',
    hexValue: '0x000F',
    description: 'Grid high voltage',
    type: 'Fault',
  },
  {
    value: '16',
    hexValue: '0x0010',
    description: 'Output overload',
    type: 'Fault',
  },
  {
    value: '17',
    hexValue: '0x0011',
    description: 'Grid voltage unbalance',
    type: 'Fault',
  },
  {
    value: '19',
    hexValue: '0x0013',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '20',
    hexValue: '0x0014',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '21',
    hexValue: '0x0015',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '22',
    hexValue: '0x0016',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '23',
    hexValue: '0x0017',
    description: 'PV connection fault',
    type: 'Fault',
  },
  {
    value: '24',
    hexValue: '0x0018',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '25',
    hexValue: '0x0019',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '30',
    hexValue: '0x001E',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '31',
    hexValue: '0x001F',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '32',
    hexValue: '0x0020',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '33',
    hexValue: '0x0021',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '34',
    hexValue: '0x0022',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '36',
    hexValue: '0x0024',
    description: 'Excessively high module temperature',
    type: 'Fault',
  },
  {
    value: '37',
    hexValue: '0x0025',
    description: 'Excessively high ambient temperature',
    type: 'Fault',
  },
  {
    value: '38',
    hexValue: '0x0026',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '39',
    hexValue: '0x0027',
    description: 'Low system insulation resistance',
    type: 'Fault',
  },
  {
    value: '40',
    hexValue: '0x0028',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '41',
    hexValue: '0x0029',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '42',
    hexValue: '0x002A',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '43',
    hexValue: '0x002B',
    description: 'Low ambient temperature',
    type: 'Fault',
  },
  {
    value: '44',
    hexValue: '0x002C',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '45',
    hexValue: '0x002D',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '46',
    hexValue: '0x002E',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '47',
    hexValue: '0x002F',
    description: 'PV input configuration abnormal',
    type: 'Fault',
  },
  {
    value: '48',
    hexValue: '0x0030',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '49',
    hexValue: '0x0031',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '50',
    hexValue: '0x0032',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '53',
    hexValue: '0x0035',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '54',
    hexValue: '0x0036',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '55',
    hexValue: '0x0037',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '56',
    hexValue: '0x0038',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '59',
    hexValue: '0x003B',
    description: 'Device abnormal',
    type: 'Alarm',
  },
  {
    value: '60',
    hexValue: '0x003C',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '70',
    hexValue: '0x0046',
    description: 'Fan alarm',
    type: 'Alarm',
  },
  {
    value: '71',
    hexValue: '0x0047',
    description: 'AC-side SPD alarm',
    type: 'Alarm',
  },
  {
    value: '72',
    hexValue: '0x0048',
    description: 'DC-side SPD alarm',
    type: 'Alarm',
  },
  {
    value: '74',
    hexValue: '0x004A',
    description: 'Communication alarm',
    type: 'Alarm',
  },
  {
    value: '76',
    hexValue: '0x004C',
    description: 'Device abnormal',
    type: 'Alarm',
  },
  {
    value: '78',
    hexValue: '0x004E',
    description: 'PV1 abnormal',
    type: 'Alarm',
  },
  {
    value: '79',
    hexValue: '0x004F',
    description: 'PV2 abnormal',
    type: 'Alarm',
  },
  {
    value: '80',
    hexValue: '0x0050',
    description: 'PV3 abnormal',
    type: 'Alarm',
  },
  {
    value: '81',
    hexValue: '0x0051',
    description: 'PV4 abnormal',
    type: 'Alarm',
  },
  {
    value: '87',
    hexValue: '0x0057',
    description: 'Electric arc detection module abnormal',
    type: 'Alarm',
  },
  {
    value: '88',
    hexValue: '0x0058',
    description: 'Electric arc fault',
    type: 'Fault',
  },
  {
    value: '89',
    hexValue: '0x0059',
    description: 'Electric arc detection disabled',
    type: 'Fault',
  },
  {
    value: '105',
    hexValue: '0x0069',
    description: 'Grid-side protection self-check failure',
    type: 'Fault',
  },
  {
    value: '106',
    hexValue: '0x006A',
    description: 'Grounding cable fault',
    type: 'Fault',
  },
  {
    value: '116',
    hexValue: '0x0074',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '117',
    hexValue: '0x0075',
    description: 'Device abnormal',
    type: 'Fault',
  },
  {
    value: '220',
    hexValue: '0x00DC',
    description: 'PV5 abnormal',
    type: 'Alarm',
  },
  {
    value: '221',
    hexValue: '0x00DD',
    description: 'PV6 abnormal',
    type: 'Alarm',
  },
  {
    value: '222',
    hexValue: '0x00DE',
    description: 'PV7 abnormal',
    type: 'Alarm',
  },
  {
    value: '223',
    hexValue: '0x00DF',
    description: 'PV8 abnormal',
    type: 'Alarm',
  },
  {
    value: '224',
    hexValue: '0x00E0',
    description: 'PV9 abnormal',
    type: 'Alarm',
  },
  {
    value: '225',
    hexValue: '0x00E1',
    description: 'PV10 abnormal',
    type: 'Alarm',
  },
  {
    value: '226',
    hexValue: '0x00E2',
    description: 'PV11 abnormal',
    type: 'Alarm',
  },
  {
    value: '227',
    hexValue: '0x00E3',
    description: 'PV12 abnormal',
    type: 'Alarm',
  },
  {
    value: '514',
    hexValue: '0x0202',
    description: 'Meter communication abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '532',
    hexValue: '0x0214',
    description: 'String 1 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '533',
    hexValue: '0x0215',
    description: 'String 2 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '534',
    hexValue: '0x0216',
    description: 'String 3 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '535',
    hexValue: '0x0217',
    description: 'String 4 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '536',
    hexValue: '0x0218',
    description: 'String 5 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '537',
    hexValue: '0x0219',
    description: 'String 6 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '538',
    hexValue: '0x021A',
    description: 'String 7 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '539',
    hexValue: '0x021B',
    description: 'String 8 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '540',
    hexValue: '0x021C',
    description: 'String 9 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '541',
    hexValue: '0x021D',
    description: 'String 10 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '542',
    hexValue: '0x021E',
    description: 'String 11 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '543',
    hexValue: '0x021F',
    description: 'String 12 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '544',
    hexValue: '0x0220',
    description: 'String 13 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '545',
    hexValue: '0x0221',
    description: 'String 14 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '546',
    hexValue: '0x0222',
    description: 'String 15 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '547',
    hexValue: '0x0223',
    description: 'String 16 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '564',
    hexValue: '0x0234',
    description: 'String 17 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '565',
    hexValue: '0x0235',
    description: 'String 18 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '566',
    hexValue: '0x0236',
    description: 'String 19 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '567',
    hexValue: '0x0237',
    description: 'String 20 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '568',
    hexValue: '0x0238',
    description: 'String 21 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '569',
    hexValue: '0x0239',
    description: 'String 22 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '570',
    hexValue: '0x023A',
    description: 'String 23 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '571',
    hexValue: '0x023B',
    description: 'String 24 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '548',
    hexValue: '0x0224',
    description: 'String 1 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '549',
    hexValue: '0x0225',
    description: 'String 2 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '550',
    hexValue: '0x0226',
    description: 'String 3 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '551',
    hexValue: '0x0227',
    description: 'String 4 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '552',
    hexValue: '0x0228',
    description: 'String 5 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '553',
    hexValue: '0x0229',
    description: 'String 6 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '554',
    hexValue: '0x022A',
    description: 'String 7 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '555',
    hexValue: '0x022B',
    description: 'String 8 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '556',
    hexValue: '0x022C',
    description: 'String 9 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '557',
    hexValue: '0x022D',
    description: 'String 10 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '558',
    hexValue: '0x022E',
    description: 'String 11 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '559',
    hexValue: '0x022F',
    description: 'String 12 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '560',
    hexValue: '0x0230',
    description: 'String 13 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '561',
    hexValue: '0x0231',
    description: 'String 14 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '562',
    hexValue: '0x0232',
    description: 'String 15 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '563',
    hexValue: '0x0233',
    description: 'String 16 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '580',
    hexValue: '0x0244',
    description: 'String 17 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '581',
    hexValue: '0x0245',
    description: 'String 18 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '582',
    hexValue: '0x0246',
    description: 'String 19 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '583',
    hexValue: '0x0247',
    description: 'String 20 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '584',
    hexValue: '0x0248',
    description: 'String 21 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '585',
    hexValue: '0x0249',
    description: 'String 22 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '586',
    hexValue: '0x024A',
    description: 'String 23 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '587',
    hexValue: '0x024B',
    description: 'String 24 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '448',
    hexValue: '0x01C0',
    description: 'String 1 reverse connection fault',
    type: 'Fault',
  },
  {
    value: '449',
    hexValue: '0x01C1',
    description: 'String 2 reverse connection fault',
    type: 'Fault',
  },
  {
    value: '450',
    hexValue: '0x01C2',
    description: 'String 3 reverse connection fault',
    type: 'Fault',
  },
  {
    value: '540',
    hexValue: '0x021C',
    description: 'String 9 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '541',
    hexValue: '0x021D',
    description: 'String 10 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '542',
    hexValue: '0x021E',
    description: 'String 11 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '543',
    hexValue: '0x021F',
    description: 'String 12 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '544',
    hexValue: '0x0220',
    description: 'String 13 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '545',
    hexValue: '0x0221',
    description: 'String 14 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '546',
    hexValue: '0x0222',
    description: 'String 15 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '547',
    hexValue: '0x0223',
    description: 'String 16 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '564',
    hexValue: '0x0234',
    description: 'String 17 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '565',
    hexValue: '0x0235',
    description: 'String 18 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '566',
    hexValue: '0x0236',
    description: 'String 19 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '567',
    hexValue: '0x0237',
    description: 'String 20 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '568',
    hexValue: '0x0238',
    description: 'String 21 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '569',
    hexValue: '0x0239',
    description: 'String 22 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '570',
    hexValue: '0x023A',
    description: 'String 23 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '571',
    hexValue: '0x023B',
    description: 'String 24 reverse connection alarm',
    type: 'Alarm',
  },
  {
    value: '548',
    hexValue: '0x0224',
    description: 'String 1 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '549',
    hexValue: '0x0225',
    description: 'String 2 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '550',
    hexValue: '0x0226',
    description: 'String 3 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '551',
    hexValue: '0x0227',
    description: 'String 4 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '552',
    hexValue: '0x0228',
    description: 'String 5 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '553',
    hexValue: '0x0229',
    description: 'String 6 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '554',
    hexValue: '0x022A',
    description: 'String 7 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '555',
    hexValue: '0x022B',
    description: 'String 8 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '556',
    hexValue: '0x022C',
    description: 'String 9 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '557',
    hexValue: '0x022D',
    description: 'String 10 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '558',
    hexValue: '0x022E',
    description: 'String 11 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '559',
    hexValue: '0x022F',
    description: 'String 12 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '560',
    hexValue: '0x0230',
    description: 'String 13 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '561',
    hexValue: '0x0231',
    description: 'String 14 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '562',
    hexValue: '0x0232',
    description: 'String 15 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '563',
    hexValue: '0x0233',
    description: 'String 16 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '580',
    hexValue: '0x0244',
    description: 'String 17 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '581',
    hexValue: '0x0245',
    description: 'String 18 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '582',
    hexValue: '0x0246',
    description: 'String 19 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '583',
    hexValue: '0x0247',
    description: 'String 20 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '584',
    hexValue: '0x0248',
    description: 'String 21 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '585',
    hexValue: '0x0249',
    description: 'String 22 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '586',
    hexValue: '0x024A',
    description: 'String 23 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '587',
    hexValue: '0x024B',
    description: 'String 24 abnormal alarm',
    type: 'Alarm',
  },
  {
    value: '448',
    hexValue: '0x01C0',
    description: 'String 1 reverse connection fault',
    type: 'Fault',
  },
  {
    value: '449',
    hexValue: '0x01C1',
    description: 'String 2 reverse connection fault',
    type: 'Fault',
  },
  {
    value: '450',
    hexValue: '0x01C2',
    description: 'String 3 reverse connection fault',
    type: 'Fault',
  },
];

module.exports = { DEVICE_DATA_ADDRESS, LOGGER_DATA_ADDRESS, DEVICE_WORK_STATE_1, DEVICE_FAULT_CODE };
