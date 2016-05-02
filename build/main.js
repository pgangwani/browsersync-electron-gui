/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// In renderer process (web page).
	
	//const ipcRenderer = electron.ipcRenderer;
	'use strict';
	
	var remote = window.require('remote');
	
	//const ipcRenderer = window.require('electron').ipcRenderer;
	//const ipc = require('ipc');
	//const ipcMain = require('electron').ipcMain;
	var ipcRenderer = __webpack_require__(1);
	
	console.log("app is started!");
	
	document.getElementById("close-btn").addEventListener("click", function (e) {
	    e.preventDefault();
	    ipcRenderer.send('closeWindow');
	});
	// Call back for closeWindow
	ipcRenderer.on('closeWindow-reply', function (arg) {
	    console.log(arg);
	});
	
	// document.querySelector('[someAttr]')
	document.querySelector('.form-actions [type="submit"]').addEventListener("click", function (e) {
	    e.preventDefault();
	    var url = document.querySelector('.form-control[name="url"]').value,
	        browsers = document.querySelectorAll("input[name^='browser']"),
	        selectedBrowsers = [];
	    if (!url.match(/\S/)) {
	        //alert("no value sorry");
	        console.log("empty url", url);
	        return;
	    }
	
	    for (var i = 0; i < browsers.length; ++i) {
	        var item = browsers[i];
	        if (item.checked) {
	            selectedBrowsers.push(item.value);
	        }
	    }
	    console.log(selectedBrowsers);
	
	    // preparing option array
	    var selectedOption = {
	        url: url,
	        selectedBrowsers: selectedBrowsers
	    };
	    console.log(selectedOption);
	
	    //alert('hi');
	
	    if (e.target.value === 'start') {
	        e.target.textContent = "Starting Server..";
	        e.target.value = 'stop';
	        selectedOption.command = 'start';
	    } else if (e.target.value === 'stop') {
	        e.target.textContent = "Stopping the Server..";
	        e.target.value = 'start';
	        selectedOption.command = 'stop';
	    } else {
	        console.log('its still starting, I wont go ahead, I m scared');
	        return;
	    }
	
	    //console.log((e.target).value);
	    ipcRenderer.send('toggleServer', selectedOption);
	});
	
	// Call back for toggleServer-reply
	ipcRenderer.on('toggleServer-reply', function (status, message, bsObj) {
	    console.log('bsObj', bsObj);
	    console.log(status, message);
	    debugger;
	    var elSuccessMessage = document.querySelector('.success-message');
	    var elButton = document.querySelector('.form-actions [type="submit"]');
	    if (status === 'started') {
	        elButton.textContent = 'stop';
	        elSuccessMessage.innerHTML = message;
	        if (elSuccessMessage.classList.contains("hide")) elSuccessMessage.classList.remove("hide");
	    } else if (status === 'stopped') {
	        elButton.textContent = 'start';
	        elSuccessMessage.innerHTML = message;
	
	        if (elSuccessMessage.classList.contains("hide")) elSuccessMessage.classList.remove("hide");
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("ipc");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTBjNDBlMmMzNWEzOWZmODBlMGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXBjXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25DQSxLQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OztBQU14QyxLQUFJLFdBQVcsR0FBRyxtQkFBTyxDQUFDLENBQUssQ0FBQyxDQUFDOztBQUVqQyxRQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBSS9CLFNBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3ZFLE1BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixnQkFBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztFQUVuQyxDQUFDLENBQUM7O0FBRUgsWUFBVyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFTLEdBQUcsRUFBRTtBQUM5QyxZQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLENBQUMsQ0FBQzs7O0FBR0gsU0FBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBRTtBQUMxRixNQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsU0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFB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QUFDLEVBQzNDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDakQ7RUFFSixDQUFDLEM7Ozs7OztBQ3JHRixpQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1MGM0MGUyYzM1YTM5ZmY4MGUwYlxuICoqLyIsIi8vIEluIHJlbmRlcmVyIHByb2Nlc3MgKHdlYiBwYWdlKS5cblxuLy9jb25zdCBpcGNSZW5kZXJlciA9IGVsZWN0cm9uLmlwY1JlbmRlcmVyO1xuY29uc3QgcmVtb3RlID0gd2luZG93LnJlcXVpcmUoJ3JlbW90ZScpO1xuXG5cbi8vY29uc3QgaXBjUmVuZGVyZXIgPSB3aW5kb3cucmVxdWlyZSgnZWxlY3Ryb24nKS5pcGNSZW5kZXJlcjtcbi8vY29uc3QgaXBjID0gcmVxdWlyZSgnaXBjJyk7XG4vL2NvbnN0IGlwY01haW4gPSByZXF1aXJlKCdlbGVjdHJvbicpLmlwY01haW47XG52YXIgaXBjUmVuZGVyZXIgPSByZXF1aXJlKCdpcGMnKTtcblxuY29uc29sZS5sb2coXCJhcHAgaXMgc3RhcnRlZCFcIik7XG5cblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpcGNSZW5kZXJlci5zZW5kKCdjbG9zZVdpbmRvdycpO1xuXG59KTtcbi8vIENhbGwgYmFjayBmb3IgY2xvc2VXaW5kb3cgXG5pcGNSZW5kZXJlci5vbignY2xvc2VXaW5kb3ctcmVwbHknLCBmdW5jdGlvbihhcmcpIHtcbiAgICBjb25zb2xlLmxvZyhhcmcpO1xufSk7XG5cbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzb21lQXR0cl0nKVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tYWN0aW9ucyBbdHlwZT1cInN1Ym1pdFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB1cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1jb250cm9sW25hbWU9XCJ1cmxcIl0nKS52YWx1ZSxcbiAgICAgICAgYnJvd3NlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZV49J2Jyb3dzZXInXVwiKSxcbiAgICAgICAgc2VsZWN0ZWRCcm93c2VycyA9IFtdXG4gICAgO1xuICAgIGlmKCF1cmwubWF0Y2goL1xcUy8pKXtcbiAgICAgICAgLy9hbGVydChcIm5vIHZhbHVlIHNvcnJ5XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImVtcHR5IHVybFwiLHVybCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBicm93c2Vycy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IGJyb3dzZXJzW2ldO1xuICAgICAgICBpZihpdGVtLmNoZWNrZWQpe1xuICAgICAgICAgICAgc2VsZWN0ZWRCcm93c2Vycy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkQnJvd3NlcnMpO1xuICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgIC8vIHByZXBhcmluZyBvcHRpb24gYXJyYXkgXG4gICAgbGV0IHNlbGVjdGVkT3B0aW9uID0ge1xuICAgICAgICB1cmwgOiB1cmwsXG4gICAgICAgIHNlbGVjdGVkQnJvd3NlcnMgOiBzZWxlY3RlZEJyb3dzZXJzXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbik7XG4gICAgXG4gICAgLy9hbGVydCgnaGknKTtcbiAgICBcbiAgICBpZigoZS50YXJnZXQpLnZhbHVlID09PSAnc3RhcnQnKXtcbiAgICAgICAgKGUudGFyZ2V0KS50ZXh0Q29udGVudCA9IFwiU3RhcnRpbmcgU2VydmVyLi5cIjtcbiAgICAgICAgKGUudGFyZ2V0KS52YWx1ZSA9ICdzdG9wJztcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24uY29tbWFuZCA9ICdzdGFydCc7XG4gICAgfVxuICAgIGVsc2UgaWYoKGUudGFyZ2V0KS52YWx1ZSA9PT0gJ3N0b3AnKXtcbiAgICAgICAgKGUudGFyZ2V0KS50ZXh0Q29udGVudCA9IFwiU3RvcHBpbmcgdGhlIFNlcnZlci4uXCI7XG4gICAgICAgIChlLnRhcmdldCkudmFsdWUgPSAnc3RhcnQnO1xuICAgICAgICBzZWxlY3RlZE9wdGlvbi5jb21tYW5kID0gJ3N0b3AnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmxvZygnaXRzIHN0aWxsIHN0YXJ0aW5nLCBJIHdvbnQgZ28gYWhlYWQsIEkgbSBzY2FyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICAvL2NvbnNvbGUubG9nKChlLnRhcmdldCkudmFsdWUpO1xuICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3RvZ2dsZVNlcnZlcicsc2VsZWN0ZWRPcHRpb24pO1xuXG59KTtcblxuXG4vLyBDYWxsIGJhY2sgZm9yIHRvZ2dsZVNlcnZlci1yZXBseVxuaXBjUmVuZGVyZXIub24oJ3RvZ2dsZVNlcnZlci1yZXBseScsIGZ1bmN0aW9uKHN0YXR1cyxtZXNzYWdlLGJzT2JqKSB7XG4gICAgY29uc29sZS5sb2coJ2JzT2JqJyxic09iaik7XG4gICAgY29uc29sZS5sb2coc3RhdHVzLG1lc3NhZ2UpO1xuICAgIGRlYnVnZ2VyO1xuICAgIHZhciBlbFN1Y2Nlc3NNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuICAgIHZhciBlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFjdGlvbnMgW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICBpZihzdGF0dXMgPT09ICdzdGFydGVkJyl7XG4gICAgICAgZWxCdXR0b24udGV4dENvbnRlbnQgPSAnc3RvcCc7XG4gICAgICAgIGVsU3VjY2Vzc01lc3NhZ2UuaW5uZXJIVE1MID0gbWVzc2FnZSA7XG4gICAgICAgIGlmIChlbFN1Y2Nlc3NNZXNzYWdlLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIikpXG4gICAgICAgICAgICBlbFN1Y2Nlc3NNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0dXMgPT09ICdzdG9wcGVkJyl7XG4gICAgICAgIGVsQnV0dG9uLnRleHRDb250ZW50ID0gJ3N0YXJ0JztcbiAgICAgICAgZWxTdWNjZXNzTWVzc2FnZS5pbm5lckhUTUwgPSBtZXNzYWdlIDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbFN1Y2Nlc3NNZXNzYWdlLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIikpXG4gICAgICAgICAgICBlbFN1Y2Nlc3NNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgIH1cbiAgICBcbn0pO1xuXG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWluLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaXBjXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJpcGNcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=