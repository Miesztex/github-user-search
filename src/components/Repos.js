import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
	const { repos } = useContext(GithubContext);

	// -------------- languages count -------------------
	let languages = repos.reduce((total, item) => {
		const { language, stargazers_count: starsCount } = item;
		// if no language
		if (!language) return total;

		// if first project in this language
		if (!total[language])
			total[language] = { label: language, value: 1, stars: starsCount };
		// if another project in this language
		else
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + starsCount,
			};
		return total;
	}, {});

	// turns object into array
	// sort by desc value
	// get 5 most popular
	const mostUsedLanguages = Object.values(languages)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5);

	// sort and sets stars as a value
	const mostPopularLanguage = Object.values(languages)
		.sort((a, b) => b.stars - a.stars)
		.map(item => {
			return { ...item, value: item.stars };
		});

	// ------------ stars, forks ------------------

	let { stars, forks } = repos.reduce(
		(total, item) => {
			const { stargazers_count, name, forks } = item;
			total.stars[stargazers_count] = { label: name, value: stargazers_count };
			total.forks[forks] = { label: name, value: forks };
			// stars: {n: {label, value} }
			return total;
		},
		{
			stars: {},
			forks: {},
		}
	);

	// object into sorted array, last 5(most starred), reverse
	stars = Object.values(stars).slice(-5).reverse();
	forks = Object.values(forks).slice(-5).reverse();
	// -------------------------------------------------------

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				<Pie3D data={mostUsedLanguages} />
				<Column3D data={stars} />
				<Doughnut2D data={mostPopularLanguage} />
				<Bar3D data={forks} />
				<div></div>
			</Wrapper>
		</section>
	);
};

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`;

export default Repos;
