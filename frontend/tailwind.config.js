/** @type {import('tailwindcss').Config} */
// import footer from
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "left-image": "url('/src/assets/images/Advertisement/left.webp')",
        "right-image": "url('/src/assets/images/Advertisement/right.webp')",
        "center-image": "url('/src/assets/images/Advertisement/center.webp')",
        footer: "url('/src/assets/images/footer/footer-bg.webp')",
      },
      keyframes: {
        slideIn: {
          from: { transform: "scaleY(0.6)", opacity: 0 },
          to: { transform: "scaleY(1)", opacity: 1 },
        },
        fromRight: {
          from: { opacity: 0, transform: "translateX(100%)" },
          "50%": { opacity: 1 },
          to: { transform: "translateX(0%)" },
        },
        fromLeft: {
          from: { opacity: 0, transform: "translateX(-100%)" },
          "50%": { opacity: 1 },
          to: { transform: "translateX(0%)" },
        },
        fromCenter: {
          from: { opacity: 0, transform: "scale(50%)" },
          "50%": { opacity: 1 },
          to: { transform: "scale(100%)" },
        },
        fadeInOut: {
          from: { opacity: 1 },
          "50%": { opacity: 0.8 },
          to: { opacity: 1 },
        },
        slideLeftToRight: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(400%)" },
        },
        slideRightToLeft: {
          from: { transform: "translateX(400%)" },
          to: { transform: "translateX(-100%)" },
        },
        fromTopToBottom: {
          from: { display: "none", transform: "translateY(-300%)" },
          to: { display: "block", transform: "translateY(0)" },
        },
        fromBottomToTop: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-300%)" },
        },
        fromFulltoEmpty: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-menu": "slideIn 300ms ease",
        "from-right": "fromRight 700ms ease-in-out",
        "from-left": "fromLeft 700ms ease-in-out",
        "from-center": "fromCenter 700ms ease-in-out",
        "fade-in-out": "fadeInOut 300ms ease-in-out",
        "hover-slider-on": "slideLeftToRight 300ms ease-in",
        "hover-slider-off": "slideRightToLeft 300ms ease-out",
        "notification-on": "fromTopToBottom 500ms cubic-bezier(0.68, 0, 0.265, 1.35)",
        "notification-off": "fromBottomToTop 500ms cubic-bezier(0.68, 0, 0.265, 1.35)",
        "notification-off-slider": "fromFulltoEmpty 3100ms linear",
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.68, 0, 0.265, 1.35)",
      },
    },
  },
  plugins: [],
};
