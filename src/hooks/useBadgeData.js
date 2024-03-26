import { useContext } from "react";
import { HabitechContext } from "../contexts/HabitechContext";

export const useBadgeData = () => {
  const { state } = useContext(HabitechContext);
  let habits = state.user.analytics.habits.total;
  let plans = state.user.analytics.plans;
  let goals = state.user.analytics.goals.total;
  let themes = state.store.theme;
  let backgrounds = state.store.background;
  let totalMoneySpent = state.user.analytics.totalMoneySpent;
  let badgeData = [];

  // Badges on Creation
  if (plans >= 1) {
    badgeData.push({
      name: "Plan Creator",
      description:
        "What a good start! You earned this badge by creating at least one plan since the beginning",
    });
  }
  if (plans >= 5) {
    badgeData.push({
      name: "Novice Planner",
      description:
        "You are doing great! You earned this badge by creating at least 5 plan since the beginning",
    });
  }
  if (plans >= 15) {
    badgeData.push({
      name: "Enthusiast Planner",
      description:
        "Hmm...you are progressing! You earned this badge by creating at least 15 plan since the beginning",
    });
  }
  if (plans >= 50) {
    badgeData.push({
      name: "Prolific Planner",
      description:
        "Woaah you are determent & resilient! You earned this badge by creating at least 50 plan since the beginning",
    });
  }
  if (goals[0] >= 1) {
    badgeData.push({
      name: "Hero",
      description:
        "What a good start! You earned this badge by creating at least one goals since the beginning",
    });
  }
  if (goals[0] >= 5) {
    badgeData.push({
      name: "Endurance",
      description:
        "You are doing great! You earned this badge by creating at least 5 goals since the beginning",
    });
  }
  if (goals[0] >= 15) {
    badgeData.push({
      name: "Consistent Striver",
      description:
        "Hmm...you are progressing! You earned this badge by creating at least 15 goals since the beginning",
    });
  }
  if (goals[0] >= 50) {
    badgeData.push({
      name: "Triumph Titan",
      description:
        "Woaah you are determent & resilient! You earned this badge by creating at least 50 goals since the beginning",
    });
  }
  if (goals[0] >= 100) {
    badgeData.push({
      name: "Powerhouse Elite",
      description:
        "Wait...Are you even human! You earned this badge by creating at least 100 goals since the beginning",
    });
  }
  if (goals[0] >= 500) {
    badgeData.push({
      name: "Visionary Vanguard",
      description:
        "Now you are just showing off! You earned this badge by creating at least 500 goals since the beginning",
    });
  }

  if (habits[0] >= 1) {
    badgeData.push({
      name: "Initiator",
      description:
        "What a good start! You earned this badge by creating at least one habit since the beginning",
    });
  }
  if (habits[0] >= 5) {
    badgeData.push({
      name: "Guru",
      description:
        "You are doing great! You earned this badge by creating at least 5 habit since the beginning",
    });
  }

  if (habits[0] >= 15) {
    badgeData.push({
      name: "Sensie",
      description:
        "Woaah you are determent & resilient! You earned this badge by creating at least 15 habit since the beginning",
    });
  }

  // Badges on Completion
  if (goals[1] >= 1) {
    badgeData.push({
      name: "Goal Achiever",
      description:
        "What a good start! You earned this badge by completing at least one goals since the beginning",
    });
  }
  if (goals[1] >= 5) {
    badgeData.push({
      name: "Goal Apprentice",
      description:
        "You are doing great! You earned this badge by completing at least 5 goals since the beginning",
    });
  }
  if (goals[1] >= 15) {
    badgeData.push({
      name: "Goal Virtuoso",
      description:
        "Hmm...you are progressing! You earned this badge by completing at least 15 goals since the beginning",
    });
  }
  if (goals[1] >= 50) {
    badgeData.push({
      name: "Goal Expert",
      description:
        "Woaah you are determent & resilient! You earned this badge by completing at least 50 goals since the beginning",
    });
  }
  if (goals[1] >= 100) {
    badgeData.push({
      name: "Goal Conqueror",
      description:
        "Wait...Are you even human! You earned this badge by completing at least 100 goals since the beginning",
    });
  }
  if (goals[1] >= 500) {
    badgeData.push({
      name: "Goal Maestro",
      description:
        "Now you are just showing off! You earned this badge by completing at least 500 goals since the beginning",
    });
  }

  if (habits[1] >= 1) {
    badgeData.push({
      name: "Habit Starter",
      description:
        "What a good start! You earned this badge by completing at least one habits since the beginning",
    });
  }
  if (habits[1] >= 5) {
    badgeData.push({
      name: "Habit Builder",
      description:
        "You are doing great! You earned this badge by completing at least 5 habits since the beginning",
    });
  }
  if (habits[1] >= 15) {
    badgeData.push({
      name: "Habit Champion",
      description:
        "Hmm...you are progressing! You earned this badge by completing at least 15 habits since the beginning",
    });
  }
  if (habits[1] >= 50) {
    badgeData.push({
      name: "Habit Architect",
      description:
        "Woaah you are determent & resilient! You earned this badge by completing at least 50 habits since the beginning",
    });
  }
  if (habits[1] >= 100) {
    badgeData.push({
      name: "Habit Craftsman",
      description:
        "Wait...Are you even human! You earned this badge by completing at least 100 habits since the beginning",
    });
  }
  if (habits[1] >= 500) {
    badgeData.push({
      name: "Habit Mastermind",
      description:
        "Now you are just showing off! You earned this badge by completing at least 500 habits since the beginning",
    });
  }

  // Badges on Purchase
  if (themes.length >= 2) {
    badgeData.push({
      name: "Artists",
      description:
        "You have been rewarded with this badge as you have purchased at least one theme.",
    });
  }
  if (themes.length >= 4) {
    badgeData.push({
      name: "Stylist",
      description:
        "You have been rewarded with this badge as you have purchased at least 4 theme.",
    });
  }
  if (themes.length >= 8) {
    badgeData.push({
      name: "Fashion Connoisseur",
      description:
        "You have been rewarded with this badge as you have purchased at least 4 theme.",
    });
  }
  if (themes.length >= 12) {
    badgeData.push({
      name: "Theme Guru",
      description:
        "😏 Someone is getting richer! You have been rewarded with this badge as you have purchased at least 12 theme.",
    });
  }
  if (themes.length >= 16) {
    badgeData.push({
      name: "Ace Designer",
      description:
        "🥳 You did it! You have been rewarded with this badge as you have purchased all the themes.",
    });
  }

  if (backgrounds.length >= 2) {
    badgeData.push({
      name: "Explorer",
      description:
        "You have been rewarded with this badge as you have purchased at least one background.",
    });
  }
  if (backgrounds.length >= 5) {
    badgeData.push({
      name: "Trendsetter",
      description:
        "You have been rewarded with this badge as you have purchased at least 5 background.",
    });
  }
  if (backgrounds.length >= 10) {
    badgeData.push({
      name: "Flashy Collector",
      description:
        "You have been rewarded with this badge as you have purchased at least 10 background.",
    });
  }
  if (backgrounds.length >= 20) {
    badgeData.push({
      name: "Chromatic Champion",
      description:
        "⚡️ Boomshakala! You have been rewarded with this badge as you have purchased at least 20 background.",
    });
  }
  if (backgrounds.length >= 30) {
    badgeData.push({
      name: "Pattern Pioneer",
      description:
        "😏 Someone is getting richer! You have been rewarded with this badge as you have purchased at least 30 background.",
    });
  }
  if (backgrounds.length >= 38) {
    badgeData.push({
      name: "Showoff Spender",
      description:
        "🥳 You did it! You have been rewarded with this badge as you have purchased all the background.",
    });
  }

  if (
    backgrounds.includes("Graph") ||
    backgrounds.includes("Ciruit") ||
    backgrounds.includes("Foodie") ||
    backgrounds.includes("Topography") ||
    backgrounds.includes("Machine")
  ) {
    badgeData.push({
      name: "Rich Investor",
      description:
        "👀 Oh look another spender in the house! You have been rewarded with this badge as you have purchased an expensive background.",
    });
  }

  // Badges on Level/Experience
  if (state.user.exp > 100) {
    badgeData.push({
      name: "Noob",
      description:
        "Hey Noobie...I mean Newbie. You have been rewarded with this badge as you have gained level 1 of experience.",
    });
  }
  if (state.user.exp > 500) {
    badgeData.push({
      name: "Novice",
      description:
        "Hey Struggler. You have been rewarded with this badge as you have gained level 5 of experience.",
    });
  }
  if (state.user.exp > 1000) {
    badgeData.push({
      name: "Junior",
      description:
        "Hey Junior. You have been rewarded with this badge as you have gained level 10 of experience.",
    });
  }
  if (state.user.exp > 2000) {
    badgeData.push({
      name: "Proficient",
      description:
        "Woah..You are no longer a Junior! You have been rewarded with this badge as you have gained level 20 of experience.",
    });
  }
  if (state.user.exp > 5000) {
    badgeData.push({
      name: "Skilled",
      description:
        "Hmmm You are now too skilled. You have been rewarded with this badge as you have gained level 50 of experience.",
    });
  }
  if (state.user.exp > 10000) {
    badgeData.push({
      name: "Senior",
      description:
        "Hi Senior...I mean Sir. You have been rewarded with this badge as you have gained level 100 of experience.",
    });
  }
  if (state.user.exp > 20000) {
    badgeData.push({
      name: "Architect",
      description:
        "How does it feel to have sooo much experience? You have been rewarded with this badge as you have gained level 200 of experience.",
    });
  }
  if (state.user.exp > 50000) {
    badgeData.push({
      name: "Supreme Sage",
      description:
        "The Surpreme The Sage has arrived! You have been rewarded with this badge as you have gained level 500 of experience.",
    });
  }

  // Badges on Activity
  if (localStorage.getItem("userVibrate") != null) {
    badgeData.push({
      name: "Sensation Seeker",
      description:
        "You have been rewarded with this badge as you have tried the haptic feedback feature!",
    });
  }
  if (localStorage.getItem("userSound") != null) {
    badgeData.push({
      name: "Sound Savvy",
      description:
        "You have been rewarded with this badge as you have tried the sound feature!",
    });
  }
  if (state.user.userLock) {
    badgeData.push({
      name: "Privacy Protector",
      description:
        "You have been rewarded with this badge as you have tried the app lock feature!",
    });
  }

  return badgeData;
};
