import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

export const GithubContext = React.createContext();

export const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	const [requests, setRequests] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: '' });

	// chech remaining requests
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			//response -> data -> rate -> remaining
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				// remaining = 0; // testing
				setRequests(remaining);
				if (remaining === 0) {
					toggleError(true, 'Sorry, hourly rate limit exceeded');
				} //throw error
			})
			.catch(err => console.log(err));
	};
	useEffect(checkRequests, []);

	// fetch searched user info
	const searchGithubUser = async user => {
		setLoading(true);
		toggleError();
		const resp = await axios(`${rootUrl}/users/${user}`).catch(err =>
			console.log(err)
		);
		if (resp) {
			setGithubUser(resp.data);
			const { login, followers_url } = resp.data;
			// setRepos,
			// https://api.github.com/users/john-smilga/repos?per_page=100
			// await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(resp =>
			// 	setRepos(resp.data)
			// );
			// followers
			// https://api.github.com/users/john-smilga/followers
			// await axios(`${followers_url}?per_page=100`).then(resp =>
			// 	setFollowers(resp.data)
			// );
			// ---------------------------------
			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then(results => {
					const [repos, followers] = results;
					const status = 'fulfilled';
					if (repos.status === status) setRepos(repos.value.data);
					if (followers.status === status) setFollowers(followers.value.data);
				})
				.catch(err => console.log(err));
			// ---------------------------------
		} else {
			toggleError(true, 'no user found');
		}
		setLoading(false);
		checkRequests();
	};

	const toggleError = (show = false, msg = '') => setError({ show, msg });

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				fetch,
				requests,
				error,
				searchGithubUser,
				loading,
			}}>
			{children}
		</GithubContext.Provider>
	);
};
