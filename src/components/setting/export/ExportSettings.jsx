const downloadJSON = (data, filename) => {
  const JSONData = btoa(JSON.stringify(data, null, 2));
  const blob = new Blob([JSONData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const ExportSettings = () => {
  const settingsData = {
    userVibrate: localStorage.getItem("userVibrate"),
    userSound: localStorage.getItem("userSound"),
    userCurrentSound: localStorage.getItem("userCurrentSound"),
    userCurrentVolume: localStorage.getItem("userCurrentVolume"),
    showLastActivity: localStorage.getItem("showLastActivity"),
    smartSuggestions: localStorage.getItem("smartSuggestions"),
    defaultTabs: localStorage.getItem("defaultTabs"),
    showDueDate: localStorage.getItem("showDueDate"),
    showType: localStorage.getItem("showType"),
    showPriority: localStorage.getItem("showPriority"),
    alwaysShowSubtask: localStorage.getItem("alwaysShowSubtask"),
    defaultGoalsGroupBy: localStorage.getItem("defaultGoalsGroupBy"),
    showDifficulty: localStorage.getItem("showDifficulty"),
    moveHabits: localStorage.getItem("moveHabits"),
    resetHabit: localStorage.getItem("resetHabit"),
    showDuration: localStorage.getItem("showDuration"),
  };

  return (
    <div onClick={() => downloadJSON(settingsData, "settings.habitech")}>
      Export Settings Data
    </div>
  );
};

export default ExportSettings;
