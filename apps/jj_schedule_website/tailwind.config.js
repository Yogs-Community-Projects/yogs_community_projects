/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        babas: ['Bebas'],
      },
      width: {
        data: 'var(--data-size)',
        slot: 'var(--slot-width)',
        schedule: 'var(--schedule-width)',
        'schedule-body': 'var(--schedule-body-width)',
      },
      height: {
        data: 'var(--data-size)',
        slot: 'var(--slot-height)',
        schedule: 'var(--schedule-height)',
        'schedule-body': 'var(--schedule-body-height)',
      },
      colors: {
        overlay: '#ffffff05',
        primary: {
          DEFAULT: '#E30E50',
          shade: '#57051f',
          50: '#FAAFC6',
          100: '#F99BB8',
          200: '#F6759D',
          300: '#F44E82',
          400: '#F22867',
          500: '#E30E50',
          600: '#AE0B3D',
          700: '#79072B',
          800: '#440418',
          900: '#100106',
          950: '#000000',
        },
        accent: {
          DEFAULT: '#3584BF',
          shade: '#09437a',
          50: '#BED9ED',
          100: '#AFD0E9',
          200: '#8FBDE0',
          300: '#6FAAD7',
          400: '#4F98CE',
          500: '#3584BF',
          600: '#296693',
          700: '#1D4767',
          800: '#10293B',
          900: '#040B0F',
          950: '#000000',
        },
        twitch: {
          DEFAULT: '#9146FF',
          50: '#FEFEFF',
          100: '#F2E9FF',
          200: '#DAC0FF',
          300: '#C298FF',
          400: '#A96FFF',
          500: '#9146FF',
          600: '#700EFF',
          700: '#5600D5',
          800: '#40009D',
          900: '#290065',
        },
        youtube: '#ff0000',
        'tinyteams-primary': {
          DEFAULT: '#F23926',
          50: '#FCD7D3',
          100: '#FBC5C0',
          200: '#F9A299',
          300: '#F77F73',
          400: '#F45C4C',
          500: '#F23926',
          600: '#D31F0D',
          700: '#9E1709',
          800: '#691006',
          900: '#340803',
        },
        'tinyteams-accent': {
          DEFAULT: '#F00653',
          50: '#FDB1CA',
          100: '#FD9DBC',
          200: '#FC75A1',
          300: '#FB4D86',
          400: '#FA256B',
          500: '#F00653',
          600: '#B90540',
          700: '#83032D',
          800: '#4C021A',
          900: '#150107',
        },
        'pickaxe-grey-primary': {
          DEFAULT: '#5D6C84',
          50: '#C4CAD5',
          100: '#B8C0CD',
          200: '#A0AABC',
          300: '#8895AB',
          400: '#70809A',
          500: '#5D6C84',
          600: '#465163',
          700: '#2F3642',
          800: '#171B21',
          900: '#000000',
        },
        'pickaxe-grey-accent': {
          DEFAULT: '#999D7F',
          50: '#ECEDE7',
          100: '#E3E4DB',
          200: '#D0D2C4',
          300: '#BEC0AD',
          400: '#ABAF96',
          500: '#999D7F',
          600: '#7D8163',
          700: '#5E614A',
          800: '#3F4232',
          900: '#21221A',
        },
        'pickaxe-orange-primary': {
          DEFAULT: '#FF8B41',
          50: '#FFFBF9',
          100: '#FFEFE4',
          200: '#FFD6BB',
          300: '#FFBD93',
          400: '#FFA46A',
          500: '#FF8B41',
          600: '#FF6909',
          700: '#D05100',
          800: '#983B00',
          900: '#602500',
        },
        'pickaxe-orange-accent': {
          DEFAULT: '#DD4067',
          50: '#F9DCE3',
          100: '#F6CBD5',
          200: '#EFA8BA',
          300: '#E9859E',
          400: '#E36383',
          500: '#DD4067',
          600: '#C2234A',
          700: '#931A38',
          800: '#631226',
          900: '#330914',
        },

        reddit: {
          DEFAULT: '#FF4500',
          50: '#FFCBB8',
          100: '#FFBCA3',
          200: '#FF9E7A',
          300: '#FF8152',
          400: '#FF6329',
          500: '#FF4500',
          600: '#C73600',
          700: '#8F2700',
          800: '#571700',
          900: '#1F0800',
        },
        discord: {
          DEFAULT: '#5865F2',
          50: '#FFFFFF',
          100: '#EFF1FE',
          200: '#CACEFB',
          300: '#A4ABF8',
          400: '#7E88F5',
          500: '#5865F2',
          600: '#2435EE',
          700: '#101FCA',
          800: '#0C1796',
          900: '#080F62',
        },
        github: {
          DEFAULT: '#4078C0',
          50: '#CADAEE',
          100: '#BBCFE8',
          200: '#9CB9DE',
          300: '#7DA3D4',
          400: '#5F8ECA',
          500: '#4078C0',
          600: '#325E96',
          700: '#24436C',
          800: '#162942',
          900: '#080F18',
        },
      },
      screens: {
        screen700: {
          max: '700px',
        },
        screen800: '800px',
        screen900: '900px',
        screen1000: '1000px',
        screen1100: '1100px',
        screen1200: '1200px',
      },
      fontSize: {
        xxs: [
          '0.625rem;',
          {
            lineHeight: '0.75rem',
          },
        ],
        'slot-title': ['calc(var(--slot-height) / 8)'],
        'slot-subtitle': ['calc(var(--slot-height) / 10)'],
        'slot-countdown': ['calc(var(--slot-height) / 11)'],
        'day-header': ['calc(var(--data-size) / 2)'],
      },
      backgroundImage: {
        yogs: "url('assets/yogs.svg')",
        jj_background: "url('assets/Jingle_Jam_Background_Greyscale.png')",
        jj_background_2: "url('assets/Jingle_Jam_Background_Greyscale_2.png')",
        jj_background_3: "url('assets/Jingle_Jam_Background_Greyscale_3.png')",
        jj_background_4: "url('assets/Jingle_Jam_Background_Greyscale_4.png')",
      },
      scale: {
        101: '1.01',
        102: '1.02',
      },
      brightness: {
        101: '1.01',
        102: '1.02',
      },
      keyframes: {
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: 0.5 },
          '100%': { width: '500px', height: '500px', opacity: 0 },
        },
      },
      animation: {
        ripple: 'ripple 1s linear infinite',
        // marquee: 'marquee 120s linear infinite',
        // marquee2: 'marquee2 120s linear infinite',
      },
    },
    ripple: theme => ({
      colors: theme('colors'),
      // modifierTransition: 'background 0.2s',
      activeTransition: 'background 0.3s',
    }),
  },
  plugins: [require('@kobalte/tailwindcss')({ prefix: 'kb' }), require('daisyui')],
  daisyui: {
    styled: false,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
}
