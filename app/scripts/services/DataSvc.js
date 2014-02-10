'use strict';

pifarmApp
  .factory('DataSvc', [function () {

    var Data = {
      description_types: [
        { key: 'hobbyist', value: 'Hobbyist' },
        { key: 'student', value: 'Student' },
        { key: 'raspberry_pioneer', value: 'Raspberry Pi-oneer' },
        { key: 'product_builder', value: 'Product Builder' },
        { key: 'solution_provider', value: 'Solution Provider' },
        { key: 'manufacturer', value: 'Manufacturer' },
        { key: 'other', value: 'Other' }
      ],

      device_types: [
        { key: 'raspberry_pi',  value: 'Raspberry Pi' },
        { key: 'arduino',       value: 'Arduino' },
        { key: 'custom',        value: 'Custom' }
      ],

      slice_directions: [
        { key: 'input',   value: 'Input' },
        { key: 'output',  value: 'Output' },
        { key: 'counter', value: 'Counter' },
      ],

      slice_types: [
        {
          key: 'custom',
          value: 'Custom',
          units: [
            { key: 'numeric', value: 'Numeric' },
            { key: 'text',    value: 'Text' },
            { key: 'boolean', value: 'Boolean' }
          ]
        },
        {
          key: 'temperature',
          value: 'Temperature',
          units: [
            { key: 'c', value: 'C' },
            { key: 'f', value: 'F' }
          ]
        },
        {
          key: 'pressure',
          value: 'Pressure',
          units: [
            { key: 'b',   value: 'Bar' },
            { key: 'pa',  value: 'Pascal' },
            { key: 'hpa', value: 'Hectopascal' }
          ]
        },
        {
          key: 'humidity',
          value: 'Humidity',
          units: [
            { key: 'percent', value: 'Percent(%)' }
          ]
        }
      ],

      units: [
        { key: 'numeric',   value: 'Numeric' },
        { key: 'text',   value: 'Text' },
        { key: 'boolean',   value: 'Boolean' },

        { key: 'c',   value: 'C' },
        { key: 'f',   value: 'F' },

        { key: 'b',   value: 'Bar' },
        { key: 'pa',  value: 'Pascal' },
        { key: 'hpa', value: 'Hectopascal' },

        { key: '_', value: '%' },
      ]
    };

    return Data;

  }]);