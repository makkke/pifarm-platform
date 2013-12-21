'use strict';

pinapleApp
  .factory('DataSvc', [function () {

    return {

      descriptionTypes: [
        { key: 'hobbyist', value: 'Hobbyist' },
        { key: 'student', value: 'Student' },
        { key: 'raspberryPioneer', value: 'Raspberry Pi-oneer' },
        { key: 'productBuilder', value: 'Product Builder' },
        { key: 'solutionProvider', value: 'Solution Provider' },
        { key: 'manufacturer', value: 'Manufacturer' },
        { key: 'other', value: 'Other' },
      ]

    };

  }]);