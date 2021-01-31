import axios from 'axios';
const KEY = 'AIzaSyCcuU6EFwuPJudqzFUN2jQJ9pmEzdPqyLA';

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
	params: {
		part: 'snippet',
		channelId: 'UCTPAHk1b-h-WGQn9cfGlw2Q',
		maxResults: 900,
		key: KEY,
	},
});

// channelId: for ndrdoku found by going to one of their videos opening dev tools clicking youtube.com then the watch?v=... there searched for channelId and found

// 'UCTPAHk1b-h-WGQn9cfGlw2Q'
