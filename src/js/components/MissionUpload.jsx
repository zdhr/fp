import React from 'react';
import Dropzone from 'react-dropzone';

export default class MissionUpload extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progress: false,
		};
	}

	onDrop (acceptedFiles, rejectedFiles) {
		const file = acceptedFiles.pop();
		const fileReader = new FileReader();
		const url = 'upload.php';

		fileReader.onload = function(event) {
			const options = {
				method: 'post',
				body: event.target.result
			}

			fetch(url, options)
				.then((response) => response.json())
				.then((response) => {
					this.props.onUpload(response);
					this.setState({
						progress: false,
					});
				});
		}.bind(this);

		fileReader.readAsDataURL(file);
		this.setState({
			progress: true,
		});
	}

	render() {
		return this.state.progress ? (
			<div className="mission-upload loading">
				Please wait...
			</div>
		) : (
			<Dropzone className="mission-upload" onDrop={this.onDrop.bind(this)}>
				Upload mission
			</Dropzone>
		);
	}
}
