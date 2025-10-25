import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const ExportButton = () => {
  const exportAllData = () => {
    const stageZero = localStorage.getItem("stage-zero");
    const stageOne = localStorage.getItem("stage-one");
    const stageTwo = localStorage.getItem("stage-two");
    const stageThree = localStorage.getItem("stage-three");
    const stageScale = localStorage.getItem("stage-scale");

    if (!stageZero && !stageOne && !stageTwo && !stageThree && !stageScale) {
      toast.error("No data to export. Complete at least one stage first.");
      return;
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      stages: {
        zero: stageZero ? JSON.parse(stageZero) : null,
        one: stageOne ? JSON.parse(stageOne) : null,
        two: stageTwo ? JSON.parse(stageTwo) : null,
        three: stageThree ? JSON.parse(stageThree) : null,
        scale: stageScale ? JSON.parse(stageScale) : null,
      },
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `business-plan-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Business plan exported successfully!");
  };

  return (
    <Button onClick={exportAllData} variant="default" size="lg" className="gap-2">
      <Download className="h-4 w-4" />
      Export All Data
    </Button>
  );
};
