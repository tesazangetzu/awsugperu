/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header-custom": "url('../images/back-header.png')",
        "reward-custom": "url('../images/reward.jpg')",
      },
      backgroundColor: {
        "white-trans-6": "#ffffffd1",
      },
    },
  },
  plugins: [],
};
