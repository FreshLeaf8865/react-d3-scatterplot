import 'babel-polyfill';
import 'styles/application.scss';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import App from 'components/App'


ReactDOM.render(
    <App/>,
    document.getElementById('content')
);
