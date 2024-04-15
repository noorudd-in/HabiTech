import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import ExportHabits from "./export/ExportHabits";
import ExportGoals from "./export/ExportGoals";
import ExportPlans from "./export/ExportPlans";
import ExportSettings from "./export/ExportSettings";
import ImportHabit from "./import/ImportHabit";
import ImportPlan from "./import/ImportPlan";
import ImportGoal from "./import/ImportGoal";
import ImportSetting from "./import/ImportSetting";
import { useColorTheme } from "../../hooks/useColorTheme";

const ImportExport = () => {
  const { textcolor500 } = useColorTheme();
  const { state } = useContext(HabitechContext);

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
  }, []);
  return (
    <div>
      <h1 className={`text-center my-10 text-2xl font-bold ${textcolor500}`}>
        Your Data. Anywhere, Anytime 🌏
      </h1>
      <div className="m-2 mt p-2 bg-gray-700 rounded">
        <h1 className="mb-5 font-bold">EXPORT</h1>

        <h1 className={`mb-2 ${textcolor500}`}>
          <ExportHabits />
        </h1>
        <h1 className={`mb-2 ${textcolor500}`}>
          <ExportGoals />
        </h1>
        <h1 className={`mb-2 ${textcolor500}`}>
          <ExportPlans />
        </h1>
        <h1 className={`mb-2 ${textcolor500}`}>
          <ExportSettings />
        </h1>
        <p className="italic text-xs">
          Lock settings are not exported for security reasons.
        </p>
      </div>

      <div className="m-2 mt p-2 bg-gray-700 rounded">
        <h1 className="mb-5 font-bold">IMPORT</h1>

        <ImportHabit />
        <ImportPlan />
        <ImportGoal />
        <ImportSetting />
      </div>
    </div>
  );
};

export default ImportExport;
