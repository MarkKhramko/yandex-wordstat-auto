'use strict';

const btnStart = document.getElementById('btn-start');
btnStart.onclick = function(trg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(tabs[0].id, {
			file: 'collect.js'
		});
	});
};