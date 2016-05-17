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
	
	'use strict';
	
	var remote = window.require('remote');
	var ipcRenderer = __webpack_require__(1);
	
	//console.log("app is started!");
	
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
	    //console.log(selectedBrowsers);
	
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
	    //console.log('bsObj',bsObj);
	    //console.log(status,message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU0OGJlMTJkNmE5NTVmYzM4MDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXBjXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcENBLEtBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEMsS0FBTSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxDQUFLLENBQUMsQ0FBQzs7OztBQU1uQyxTQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBRTtBQUN2RSxNQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsZ0JBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7RUFFbkMsQ0FBQyxDQUFDOztBQUVILFlBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxHQUFHLEVBQUU7QUFDOUMsWUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQUM7OztBQUdILFNBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDMUYsTUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLFNBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxLQUFLO1NBQy9ELFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUM7U0FDOUQsZ0JBQWdCLEdBQUcsRUFBRSxDQUN4QjtBQUNELFNBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDOztBQUVoQixnQkFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsZ0JBQU87TUFDVjs7QUFFRCxVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN0QyxhQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsYUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO0FBQ1osNkJBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNyQztNQUNKOzs7O0FBT0QsU0FBSSxjQUFjLEdBQUc7QUFDakIsWUFBRyxFQUFHLEdBQUc7QUFDVCx5QkFBZ0IsRUFBRyxnQkFBZ0I7TUFDdEMsQ0FBQztBQUNGLFlBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7QUFJNUIsU0FBSSxDQUFDLENBQUMsTUFBTSxDQUFFLEtBQUssS0FBSyxPQUFPLEVBQUM7QUFDM0IsVUFBQyxDQUFDLE1BQU0sQ0FBRSxXQUFXLEdBQUcsbUJBQW1CLENBQUM7QUFDNUMsVUFBQyxDQUFDLE1BQU0sQ0FBRSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQzFCLHVCQUFjLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztNQUNwQyxNQUNJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxLQUFLLEtBQUssTUFBTSxFQUFDO0FBQy9CLFVBQUMsQ0FBQyxNQUFNLENBQUUsV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQ2hELFVBQUMsQ0FBQyxNQUFNLENBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUMzQix1QkFBYyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7TUFDbkMsTUFDRztBQUNBLGdCQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7QUFDL0QsZ0JBQU87TUFDVjs7O0FBSUQsZ0JBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0VBRW5ELENBQUMsQ0FBQzs7O0FBSUgsWUFBVyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFTLE1BQU0sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFOzs7QUFHaEUsU0FBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbEUsU0FBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3ZFLFNBQUcsTUFBTSxLQUFLLFNBQVMsRUFBQztBQUNyQixpQkFBUSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDN0IseUJBQWdCLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBRTtBQUN0QyxhQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQzNDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDakQsTUFDSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUM7QUFDMUIsaUJBQVEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBQy9CLHlCQUFnQixDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUU7O0FBRXRDLGFBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFDM0MsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNqRDtFQUVKLENBQUMsQzs7Ozs7O0FDOUZGLGlDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGFlNDhiZTEyZDZhOTU1ZmMzODAyXG4gKiovIiwiLy8gSW4gcmVuZGVyZXIgcHJvY2VzcyAod2ViIHBhZ2UpLlxuXG5jb25zdCByZW1vdGUgPSB3aW5kb3cucmVxdWlyZSgncmVtb3RlJyk7XG5jb25zdCBpcGNSZW5kZXJlciA9IHJlcXVpcmUoJ2lwYycpO1xuXG4vL2NvbnNvbGUubG9nKFwiYXBwIGlzIHN0YXJ0ZWQhXCIpO1xuXG5cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnY2xvc2VXaW5kb3cnKTtcblxufSk7XG4vLyBDYWxsIGJhY2sgZm9yIGNsb3NlV2luZG93IFxuaXBjUmVuZGVyZXIub24oJ2Nsb3NlV2luZG93LXJlcGx5JywgZnVuY3Rpb24oYXJnKSB7XG4gICAgY29uc29sZS5sb2coYXJnKTtcbn0pO1xuXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbc29tZUF0dHJdJylcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWFjdGlvbnMgW3R5cGU9XCJzdWJtaXRcIl0nKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tY29udHJvbFtuYW1lPVwidXJsXCJdJykudmFsdWUsXG4gICAgICAgIGJyb3dzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W25hbWVePSdicm93c2VyJ11cIiksXG4gICAgICAgIHNlbGVjdGVkQnJvd3NlcnMgPSBbXVxuICAgIDtcbiAgICBpZighdXJsLm1hdGNoKC9cXFMvKSl7XG4gICAgICAgIC8vYWxlcnQoXCJubyB2YWx1ZSBzb3JyeVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlbXB0eSB1cmxcIix1cmwpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJvd3NlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBicm93c2Vyc1tpXTtcbiAgICAgICAgaWYoaXRlbS5jaGVja2VkKXtcbiAgICAgICAgICAgIHNlbGVjdGVkQnJvd3NlcnMucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKHNlbGVjdGVkQnJvd3NlcnMpO1xuICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgIC8vIHByZXBhcmluZyBvcHRpb24gYXJyYXkgXG4gICAgbGV0IHNlbGVjdGVkT3B0aW9uID0ge1xuICAgICAgICB1cmwgOiB1cmwsXG4gICAgICAgIHNlbGVjdGVkQnJvd3NlcnMgOiBzZWxlY3RlZEJyb3dzZXJzXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbik7XG4gICAgXG4gICAgLy9hbGVydCgnaGknKTtcbiAgICBcbiAgICBpZigoZS50YXJnZXQpLnZhbHVlID09PSAnc3RhcnQnKXtcbiAgICAgICAgKGUudGFyZ2V0KS50ZXh0Q29udGVudCA9IFwiU3RhcnRpbmcgU2VydmVyLi5cIjtcbiAgICAgICAgKGUudGFyZ2V0KS52YWx1ZSA9ICdzdG9wJztcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24uY29tbWFuZCA9ICdzdGFydCc7XG4gICAgfVxuICAgIGVsc2UgaWYoKGUudGFyZ2V0KS52YWx1ZSA9PT0gJ3N0b3AnKXtcbiAgICAgICAgKGUudGFyZ2V0KS50ZXh0Q29udGVudCA9IFwiU3RvcHBpbmcgdGhlIFNlcnZlci4uXCI7XG4gICAgICAgIChlLnRhcmdldCkudmFsdWUgPSAnc3RhcnQnO1xuICAgICAgICBzZWxlY3RlZE9wdGlvbi5jb21tYW5kID0gJ3N0b3AnO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmxvZygnaXRzIHN0aWxsIHN0YXJ0aW5nLCBJIHdvbnQgZ28gYWhlYWQsIEkgbSBzY2FyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICAvL2NvbnNvbGUubG9nKChlLnRhcmdldCkudmFsdWUpO1xuICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3RvZ2dsZVNlcnZlcicsc2VsZWN0ZWRPcHRpb24pO1xuXG59KTtcblxuXG4vLyBDYWxsIGJhY2sgZm9yIHRvZ2dsZVNlcnZlci1yZXBseVxuaXBjUmVuZGVyZXIub24oJ3RvZ2dsZVNlcnZlci1yZXBseScsIGZ1bmN0aW9uKHN0YXR1cyxtZXNzYWdlLGJzT2JqKSB7XG4gICAgLy9jb25zb2xlLmxvZygnYnNPYmonLGJzT2JqKTtcbiAgICAvL2NvbnNvbGUubG9nKHN0YXR1cyxtZXNzYWdlKTtcbiAgICB2YXIgZWxTdWNjZXNzTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWNjZXNzLW1lc3NhZ2UnKTtcbiAgICB2YXIgZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hY3Rpb25zIFt0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgaWYoc3RhdHVzID09PSAnc3RhcnRlZCcpe1xuICAgICAgIGVsQnV0dG9uLnRleHRDb250ZW50ID0gJ3N0b3AnO1xuICAgICAgICBlbFN1Y2Nlc3NNZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2UgO1xuICAgICAgICBpZiAoZWxTdWNjZXNzTWVzc2FnZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpKVxuICAgICAgICAgICAgZWxTdWNjZXNzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdHVzID09PSAnc3RvcHBlZCcpe1xuICAgICAgICBlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdzdGFydCc7XG4gICAgICAgIGVsU3VjY2Vzc01lc3NhZ2UuaW5uZXJIVE1MID0gbWVzc2FnZSA7XG4gICAgICAgIFxuICAgICAgICBpZiAoZWxTdWNjZXNzTWVzc2FnZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpKVxuICAgICAgICAgICAgZWxTdWNjZXNzTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICB9XG4gICAgXG59KTtcblxuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFpbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlwY1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiaXBjXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9