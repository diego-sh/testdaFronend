import React, {Component} from 'react';
import {Button} from "primereact/button";

export default class NotFound extends Component {

	render() {
		return <div className="exception-body notfound">
			<div className="exception-text">
				<div className="notfound-box">
					<span>404</span>
				</div>
				<span className="notfound-text"> Page Not Found</span>
			</div>
			<div className="exception-panel">
				<div className="exception-image">
					<img src="assets/layout/images/exception/icon-error.png" alt="avalon-react"/>
				</div>
				<div className="exception-panel-content">
					<div className="information-text">
						<h3>That wasn’t supposed to happen...</h3>
						<p>Better get back home and forget about that</p>
					</div>
					<Button label="Go To Dashboard" onClick={() => {window.location = "/#"}} />
				</div>
			</div>
		</div>
	}
}