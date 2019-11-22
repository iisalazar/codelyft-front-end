import React, { useContext } from "react";
import AlertContext from "../context/alert/alertContext";

const Alert = () => {

	const alertContext = useContext(AlertContext);

	// we do not need to extract data from alertContext
	// because alertContext by default returns the state, which is an 
	// array of alerts
	const { alerts } = alertContext;

	return (

		alerts.length > 0 &&
		alerts.map( alert => (
			<div key={ alert.id } className={ `alert alert-${alert.type}` }>
				<i className="fa fa-info-circle" />
				{' '}{ alert.msg }
			</div>
		))
	)

}

export default Alert;