import React from "react";
import { shallow, mount } from "enzyme";
import exchangeAPI from './__mocks__/exchangeAPI.js';
import ipfsAPI from './__mocks__/ipfsAPI.js';

describe('Fetching', () => {

	it('should fetch exchange rate', async() => {
		let rate = await exchangeAPI();
		expect(rate).toBeDefined();	
	});

	it('should return object', async() => {
		let auction = await ipfsAPI();
		expect(auction).toBeDefined();	
	});


});