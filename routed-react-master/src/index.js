// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import Routes from './routes';
import './index.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import logo from './img/Logo_ML@2x.png.png';
import icon from './img/ic_Search.png';



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.getElementById('logo').src=logo;
document.getElementById('icon').src=icon;

var search = getParameterByName('search'); // "lorem"

if (search!=null) {
	reactLocalStorage.setObject('search', {'search': search});
}
var path = location.pathname;
if (path=="/") {
 reactLocalStorage.setObject('search', {'search': null}); 
}


var searchitems=reactLocalStorage.getObject('search');
document.getElementById("search").value=searchitems.search;

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
