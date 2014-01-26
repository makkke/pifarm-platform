'use strict';

pinapleApp
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
        { key: 'raspberry_pi', value: 'Raspberry Pi' },
        { key: 'arduino', value: 'Arduino' },
        { key: 'custom', value: 'Custom' }
      ]
    };

    return Data;

  }]);