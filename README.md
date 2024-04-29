# HabiTech

A goal and habit tracker with an integrated planner. Unlock your productivity with the power of technology!

# Demo

The demo of this app is live and is hosted on [habitech.noorudd.in](https://habitech.noorudd.in).

## 🛠️ Technologies

- `ReactJS`
- `Tailwind CSS`
- `Vite`

## 📦 Libraries & Why I am using it?

- `Framer Motion: For seamless animations`
- `Axios: To handle API calls`
- `DayJS: For Date & Time manipulation`
- `Recharts: For plotting graphs and charts`
- `React Hot Toast: To provide awesome UI notifications (like alerts)`
- `Driver.js: For onboarding user experience`
- `Papaparse: To parse CSV files and convert them to strings, arrays, objects, etc`
- `React-CSV: To generate errorless CSV file from strings and JSON`
- `React-Datepicker: Just like datepicker but with addional functionality`
- `React Router DOM: For page routing`
- `Circular Progressbar: For displaying progressbar as a timer`

## 🚦 Running the project

To run the project in your local environment, follow the below steps:

1. Clone the repository to your local machine.
2. Replace **API_URL** inside `src > constants > index.js` with your API URL. Alternatively, create a dummy JSON file and watch it in a local host and enter that localhost URL here.
3. Run `npm install` or `yarn` in the project directory to install the required dependencies.
4. Run `npm run dev` or `yarn start` to get the project started.
5. Open http://localhost:5173 (or the address shown in your console) in your web browser to view the app.
6. Enable responsive view and check it in a mobile screen to get better UI experience.

## 🧠 What New I Learnt?

- Spending a good amount of time on designing the app before writing a code is must.
- How to reduce a good amount of API calls and increase performance.
- Learnt about dayjs library and how can we add, subtract, format, manipulate dates and how to show humanised format of dates and time.
- Learnt how we cannot use `bg-${status ? "green" : "red"}-500` in tailwind css since tailwind cannot parse broken css classes. Instead we need to do like `${status ? "bg-green-500" : "bg-red-500"}`
- Learnt animation techniques like onTap, Scale, AnimatePresence, motion, onDrag from Framer Motion.
- How to manage global store with Context API using useReducer (An alternative solution of Redux).
- Why and how to use debounce/throttling.
- How to work with CVS files, Blob datas, and audio files.

## 🚀 Planned Features

Below are features that I am planning to add in the app.

- [x] Ability to create/edit/delete/view habits.
- [x] Ability to create/edit/delete/view goals.
- [x] Ability to create/edit/delete/view plans.
- [x] Ability to create/edit/delete/view tags.
- [x] Gamify app (health, coins, etc).
- [x] Sort goals by Timeline/Tags/Types/Priority.
- [x] Show active VS inactive goals.
- [x] Show last activity.
- [x] Sort goals based on duedate by default.
- [x] Allow users to show/hide subtask.
- [x] Track and show all the activities performed by user (Activity Feed).
- [x] Add Animations/Transisition/Smooth Scroll.
- [x] Add progress bar when habit is updated.
- [x] Show toast notification on changes.
- [x] Implement single click to show modal.
- [x] Implement double click to edit.
- [x] Add trend charts to each habit.
- [x] Record and show analytics for whole habits (last 7, 30, 90 days to one year).
- [x] Enable/Disable Haptic Feedback
- [x] Enable/Disable Sounds & Vibrations
- [x] Add store to purchase themes, health, avatars, badges, etc.
- [x] Implement lock and unlock app feature.
- [x] Implement Eisenhower Matrix.
- [x] Implement Pomodoro Timer.
- [x] Show/Hide duedate, priority, type by default on goals.
- [x] Implement smart suggestions whenever user creates a habit, goal, plan or tag.
- [x] Copy existing goal/habit/plan and create new one.
- [x] Automatically transfer goals from monthly to weekly, quarterly to monthly and so on based on duedate.
- [x] Allow users to select the by default view from settings (such as group by goals, show subtasks or not, show planner first or goals first and more!).
- [x] Allow users to set different theme colors.
- [x] Allow users to set different background/fonts.
- [x] Allow users to reset app / delete data.
- [x] Allow users to export all plans, habits, goals data to local.
- [x] Allow users to import all plans, habits, goals data from remote file.
- [x] Allow users to export and import settings of an app OR Enable transfer of settings.
- [x] Allow users to reset app / delete data.
- [x] Allow users to import and export data.
- [x] Page for `How to use app`

## 🐞 Issues

Issues/Bugs which I are known and I am not interested to fix due to lack of time or resources.

- It works pretty well on mobile screens but experience in desktop view can be improved.
- Theme (Light/Dark) is taken from system's preferences. I am not able to provide user to switch themes as the app's code has grown too big.

## 💡 Improvements

- **Calender View**: Display goals, task from the calender point of view.
- **Detailed Analysis**: Provide detailed analysis with more number of charts and graph options.
- **Format Conversion**: Allow users to convert their habit into goal, goal into habit, habit into plan and more.
- **Pin**: Allow users to pin top three habits or goals or plan if there are too many.

## ⚡️ Build In Public Progress

- [HabiTech V1.0](https://www.linkedin.com/posts/nooruddin-shaikh_developer-habits-habitech-activity-7164270082024431616-L-IQ?utm_source=share&utm_medium=member_desktop)
- [HabiTech V2.0](https://www.linkedin.com/posts/nooruddin-shaikh_tailwindcss-react-api-activity-7166338128054534147-_NnH?utm_source=share&utm_medium=member_desktop)
- [HabiTech V3.0](https://www.linkedin.com/posts/nooruddin-shaikh_framermotion-priority-deadline-activity-7168499155403751424-k7FX?utm_source=share&utm_medium=member_desktop)
