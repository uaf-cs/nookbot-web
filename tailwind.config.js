export const tailwindConfig = {
  themes: [
    {
      mytheme: {
        primary: "#236192",
        secondary: "#FFCD00",
        accent: "#ca9ee6",
        neutral: "#303446",
        "base-100": "#ffffff",
        info: "#8caaee",
        success: "#a6d189",
        warning: "#ef9f76",
        error: "#e78284",
      },
    },
  ],
};
export const plugins = [require("@tailwindcss/typography"), require("daisyui")];
