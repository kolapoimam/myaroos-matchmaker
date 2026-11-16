
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom brand colors
				brand: {
					green: {
						DEFAULT: '#0F6B4F', // Deep emerald
						light: '#2FA77C',
						dark: '#0A4A37',
					},
					black: {
						DEFAULT: '#1F2937', // Rich black
						light: '#374151',
						dark: '#111827',
					},
					gold: '#D69E35', // Gold accent
				},
				gold: 'hsl(var(--gold))',
				rose: 'hsl(var(--rose))',
				mint: 'hsl(var(--mint))',
				ink: 'hsl(var(--ink))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'slide': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'rise': {
					'0%': { opacity: '0', transform: 'translateY(14px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
					'50%': { transform: 'translateY(-10px) rotate(var(--r, 0deg))' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(4deg)' }
				},
				'pop': {
					'0%': { transform: 'scale(0.6)', opacity: '0' },
					'70%': { transform: 'scale(1.08)', opacity: '1' },
					'100%': { transform: 'scale(1)' }
				},
				'spin-slow': {
					to: { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide': 'slide 20s linear infinite',
				'fade-in': 'fade-in 0.5s ease-in-out',
				'fade-out': 'fade-out 0.5s ease-in-out',
				'rise': 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
				'float': 'float 6s ease-in-out infinite',
				'wiggle': 'wiggle 2.4s ease-in-out infinite',
				'pop': 'pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
				'spin-slow': 'spin-slow 40s linear infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
