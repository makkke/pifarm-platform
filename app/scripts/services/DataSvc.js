'use strict';

pinapleApp
  .factory('DataSvc', [function () {

    return {

      description_types: [
        { key: 'hobbyist', value: 'Hobbyist' },
        { key: 'student', value: 'Student' },
        { key: 'raspberryPioneer', value: 'Raspberry Pi-oneer' },
        { key: 'productBuilder', value: 'Product Builder' },
        { key: 'solutionProvider', value: 'Solution Provider' },
        { key: 'manufacturer', value: 'Manufacturer' },
        { key: 'other', value: 'Other' },
      ],

      device_types: [
        { key: 'rpi', value: 'Raspberry Pi' },
        { key: 'arduino', value: 'Arduino' },
        { key: 'custom', value: 'Custom' },
      ]

    };

  }]);