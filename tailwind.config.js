/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			frolick: {
  				yellow: '#FFD700',
  				'yellow-light': '#FFF4B8',
  				'yellow-dark': '#C5A600',
  				gold: '#DAA520',
  				amber: '#FFBF00',
  				dark: '#1A1A1A',
  				darker: '#111111',
  				charcoal: '#2D2D2D',
  				gray: '#4A4A4A',
  				'gray-light': '#B0B0B0',
  				red: '#D32F2F',
  				'red-dark': '#B71C1C',
  			}
  		},
  		fontFamily: {
  			oswald: ['Oswald', 'sans-serif'],
  			roboto: ['Roboto', 'sans-serif'],
  			merriweather: ['Merriweather', 'serif'],
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
}

