import { useState } from 'react';
import css from './app.module.css';
import data from './data.json';

export function App() {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isStart = activeIndex === 0;
	const isFinish = activeIndex === steps.length - 1;

	function prev() {
		setActiveIndex(activeIndex - 1);
	}

	function next() {
		setActiveIndex(activeIndex + 1);
	}

	function start() {
		setActiveIndex(0);
	}

	function getStepItemClasses(index) {
		const classes = [css['steps-item']];

		if (index === activeIndex) classes.push([css['active']]);
		if (index < activeIndex) classes.push([css['done']]);

		return classes.join(' ');
	}

	return (
		<div className={css['container']}>
			<div className={css['card']}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={css['steps']}>
					<div className={css['steps-content']}>{steps[activeIndex].content}</div>
					<ul className={css['steps-list']}>
						{steps.map((step, i) => (
							<li className={getStepItemClasses(i)} key={step.id}>
								<button className={css['steps-item-button']} onClick={() => setActiveIndex(i)}>
									{i + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={css['buttons-container']}>
						<button className={css['button']} onClick={prev} disabled={isStart}>
							Назад
						</button>
						<button className={css['button']} onClick={isFinish ? start : next}>
							{isFinish ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
