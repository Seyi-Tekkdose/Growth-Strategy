import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AIGeneratorModal } from "./AIGeneratorModal";

interface StageOneData {
  brandName: string;
  tagline: string;
  brandColors: string;
  targetEmotion: string;
  uvp: string;
  checklist: {
    logoDesigned: boolean;
    colorsDefined: boolean;
    fontSelected: boolean;
    voiceToneDefined: boolean;
    brandGuidelineCreated: boolean;
  };
}

export const StageOne = () => {
  const [data, setData] = useState<StageOneData>({
    brandName: "",
    tagline: "",
    brandColors: "",
    targetEmotion: "",
    uvp: "",
    checklist: {
      logoDesigned: false,
      colorsDefined: false,
      fontSelected: false,
      voiceToneDefined: false,
      brandGuidelineCreated: false,
    },
  });
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{ key: keyof Omit<StageOneData, "checklist">; name: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("stage-one");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const updateData = (field: keyof Omit<StageOneData, "checklist">, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    localStorage.setItem("stage-one", JSON.stringify(newData));
  };

  const updateChecklist = (field: keyof StageOneData["checklist"], checked: boolean) => {
    const newData = {
      ...data,
      checklist: { ...data.checklist, [field]: checked },
    };
    setData(newData);
    localStorage.setItem("stage-one", JSON.stringify(newData));
  };

  const openAIGenerator = (field: keyof Omit<StageOneData, "checklist">, fieldName: string) => {
    setCurrentField({ key: field, name: fieldName });
    setAiModalOpen(true);
  };

  const handleAIGenerate = (generatedContent: string) => {
    if (currentField) {
      updateData(currentField.key, generatedContent);
    }
  };

  const checklistComplete = Object.values(data.checklist).every(val => val === true);
  const formsComplete = data.brandName && data.tagline && data.uvp;
  const isComplete = checklistComplete && formsComplete;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">One – Brand & MVP</h2>
          <p className="text-muted-foreground mt-2">Define your brand identity and unique value proposition</p>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Brand Identity</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                placeholder="Your brand name"
                value={data.brandName}
                onChange={(e) => updateData("brandName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tagline">Tagline</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openAIGenerator("tagline", "Tagline")}
                  className="h-7"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI
                </Button>
              </div>
              <Input
                id="tagline"
                placeholder="A memorable one-liner"
                value={data.tagline}
                onChange={(e) => updateData("tagline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandColors">Brand Colors</Label>
              <Input
                id="brandColors"
                placeholder="e.g., Navy blue, gold, white"
                value={data.brandColors}
                onChange={(e) => updateData("brandColors", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetEmotion">Target Emotion</Label>
              <Input
                id="targetEmotion"
                placeholder="e.g., Trust, excitement, innovation"
                value={data.targetEmotion}
                onChange={(e) => updateData("targetEmotion", e.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Logo Design Checklist</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="logoDesigned"
                checked={data.checklist.logoDesigned}
                onCheckedChange={(checked) => updateChecklist("logoDesigned", checked as boolean)}
              />
              <Label htmlFor="logoDesigned" className="font-normal cursor-pointer">
                Logo designed and finalized
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="colorsDefined"
                checked={data.checklist.colorsDefined}
                onCheckedChange={(checked) => updateChecklist("colorsDefined", checked as boolean)}
              />
              <Label htmlFor="colorsDefined" className="font-normal cursor-pointer">
                Brand colors defined with hex codes
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="fontSelected"
                checked={data.checklist.fontSelected}
                onCheckedChange={(checked) => updateChecklist("fontSelected", checked as boolean)}
              />
              <Label htmlFor="fontSelected" className="font-normal cursor-pointer">
                Primary and secondary fonts selected
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="voiceToneDefined"
                checked={data.checklist.voiceToneDefined}
                onCheckedChange={(checked) => updateChecklist("voiceToneDefined", checked as boolean)}
              />
              <Label htmlFor="voiceToneDefined" className="font-normal cursor-pointer">
                Brand voice and tone defined
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="brandGuidelineCreated"
                checked={data.checklist.brandGuidelineCreated}
                onCheckedChange={(checked) => updateChecklist("brandGuidelineCreated", checked as boolean)}
              />
              <Label htmlFor="brandGuidelineCreated" className="font-normal cursor-pointer">
                Brand guidelines document created
              </Label>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Unique Value Proposition Generator</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openAIGenerator("uvp", "Unique Value Proposition")}
            className="h-8"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            AI Generate
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="uvp">Your UVP</Label>
          <p className="text-sm text-muted-foreground">
            Complete this: "We help [target audience] [achieve goal] by [unique approach]"
          </p>
          <Textarea
            id="uvp"
            placeholder="We help..."
            value={data.uvp}
            onChange={(e) => updateData("uvp", e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </Card>

      <AIGeneratorModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        fieldName={currentField?.name || ""}
        onGenerate={handleAIGenerate}
      />

      {isComplete && (
        <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
          <h3 className="text-xl font-bold mb-4">Brand Brief Complete</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Brand:</span> {data.brandName}</p>
            <p><span className="font-semibold">Tagline:</span> {data.tagline}</p>
            <p><span className="font-semibold">Colors:</span> {data.brandColors}</p>
            <p><span className="font-semibold">Emotion:</span> {data.targetEmotion}</p>
            <p><span className="font-semibold">UVP:</span> {data.uvp}</p>
            <p className="pt-2 opacity-90">✓ All logo design checklist items completed</p>
          </div>
        </Card>
      )}
    </div>
  );
};
