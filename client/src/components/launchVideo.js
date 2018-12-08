import React from 'react';
const baseURL = 'https://www.youtube.com/embed/';

const LaunchVideo = ({ video, mission }) => {
	if(!video) {
		return <div>Loading...</div>;
	}

	const videoSrc = baseURL + video.substring(32);
	return (
		<div className="card mb-3">
			<h4 className="card-header">Official Video For {mission} Mission</h4>
			<div className="card-body">
				<iframe title="video-player" width="560" height="315" src={videoSrc} />
			</div>
	  </div>
	);
};
 export default LaunchVideo;
