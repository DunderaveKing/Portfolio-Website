// Add or edit projects here. Each one becomes a card on the Projects page
// and a detail page at /projects/:slug.
export const projects = [
  {
    slug: 'portfolio-website',
    name: 'Portfolio Website',
    status: 'Live',
    summary: 'The site you are looking at right now — built to showcase my work as a developer.',
    stack: ['React', 'Vite', 'React Router'],
    role: 'Designed and built solo — layout, routing, and styling.',
    challenge:
      'TODO: describe a specific decision or problem you solved while building this site (e.g. structuring routes, theming, deployment).',
    liveUrl: '',
    repoUrl: 'https://github.com/DunderaveKing',
  },
  {
    slug: 'electricty-tracker',
    name: 'Electricity Tracker',
    status: 'In Development',
    summary: 'In a student enviroment, having multiple roommates and gauging electricity usage and projection of our rates can be tricky on a manual prepaid meter. To address it i have developed a solution that records, stores and visualises the data.',
    stack: ['Python', 'Flask-Library', 'HTML & CSS', 'Pandas-Library'], // TODO: e.g. ['Python', 'SQL']
    role: 'Ai assisted, I personally designed and adjusted errors and user-flow issues',
    challenge: 'To create an effective solution to better visualise over-use of electricty, as well as an easier way to quicky record electricty measures from a non-smart electricity meter',
    liveUrl: 'https://dunderaveking.github.io/electricity-app/index.html',
    repoUrl: 'https://github.com/DunderaveKing/electricity-app.git',
  },
]
