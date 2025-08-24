const techIcons: Record<string, string> = {
	'React': 'devicon-react-original colored',
	'Next.js': 'devicon-nextjs-original',
	'TypeScript': 'devicon-typescript-plain colored',
	'Tailwind CSS': 'devicon-tailwindcss-plain colored',
	'Python': 'devicon-python-original colored',
	'FastAPI': 'devicon-fastapi-plain colored',
	'Go': 'devicon-go-original-wordmark colored',
	'AWS': 'devicon-amazonwebservices-plain-wordmark colored',
	'Docker': 'devicon-docker-plain colored',
	'JavaScript': 'devicon-javascript-plain colored',
	'Vue.js': 'devicon-vuejs-plain colored',
	'Angular': 'devicon-angularjs-plain colored',
	'Node.js': 'devicon-nodejs-plain colored',
	'MongoDB': 'devicon-mongodb-plain colored',
	'PostgreSQL': 'devicon-postgresql-plain colored',
	'MySQL': 'devicon-mysql-plain colored',
	'Redis': 'devicon-redis-plain colored',
	'Git': 'devicon-git-plain colored',
	'Linux': 'devicon-linux-plain',
	'Ubuntu': 'devicon-ubuntu-plain colored',
	'CSS3': 'devicon-css3-plain colored',
	'HTML5': 'devicon-html5-plain colored',
	'Sass': 'devicon-sass-original colored',
	'Webpack': 'devicon-webpack-plain colored',
	'Vite': 'devicon-vitejs-plain colored'
};

export function getTechIcon(tech: string): string {
	if (techIcons[tech]) {
		return techIcons[tech];
	}

	const normalized = tech.toLowerCase();
	for (const [key, icon] of Object.entries(techIcons)) {
		if (key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
			return icon;
		}
	}

	return 'devicon-devicon-plain';
}