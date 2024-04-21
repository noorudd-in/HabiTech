import H1 from "../components/info/H1";
import P from "../components/info/P";
import IMG from "../components/info/IMG";
import DownArrow from "../components/icons/DownArrow";
import { ABOUT } from "../constants";

const InfoPage = () => {
  return (
    <div className="m-5 mb-24 sm:text-2xl text-lg">
      <H1>What the hell is even HabiTech??</H1>
      <P>
        HabiTech is an all-in-one productivity tool that increases your
        productivity by providing you with all the features such as habit and
        goal tracker, planner, pomodoro timer, gamification, freedom, and much
        more.
      </P>
      <DownArrow />

      <H1>But why should I even use this app 🤔?</H1>
      <P>
        The main aim of HabiTech is to unlock your productivity and help you
        achieve your goals with the power of gamification. We have added
        elements such as coins, levels, experiences, and health. Below is the
        image you can refer to:
      </P>
      <IMG src={ABOUT.user} alt="User Details" />
      <DownArrow />

      <H1>
        Coins? What will I even buy from it? Wait, are you charging real money?
      </H1>
      <P>
        No, you don't need to pay anything. You can earn coins, health, and
        experience points if you complete a habit or goal. The more you spend
        time, the more you will earn that! Then, you can buy your favorite theme
        or background or even avatars.
      </P>
      <DownArrow />

      <H1>
        Hmm, And what about health? Will I die if my health goes to 0% 😵?
      </H1>
      <P>
        Kind off! If you skip any habit, your health will decrease. If your
        health reaches 0%, you will not be able to complete any habits. And you
        will not be able to use the app. Then, you will need to buy health from
        the coins you have earned. Also remember, if your experience reaches
        100%, your level will be increased by 1 and exp will be then reset to 0%
        whereas if your health reaches 100% then it will not increase anymore as
        you have the max health.
      </P>
      <DownArrow />

      <H1>
        This seems cool. But planners, habits, and goals? They are all the same
        to me 😵‍💫
      </H1>
      <P>
        Well, all three serve different purposes. The planner is a read-only
        overview of the day that tells you all the tasks you need to do and at
        what time. Treat it as a timetable that you used to make in your book
        while you were a kid! Habits, as the name suggests, which you can
        complete or skip that will help you build any good habits or destroy the
        bad ones. On the other hand, goals are the tasks or targets which you
        can set and achieve. Goals are very powerful as it has more features.
        How about we explore each one of them?
      </P>
      <DownArrow />

      <H1>
        Okay, but you talk too much. Don't you have image or visual data 😮‍💨?
      </H1>
      <P>
        Sure, let's start with a planner, you can refer to the below image to
        understand more. By the way, remember that each plan has a start time
        and end time and the duration of each plan (task) is also mentioned.
      </P>
      <IMG src={ABOUT.plans} alt="An image of plan and how to use it." />
      <P>
        Each plan is read-only, and you don't need to specifically mark it as
        completed. If the current time is ahead of any plan's end time, it
        indicates that you have completed that plan and it will be marked. If
        your current time is between the plan's start and end time, it indicates
        you are currently doing that task (plan). If your current time is before
        the plan's start time, it means that the plan (task) is planned for
        future time and is yet to be done.
      </P>
      <DownArrow />

      <H1>
        Wooow, I mean it's not that extraordinary. This is still basic stuff.
        Keep talking...
      </H1>
      <P>
        Let's discuss habits. Each habit will have a name and difficulty tag on
        it. Habit can be either Easy or Decent or Hard. You can click on the
        plus sign to mark that you have completed the habit for the day else if
        you skipped or were not able to perform that habit, click the minus
        sign.
      </P>
      <IMG src={ABOUT.habits} alt="Image showing how to use habits feature." />
      <DownArrow />

      <H1>
        Ah.. 😲 but what is this green, red bar at the bottom of habit. Are you
        making a rainbow?
      </H1>
      <P>
        Those are cooldown periods. So once you have completed a habit, it
        should be disabled for that day, right? That's why you will see a green,
        red, or no color bar at the bottom. That progress bar represents how
        much time you need to wait to perform action on that habit again. By
        default, the cooldown period is set to 15 hours but you can change this
        in the setting. By the way, green represents that you have completed
        that habit, red means you have skipped that habit for the day and no
        color means you still need to update that habit for the day.
      </P>
      <DownArrow />

      <H1>
        That seems good, but you said there are LOTS of features, where are
        they?
      </H1>
      <P>
        So, if you click (single tap) on plan or habit, you will see a modal
        that will reveal more information. You can see the example modal of a
        habit below. If you click (single tap) on the goal, you won't see the
        modal but the content is expanded and information is shown. Not only
        this, you will see the 'Copy this habit/goal/plan' text which will help
        you to duplicate that goal, habit or plan without hassle!
      </P>
      <IMG
        src={ABOUT.habitmodal}
        alt="An image showing how habit modal looks like."
      />
      <DownArrow />

      <H1>Okay hero, but this is not LOTS of features 😒.</H1>
      <P>
        Did we talk about goals? Goals are fully featured pack. It has all the
        basic features such as goal name and description and the ability to mark
        it as done. With this, you can also add a due date (which is in
        humanized format), priority (low, medium, or high), and type
        (short-term, mid-term, or long-term). You can also add tags so you can
        filter the goals very easily!
      </P>
      <DownArrow />

      <H1>
        Huh...So smarty, what if my goals are dependent on other tasks? I bet we
        can't create goals under goals 😏!
      </H1>
      <P>
        Ahh.. That's why we also have a sub-task feature. If your goal is too
        big, you can break it down into smaller sub-tasks and add it to that
        goal. Refer to the below image to understand more goals.
      </P>
      <IMG src={ABOUT.goals} alt="An Image showing how goals work." />
      <DownArrow />

      <H1>
        Hmm...let me start. But wait, how many coins will I get if I complete a
        habit?
      </H1>
      <P>
        You can refer to the below table to understand how coins, exp, and
        health are allocated for each habit:
      </P>
      <IMG
        src={ABOUT.htable}
        alt="A table showing how coin, exp and health are allocated for habits."
      />
      <DownArrow />

      <H1>
        Are you dumb or have you intentionally not shared the table for goals
        and plans?
      </H1>
      <P>You only asked for habit but here you go for the goals:</P>
      <IMG
        src={ABOUT.gtable}
        alt="A table showing how coin, exp and health are allocated for goals."
      />
      <DownArrow />

      <H1>
        Yes, you are DUMB. You didn't share for plans. Can't you just share all
        the table at once?
      </H1>
      <P>
        Actually, you can only earn coins, health, and exp from habits and
        goals. Not from the plan or any other thing. Planner was just the
        read-only timetable remembered?
      </P>
      <DownArrow />

      <H1>
        LOL, I am smarter than you! But this is just all text everywhere. I like
        graphs and charts 😎!
      </H1>
      <P>
        Oh yes me too, we share so many common thoughts (I wish we hadn't). You
        can use the below navigation menu and navigate to the 2nd option (from
        left), a pie chart symbol. Just click it and you will see five different
        types of charts to understand yourself better. All charts have a
        description under the title which will explain the purpose of that
        chart.
      </P>
      <IMG src={ABOUT.footer} alt="Bottom navigation menu image." />
      <DownArrow />

      <H1>
        Ok okay but why do you have a timer? Want to impress the interviewer
        huh?
      </H1>
      <P>
        It's known as a Pomodoro timer. It's a technique where you do any task
        with a focus for 25 minutes then you take 5 minute break. Then you start
        focusing again for the next 25 minutes and then take a 5-minute break
        again. This cycle goes on until you finish the task. This is a known
        technique to increase your productivity although there can be
        variations. You can{" "}
        <a
          className="underline underline-offset-4 text-cyan-400"
          href="https://todoist.com/productivity-methods/pomodoro-technique"
          target="_blank"
        >
          learn more about this here
        </a>
        .
      </P>
      <DownArrow />

      <H1>Hmm...nice. You are not that noob. So, Is this all you have 🤨?</H1>
      <P>
        Well, the plus icon you see in the middle of the menu is used to create
        the plan, habit, goal, or tag, which is self-explanatory. Also, you can
        click on the settings icon and explore the different settings! There are
        some amazing things which you can discover.
      </P>
      <DownArrow />

      <H1>
        Oh, so I can change the colours also ? By the way, what a shitty color
        you have chosen for the app.
      </H1>
      <P>
        Yes, you can go to appearance under settings and apply any colour you
        want. Not only that, but you can also change the background and avatars.
      </P>
      <DownArrow />

      <H1>Hey man, these are charging my coins 🙄 I like free stuff.</H1>
      <P>
        Who doesn't like free stuff? Other settings are absolutely free to use.
        Why don't you enable the sound and vibrations feature? You can lock the
        app with a password too. And don't forget to also check settings like
        Activity Feed, Import and Export, and Advanced Settings.
      </P>
      <DownArrow />

      <H1>Hmm.. now this is smart, kid. Did you forget about badges?</H1>
      <P>
        Oh yeah, those are just rewards that you earn while using the app. You
        can also click on any badge you earned to learn more about how you
        earned it.
      </P>
      <DownArrow />

      <H1>So from where can I copy...I mean see the source code?</H1>
      <P>
        You can see the{" "}
        <a
          className="underline underline-offset-4 text-cyan-400"
          href="https://github.com/noorudd-in/HabiTech"
          target="_blank"
        >
          source code here
        </a>
        . Or you can also visit setting and click on Source Code.
      </P>
      <DownArrow />

      <H1>
        I just showed this to my wife, and she wants to share feedback with you.
        I am sure she didn't like it 😏
      </H1>
      <P>
        I am curious about any feedback, suggestions, or appreciation. Just drop
        an email at{" "}
        <a
          className="underline underline-offset-4 text-cyan-400"
          href="mailto:hi@noorudd.in"
        >
          hi@noorudd.in
        </a>{" "}
        and let me know. Will be happy to understand the user's perspective.
      </P>
      <h2 className="my-5">
        <span className="italic font-mono">
          You have reached the end of the story! I am glad you reached here.
          Hope you liked this rude character. I am sure you have also
          encountered such rude characters in your life
        </span>
        <span> 😉</span>
      </h2>
    </div>
  );
};

export default InfoPage;
