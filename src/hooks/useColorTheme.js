import { useContext } from "react";
import { HabitechContext } from "../contexts/HabitechContext";

const colors = {
  lighttext: "",
  darktext: "",
  darktextcolor100: "",
  textcolor500: "",
  bgcolor50: "",
  bgcolor100: "",
  bgcolor400: "",
  bgcolor500: "",
  border400: "",
  customcolor: "",
  checkedcolor: "",
  checkboxcolor: "",
};
export const useColorTheme = () => {
  const { state } = useContext(HabitechContext);

  let colors = {
    lighttext: "",
    darktext: "",
    darktextcolor100: "",
    textcolor500: "",
    bgcolor50: "",
    bgcolor100: "",
    bgcolor400: "",
    bgcolor500: "",
    border400: "",
    customcolor: "",
    checkedcolor: "",
    checkboxcolor: "",
  };
  switch (state.theme) {
    case "stone":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-stone-100";
      colors.textcolor500 = "text-stone-500";
      colors.bgcolor50 = "bg-stone-50";
      colors.bgcolor100 = "bg-stone-100";
      colors.bgcolor400 = "bg-stone-400";
      colors.bgcolor500 = "bg-stone-500";
      colors.border400 = "border-stone-400";
      colors.customcolor = "#d4d4d4";
      colors.checkedcolor = "peer-checked:bg-stone-400";
      colors.checkboxcolor = "accent-stone-500";
      break;

    case "red":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-red-100";
      colors.textcolor500 = "text-red-500";
      colors.bgcolor50 = "bg-red-50";
      colors.bgcolor100 = "bg-red-100";
      colors.bgcolor400 = "bg-red-400";
      colors.bgcolor500 = "bg-red-500";
      colors.border400 = "border-red-400";
      colors.customcolor = "#ef4444";
      colors.checkedcolor = "peer-checked:bg-red-400";
      colors.checkboxcolor = "accent-red-500";
      break;

    case "orange":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-orange-100";
      colors.textcolor500 = "text-orange-500";
      colors.bgcolor50 = "bg-orange-50";
      colors.bgcolor100 = "bg-orange-100";
      colors.bgcolor400 = "bg-orange-400";
      colors.bgcolor500 = "bg-orange-500";
      colors.border400 = "border-orange-400";
      colors.customcolor = "#f97316";
      colors.checkedcolor = "peer-checked:bg-orange-400";
      colors.checkboxcolor = "accent-orange-500";
      break;

    case "lime":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-lime-100";
      colors.textcolor500 = "text-lime-500";
      colors.bgcolor50 = "bg-lime-50";
      colors.bgcolor100 = "bg-lime-100";
      colors.bgcolor400 = "bg-lime-400";
      colors.bgcolor500 = "bg-lime-500";
      colors.border400 = "border-lime-400";
      colors.customcolor = "#84cc16";
      colors.checkedcolor = "peer-checked:bg-lime-400";
      colors.checkboxcolor = "accent-lime-500";
      break;

    case "green":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-green-100";
      colors.textcolor500 = "text-green-500";
      colors.bgcolor50 = "bg-green-50";
      colors.bgcolor100 = "bg-green-100";
      colors.bgcolor400 = "bg-green-400";
      colors.bgcolor500 = "bg-green-500";
      colors.border400 = "border-green-400";
      colors.customcolor = "#22c55e";
      colors.checkedcolor = "peer-checked:bg-green-400";
      colors.checkboxcolor = "accent-green-500";
      break;

    case "teal":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-teal-100";
      colors.textcolor500 = "text-teal-500";
      colors.bgcolor50 = "bg-teal-50";
      colors.bgcolor100 = "bg-teal-100";
      colors.bgcolor400 = "bg-teal-400";
      colors.bgcolor500 = "bg-teal-500";
      colors.border400 = "border-teal-400";
      colors.customcolor = "#14b8a6";
      colors.checkedcolor = "peer-checked:bg-teal-400";
      colors.checkboxcolor = "accent-teal-500";
      break;

    case "emerald":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-emerald-100";
      colors.textcolor500 = "text-emerald-500";
      colors.bgcolor50 = "bg-emerald-50";
      colors.bgcolor100 = "bg-emerald-100";
      colors.bgcolor400 = "bg-emerald-400";
      colors.bgcolor500 = "bg-emerald-500";
      colors.border400 = "border-emerald-400";
      colors.customcolor = "#10b981";
      colors.checkedcolor = "peer-checked:bg-emerald-400";
      colors.checkboxcolor = "accent-emerald-500";
      break;

    case "amber":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-amber-100";
      colors.textcolor500 = "text-amber-500";
      colors.bgcolor50 = "bg-amber-50";
      colors.bgcolor100 = "bg-amber-100";
      colors.bgcolor400 = "bg-amber-400";
      colors.bgcolor500 = "bg-amber-500";
      colors.border400 = "border-amber-400";
      colors.customcolor = "#f59e0b";
      colors.checkedcolor = "peer-checked:bg-amber-400";
      colors.checkboxcolor = "accent-amber-500";
      break;

    case "yellow":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-yellow-100";
      colors.textcolor500 = "text-yellow-500";
      colors.bgcolor50 = "bg-yellow-50";
      colors.bgcolor100 = "bg-yellow-100";
      colors.bgcolor400 = "bg-yellow-400";
      colors.bgcolor500 = "bg-yellow-500";
      colors.border400 = "border-yellow-400";
      colors.customcolor = "#eab308";
      colors.checkedcolor = "peer-checked:bg-yellow-400";
      colors.checkboxcolor = "accent-yellow-500";
      break;

    case "cyan":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-cyan-100";
      colors.textcolor500 = "text-cyan-500";
      colors.bgcolor50 = "bg-cyan-50";
      colors.bgcolor100 = "bg-cyan-100";
      colors.bgcolor400 = "bg-cyan-400";
      colors.bgcolor500 = "bg-cyan-500";
      colors.border400 = "border-cyan-400";
      colors.customcolor = "#06b6d4";
      colors.checkedcolor = "peer-checked:bg-cyan-400";
      colors.checkboxcolor = "accent-cyan-500";
      break;

    case "blue":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-blue-100";
      colors.textcolor500 = "text-blue-500";
      colors.bgcolor50 = "bg-blue-50";
      colors.bgcolor100 = "bg-blue-100";
      colors.bgcolor400 = "bg-blue-400";
      colors.bgcolor500 = "bg-blue-500";
      colors.border400 = "border-blue-400";
      colors.customcolor = "#3b82f6";
      colors.checkedcolor = "peer-checked:bg-blue-400";
      colors.checkboxcolor = "accent-blue-500";
      break;

    case "sky":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-sky-100";
      colors.textcolor500 = "text-sky-500";
      colors.bgcolor50 = "bg-sky-50";
      colors.bgcolor100 = "bg-sky-100";
      colors.bgcolor400 = "bg-sky-400";
      colors.bgcolor500 = "bg-sky-500";
      colors.border400 = "border-sky-400";
      colors.customcolor = "#0ea5e9";
      colors.checkedcolor = "peer-checked:bg-sky-400";
      colors.checkboxcolor = "accent-sky-500";
      break;

    case "indigo":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-indigo-100";
      colors.textcolor500 = "text-indigo-500";
      colors.bgcolor50 = "bg-indigo-50";
      colors.bgcolor100 = "bg-indigo-100";
      colors.bgcolor400 = "bg-indigo-400";
      colors.bgcolor500 = "bg-indigo-500";
      colors.border400 = "border-indigo-400";
      colors.customcolor = "#6366f1";
      colors.checkedcolor = "peer-checked:bg-indigo-400";
      colors.checkboxcolor = "accent-indigo-500";
      break;

    case "violet":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-violet-100";
      colors.textcolor500 = "text-violet-500";
      colors.bgcolor50 = "bg-violet-50";
      colors.bgcolor100 = "bg-violet-100";
      colors.bgcolor400 = "bg-violet-400";
      colors.bgcolor500 = "bg-violet-500";
      colors.border400 = "border-violet-400";
      colors.customcolor = "#8b5cf6";
      colors.checkedcolor = "peer-checked:bg-violet-400";
      colors.checkboxcolor = "accent-violet-500";
      break;

    case "purple":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-purple-100";
      colors.textcolor500 = "text-purple-500";
      colors.bgcolor50 = "bg-purple-50";
      colors.bgcolor100 = "bg-purple-100";
      colors.bgcolor400 = "bg-purple-400";
      colors.bgcolor500 = "bg-purple-500";
      colors.border400 = "border-purple-400";
      colors.customcolor = "#a855f7";
      colors.checkedcolor = "peer-checked:bg-purple-400";
      colors.checkboxcolor = "accent-purple-500";
      break;

    case "rose":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-rose-100";
      colors.textcolor500 = "text-rose-500";
      colors.bgcolor50 = "bg-rose-50";
      colors.bgcolor100 = "bg-rose-100";
      colors.bgcolor400 = "bg-rose-400";
      colors.bgcolor500 = "bg-rose-500";
      colors.border400 = "border-rose-400";
      colors.customcolor = "#f43f5e";
      colors.checkedcolor = "peer-checked:bg-rose-400";
      colors.checkboxcolor = "accent-rose-500";
      break;

    case "pink":
      colors.lighttext = "text-black";
      colors.darktext = "dark:text-white";
      colors.darktextcolor100 = "dark:text-pink-100";
      colors.textcolor500 = "text-pink-500";
      colors.bgcolor50 = "bg-pink-50";
      colors.bgcolor100 = "bg-pink-100";
      colors.bgcolor400 = "bg-pink-400";
      colors.bgcolor500 = "bg-pink-500";
      colors.border400 = "border-pink-400";
      colors.customcolor = "#ec4899";
      colors.checkedcolor = "peer-checked:bg-pink-400";
      colors.checkboxcolor = "accent-pink-500";
      break;

    default:
      break;
  }

  return colors;
};
