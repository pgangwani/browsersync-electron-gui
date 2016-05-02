// In renderer process (web page).

//const ipcRenderer = electron.ipcRenderer;
const remote = window.require('remote');


//const ipcRenderer = window.require('electron').ipcRenderer;
//const ipc = require('ipc');
//const ipcMain = require('electron').ipcMain;
var ipcRenderer = require('ipc');

console.log("app is started!");



document.getElementById("close-btn").addEventListener("click", function(e) {
    e.preventDefault();
    ipcRenderer.send('closeWindow');

});
// Call back for closeWindow 
ipcRenderer.on('closeWindow-reply', function(arg) {
    console.log(arg);
});

// document.querySelector('[someAttr]')
document.querySelector('.form-actions [type="submit"]').addEventListener("click", function(e) {
    e.preventDefault();
    let url = document.querySelector('.form-control[name="url"]').value,
        browsers = document.querySelectorAll("input[name^='browser']"),
        selectedBrowsers = []
    ;
    if(!url.match(/\S/)){
        //alert("no value sorry");
        console.log("empty url",url);
        return;
    }
    
    for (var i = 0; i < browsers.length; ++i) {
        var item = browsers[i];
        if(item.checked){
            selectedBrowsers.push(item.value);
        }
    }
    console.log(selectedBrowsers);
    
    
    
    
    // preparing option array 
    let selectedOption = {
        url : url,
        selectedBrowsers : selectedBrowsers
    };
    console.log(selectedOption);
    
    //alert('hi');
    
    if((e.target).value === 'start'){
        (e.target).textContent = "Starting Server..";
        (e.target).value = 'stop';
        selectedOption.command = 'start';
    }
    else if((e.target).value === 'stop'){
        (e.target).textContent = "Stopping the Server..";
        (e.target).value = 'start';
        selectedOption.command = 'stop';
    }
    else{
        console.log('its still starting, I wont go ahead, I m scared');
        return;
    }
    
    
    //console.log((e.target).value);
    ipcRenderer.send('toggleServer',selectedOption);

});


// Call back for toggleServer-reply
ipcRenderer.on('toggleServer-reply', function(status,message,bsObj) {
    console.log('bsObj',bsObj);
    console.log(status,message);
    debugger;
    var elSuccessMessage = document.querySelector('.success-message');
    var elButton = document.querySelector('.form-actions [type="submit"]');
    if(status === 'started'){
       elButton.textContent = 'stop';
        elSuccessMessage.innerHTML = message ;
        if (elSuccessMessage.classList.contains("hide"))
            elSuccessMessage.classList.remove("hide");
    }
    else if (status === 'stopped'){
        elButton.textContent = 'start';
        elSuccessMessage.innerHTML = message ;
        
        if (elSuccessMessage.classList.contains("hide"))
            elSuccessMessage.classList.remove("hide");
    }
    
});




