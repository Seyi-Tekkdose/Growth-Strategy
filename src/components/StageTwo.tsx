import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Plus, X, Sparkles } from "lucide-react";
import { AIGeneratorModal } from "./AIGeneratorModal";

interface StageTwoData {
  keywords: string[];
  emailSubject: string;
  emailBody: string;
  campaignGoal: string;
  targetChannels: string;
  budget: string;
  mailchimpApiKey: string;
  mailchimpAudienceId: string;
  b2bPlatforms: { name: string; checked: boolean }[];
  b2cPlatforms: { name: string; checked: boolean }[];
}

export const StageTwo = () => {
  const [data, setData] = useState<StageTwoData>({
    keywords: [],
    emailSubject: "",
    emailBody: "",
    campaignGoal: "",
    targetChannels: "",
    budget: "",
    mailchimpApiKey: "",
    mailchimpAudienceId: "",
    b2bPlatforms: [
      { name: "LinkedIn", checked: false },
      { name: "Twitter/X", checked: false },
      { name: "YouTube", checked: false },
      { name: "Industry Forums", checked: false },
      { name: "Webinars", checked: false },
    ],
    b2cPlatforms: [
      { name: "Facebook", checked: false },
      { name: "Instagram", checked: false },
      { name: "TikTok", checked: false },
      { name: "Pinterest", checked: false },
      { name: "Snapchat", checked: false },
    ],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{ key: keyof Omit<StageTwoData, "keywords" | "b2bPlatforms" | "b2cPlatforms">; name: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("stage-two");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const saveData = (newData: StageTwoData) => {
    setData(newData);
    localStorage.setItem("stage-two", JSON.stringify(newData));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !data.keywords.includes(keywordInput.trim())) {
      const newData = { ...data, keywords: [...data.keywords, keywordInput.trim()] };
      saveData(newData);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    const newData = { ...data, keywords: data.keywords.filter(k => k !== keyword) };
    saveData(newData);
  };

  const updateField = (field: keyof Omit<StageTwoData, "keywords" | "b2bPlatforms" | "b2cPlatforms">, value: string) => {
    saveData({ ...data, [field]: value });
  };

  const togglePlatform = (type: "b2b" | "b2c", platformName: string) => {
    const platformsKey = type === "b2b" ? "b2bPlatforms" : "b2cPlatforms";
    const newPlatforms = data[platformsKey].map(p =>
      p.name === platformName ? { ...p, checked: !p.checked } : p
    );
    saveData({ ...data, [platformsKey]: newPlatforms });
  };

  const openAIGenerator = (field: keyof Omit<StageTwoData, "keywords" | "b2bPlatforms" | "b2cPlatforms">, fieldName: string) => {
    setCurrentField({ key: field, name: fieldName });
    setAiModalOpen(true);
  };

  const handleAIGenerate = (generatedContent: string) => {
    if (currentField) {
      updateField(currentField.key, generatedContent);
    }
  };

  const isComplete = data.keywords.length > 0 && data.emailSubject && data.emailBody && data.campaignGoal;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Two – Marketing & Sales</h2>
          <p className="text-muted-foreground mt-2">Build your first marketing campaign and SEO strategy</p>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">SEO Keywords</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a keyword or phrase"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addKeyword()}
            />
            <Button onClick={addKeyword} size="icon" variant="default">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="px-3 py-1">
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">Email Campaign Builder</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailSubject">Email Subject Line</Label>
            <Input
              id="emailSubject"
              placeholder="Catchy subject that drives opens"
              value={data.emailSubject}
              onChange={(e) => updateField("emailSubject", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailBody">Email Body</Label>
            <Textarea
              id="emailBody"
              placeholder="Your email content..."
              value={data.emailBody}
              onChange={(e) => updateField("emailBody", e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold mb-3">Mailchimp Integration</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Connect your Mailchimp account to sync campaigns (requires Lovable Cloud for secure API handling)
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
                <Input
                  id="mailchimpApiKey"
                  type="password"
                  placeholder="Enter your Mailchimp API key"
                  value={data.mailchimpApiKey}
                  onChange={(e) => updateField("mailchimpApiKey", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailchimpAudienceId">Audience ID</Label>
                <Input
                  id="mailchimpAudienceId"
                  placeholder="Enter your Mailchimp Audience ID"
                  value={data.mailchimpAudienceId}
                  onChange={(e) => updateField("mailchimpAudienceId", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Campaign Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaignGoal">Campaign Goal</Label>
              <Input
                id="campaignGoal"
                placeholder="e.g., Generate 100 leads"
                value={data.campaignGoal}
                onChange={(e) => updateField("campaignGoal", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetChannels">Target Channels</Label>
              <Input
                id="targetChannels"
                placeholder="e.g., Email, Social Media, Google Ads"
                value={data.targetChannels}
                onChange={(e) => updateField("targetChannels", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="e.g., $1,000"
                value={data.budget}
                onChange={(e) => updateField("budget", e.target.value)}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold mb-3">B2B Social Platforms</h4>
              <div className="space-y-2">
                {data.b2bPlatforms.map((platform) => (
                  <label key={platform.name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platform.checked}
                      onChange={() => togglePlatform("b2b", platform.name)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold mb-3">B2C Social Platforms</h4>
              <div className="space-y-2">
                {data.b2cPlatforms.map((platform) => (
                  <label key={platform.name} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platform.checked}
                      onChange={() => togglePlatform("b2c", platform.name)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {isComplete && (
          <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
            <h3 className="text-xl font-bold mb-4">Campaign Summary</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold opacity-90">Keywords ({data.keywords.length}):</p>
                <p className="opacity-95">{data.keywords.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold opacity-90">Email Subject:</p>
                <p className="opacity-95">{data.emailSubject}</p>
              </div>
              <div>
                <p className="font-semibold opacity-90">Goal:</p>
                <p className="opacity-95">{data.campaignGoal}</p>
              </div>
              {data.targetChannels && (
                <div>
                  <p className="font-semibold opacity-90">Channels:</p>
                  <p className="opacity-95">{data.targetChannels}</p>
                </div>
              )}
              {data.budget && (
                <div>
                  <p className="font-semibold opacity-90">Budget:</p>
                  <p className="opacity-95">{data.budget}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <AIGeneratorModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        fieldName={currentField?.name || ""}
        onGenerate={handleAIGenerate}
      />
    </div>
  );
};
