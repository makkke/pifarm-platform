'use strict';

pinapleApp
  .controller('DevicesCtrl', ['$scope', 'DataSvc', function ($scope, DataSvc) {
    
    $scope.types = DataSvc.device_types;
    $scope.devices = [
    	{
    		id: 1,
    		name: 'My fish pi',
    		type: 'rpi',
    		serial_number: 'AB373654AD',
    		device_key: '2hd7s5ehd53gd...'
    	},
    	{
    		id: 2,
    		name: 'My popa pi',
    		type: 'rpi',
    		serial_number: 'BC374754KL',
    		device_key: 's5ehd532hd7gd...'
    	},
    	{
    		id: 3,
    		name: 'My ari',
    		type: 'arduino',
    		serial_number: 'BC374754KL',
    		device_key: 's5ehd532hd7gd...'
    	},
    	{
    		id: 4,
    		name: 'My long name of device',
    		type: 'arduino',
    		serial_number: 'BC374754KL',
    		device_key: 's5ehd532hd7gd...'
    	},
    	{
    		id: 5,
    		name: 'My short name of device',
    		type: 'custom',
    		serial_number: 'BC374754KL',
    		device_key: 's5ehd532hd7gd...'
    	}
    ];

  }]);