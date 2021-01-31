import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/Searchbar';
import youtube from './apis/youtube';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

export default class pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null,
			offset: 0,
			data: [],
			perPage: 10,
			currentPage: 0,
		};
		this.handlePageClick = this.handlePageClick.bind(this);
	}
	receivedData() {
		axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
			const data = res.data;
			const slice = data.slice(
				this.state.offset,
				this.state.offset + this.state.perPage,
			);
			const postData = slice.map((pd) => (
				<React.Fragment>
					<p>{pd.title}</p>
					<img src={pd.thumbnailUrl} alt='' />
				</React.Fragment>
			));

			this.setState({
				pageCount: Math.ceil(data.length / this.state.perPage),

				postData,
			});
		});
	}
	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;

		this.setState(
			{
				currentPage: selectedPage,
				offset: offset,
			},
			() => {
				this.receivedData();
			},
		);
	};

	handleSubmit = async (termFromSearchBar) => {
		const response = await youtube.get('/search', {
			params: {
				q: termFromSearchBar,
			},
		});

		this.setState({
			videos: response.data.items,
		});
		console.log('this is resp', response);
	};
	handleVideoSelect = (video) => {
		this.setState({ selectedVideo: video });
	};

	componentDidMount() {
		this.receivedData();
	}
	render() {
		return (
			<div className='ui container' style={{ marginTop: '1em' }}>
				<SearchBar handleFormSubmit={this.handleSubmit} />
				<div className='ui grid'>
					<div className='ui row'>
						<div className='eleven wide column'>
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className='five wide column'>
							<VideoList
								handleVideoSelect={this.handleVideoSelect}
								videos={this.state.videos}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
