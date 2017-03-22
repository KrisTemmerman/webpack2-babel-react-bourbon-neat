import React from 'react';
import AppCSS from './App.scss';

const reactlogo = require('./reactlogo.svg');
export default class App extends React.Component {
  render() {
    return (
    	<div className={AppCSS.container}>

	    	<div className={AppCSS.introduction}>
	    		<h1>webpack2-react-babel-scss boilerplate</h1>
	    	</div>
	    	<div className={AppCSS.logo}>
		    	<img src={reactlogo}/>
	    	</div>
    	</div>
    )
  }
}