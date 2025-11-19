import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AIGeneratorModal } from "./AIGeneratorModal";

interface StageZeroData {
  businessName: string;
  mission: string;
  vision: string;
  coreValues: string;
  targetAudience: string;
  problemSolving: string;
  uniqueValue: string;
  legalStructure: string;
}

export const StageZero = () => {
  const [data, setData] = useState<StageZeroData>({
    businessName: "",
    mission: "",
    vision: "",
    coreValues: "",
    targetAudience: "",
    problemSolving: "",
    uniqueValue: "",
    legalStructure: "",
  });
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{ key: keyof StageZeroData; name: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("stage-zero");
    if (saved) {
      setData(JSON.parse(saved));
    }

    // Listen for storage events to refresh data when imported
    const handleStorageChange = () => {
      const updated = localStorage.getItem("stage-zero");
      if (updated) {
        setData(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateData = (field: keyof StageZeroData, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    localStorage.setItem("stage-zero", JSON.stringify(newData));
  };

  const openAIGenerator = (field: keyof StageZeroData, fieldName: string) => {
    setCurrentField({ key: field, name: fieldName });
    setAiModalOpen(true);
  };

  const handleAIGenerate = (generatedContent: string) => {
    if (currentField) {
      updateData(currentField.key, generatedContent);
    }
  };

  const isComplete = Object.values(data).every(val => val.trim() !== "");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Zero – Concept & Research</h2>
          <p className="text-muted-foreground mt-2">Build your business foundation with clear mission and vision</p>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      <Card className="p-6 shadow-card">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-base font-semibold">Business/Brand Name</Label>
            <p className="text-sm text-muted-foreground">What is your business or brand called?</p>
            <Input
              id="businessName"
              placeholder="e.g., Acme Solutions, TechFlow, etc."
              value={data.businessName}
              onChange={(e) => updateData("businessName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="mission" className="text-base font-semibold">Mission Statement</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAIGenerator("mission", "Mission Statement")}
                className="h-8"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI Generate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">What is your company's purpose? Why do you exist?</p>
            <Textarea
              id="mission"
              placeholder="We exist to..."
              value={data.mission}
              onChange={(e) => updateData("mission", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="vision" className="text-base font-semibold">Vision Statement</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAIGenerator("vision", "Vision Statement")}
                className="h-8"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI Generate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Where do you want to be in 5-10 years?</p>
            <Textarea
              id="vision"
              placeholder="In the future, we will..."
              value={data.vision}
              onChange={(e) => updateData("vision", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="coreValues" className="text-base font-semibold">Core Values</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => openAIGenerator("coreValues", "Core Values")}
                className="h-8"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI Generate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">What principles guide your business decisions?</p>
            <Textarea
              id="coreValues"
              placeholder="e.g., Integrity, Innovation, Customer-first..."
              value={data.coreValues}
              onChange={(e) => updateData("coreValues", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience" className="text-base font-semibold">Target Audience</Label>
            <p className="text-sm text-muted-foreground">Who are your ideal customers?</p>
            <Input
              id="targetAudience"
              placeholder="e.g., Small business owners, Tech startups, etc."
              value={data.targetAudience}
              onChange={(e) => updateData("targetAudience", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemSolving" className="text-base font-semibold">Problem You're Solving</Label>
            <p className="text-sm text-muted-foreground">What pain point does your business address?</p>
            <Textarea
              id="problemSolving"
              placeholder="Our customers struggle with..."
              value={data.problemSolving}
              onChange={(e) => updateData("problemSolving", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueValue" className="text-base font-semibold">Your Unique Approach</Label>
            <p className="text-sm text-muted-foreground">How is your solution different from competitors?</p>
            <Textarea
              id="uniqueValue"
              placeholder="Unlike others, we..."
              value={data.uniqueValue}
              onChange={(e) => updateData("uniqueValue", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalStructure" className="text-base font-semibold">Legal Structure</Label>
            <p className="text-sm text-muted-foreground">Choose your business entity type</p>
            <Select value={data.legalStructure} onValueChange={(value) => updateData("legalStructure", value)}>
              <SelectTrigger id="legalStructure">
                <SelectValue placeholder="Select legal structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="llc">LLC (Limited Liability Company)</SelectItem>
                <SelectItem value="corporation">Corporation (C-Corp)</SelectItem>
                <SelectItem value="s-corporation">S-Corporation</SelectItem>
                <SelectItem value="non-profit">Non-Profit</SelectItem>
                <SelectItem value="cooperative">Cooperative</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <h3 className="text-xl font-bold mb-4">Your Business Foundation</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold opacity-90">Business Name:</p>
              <p className="opacity-95">{data.businessName}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Mission:</p>
              <p className="opacity-95">{data.mission}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Vision:</p>
              <p className="opacity-95">{data.vision}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Core Values:</p>
              <p className="opacity-95">{data.coreValues}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Target Audience:</p>
              <p className="opacity-95">{data.targetAudience}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Legal Structure:</p>
              <p className="opacity-95">{data.legalStructure}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Problem Solving:</p>
              <p className="opacity-95">{data.problemSolving}</p>
            </div>
            <div>
              <p className="font-semibold opacity-90">Unique Approach:</p>
              <p className="opacity-95">{data.uniqueValue}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
