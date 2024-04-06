import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const homepageObj = driver({
  allowClose: false,
  steps: [
    {
      element: "#none",
      popover: {
        title: "Welcome to HabiTech",
        description:
          "Let me guide you through the application so you can get the most out of it! Click next and follow the tour first!",
      },
    },
    {
      element: "#tour-info",
      popover: {
        title: "Info",
        description:
          "If you miss any details or you want detailed overview of the app, you can always click here and visit the info section.",
      },
    },
    {
      element: "#tour-header",
      popover: {
        title: "User Details",
        description:
          "Here you will find all your personal details and current progress. Let's see one by one.",
      },
    },
    {
      element: "#tour-health",
      popover: {
        title: "Health",
        description:
          "This is your health. Completing habits and goals will gain you health points! Make sure your health is not less than 1%.",
      },
    },
    {
      element: "#tour-exp",
      popover: {
        title: "Experience",
        description:
          "This is your exp points. You can gain different number of exp points based on habits and goals. Once you reach 100% your level will be increased.",
      },
    },
    {
      element: "#tour-level",
      popover: {
        title: "Level",
        description:
          "As you gain the experience, your level will be increased accordingly.",
      },
    },
    {
      element: "#tour-coins",
      popover: {
        title: "Coins",
        description:
          "You can recieve coins through multiple medium. More the coins, the more you can spend on customiations, themes, backgrounds, etc",
      },
    },
    {
      element: "#tour-last-activity",
      popover: {
        title: "Last Activity!",
        description:
          "You can see your activity which will provide the useful information such as when was the last time you performed any action on the app, Don't worry you can change these settings anytime.",
      },
    },
    {
      element: "#tour-animated-tabs",
      popover: {
        title: "Tabs!",
        description:
          "You can change the tabs to view your daily plans, habits and goals",
      },
    },
    {
      element: "#tour-statistics",
      popover: {
        title: "Statistics",
        description: "Find all your statistics with intuitive charts here!",
        side: "top",
      },
    },
    {
      element: "#tour-create",
      popover: {
        title: "Create",
        description: "You can create habit, goal, tags, plan from here!",
        side: "top",
      },
    },
    {
      element: "#tour-timer",
      popover: {
        title: "Pomodoro Timer",
        description:
          "You can use pomodoro timer to boost your productivity and acheive tasks and goals faster",
        side: "top",
      },
    },
    {
      element: "#tour-setting",
      popover: {
        title: "Settings",
        description:
          "As you explore the app, you will find a lot of settings and tweaks which you can make to personalise your app!",
        side: "top",
        onNextClick: () => {
          localStorage.setItem("home-tour", true);
          homepageObj.destroy();
        },
      },
    },
    {
      element: "#tour-habit-minus",
      popover: {
        title: "Update Habit",
        description:
          "You can click on minus button to indicate you have not completed the habit.",
        side: "top",
      },
    },
    {
      element: "#tour-habit-plus",
      popover: {
        title: "Update Habit",
        description:
          "You can click on plus button to indicate you have completed the habit.",
        side: "top",
      },
    },
    {
      element: "#tour-habit-content",
      popover: {
        title: "About Habit",
        description:
          "This is your habit. You can find your habit name and a progress bar below it. Once you have updated a habit, the progress bar will be turned to either red or green. You can click on the habit to view additional details or long press the habit to edit it.",
        onNextClick: () => {
          localStorage.setItem("habit-tour", true);
          homepageObj.destroy();
        },
      },
    },
  ],
});
