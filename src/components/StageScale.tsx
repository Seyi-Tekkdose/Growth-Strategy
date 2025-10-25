import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

interface StageScaleData {
  fundingReadiness: {
    businessPlan: string;
    financialProjections: string;
    marketSize: string;
    competitiveAdvantage: string;
  };
  exportPlan: {
    targetMarkets: string;
    distributionStrategy: string;
    pricingStrategy: string;
    regulations: string;
  };
  quizAnswers: {
    hasBusinessPlan: string;
    hasFinancials: string;
    hasTeam: string;
  };
}

export const StageScale = () => {
  const [data, setData] = useState<StageScaleData>({
    fundingReadiness: {
      businessPlan: "",
      financialProjections: "",
      marketSize: "",
      competitiveAdvantage: "",
    },
    exportPlan: {
      targetMarkets: "",
      distributionStrategy: "",
      pricingStrategy: "",
      regulations: "",
    },
    quizAnswers: {
      hasBusinessPlan: "",
      hasFinancials: "",
      hasTeam: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("stage-scale");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const updateFundingField = (field: keyof StageScaleData["fundingReadiness"], value: string) => {
    const newData = {
      ...data,
      fundingReadiness: { ...data.fundingReadiness, [field]: value },
    };
    setData(newData);
    localStorage.setItem("stage-scale", JSON.stringify(newData));
  };

  const updateExportField = (field: keyof StageScaleData["exportPlan"], value: string) => {
    const newData = {
      ...data,
      exportPlan: { ...data.exportPlan, [field]: value },
    };
    setData(newData);
    localStorage.setItem("stage-scale", JSON.stringify(newData));
  };

  const updateQuizAnswer = (field: keyof StageScaleData["quizAnswers"], value: string) => {
    const newData = {
      ...data,
      quizAnswers: { ...data.quizAnswers, [field]: value },
    };
    setData(newData);
    localStorage.setItem("stage-scale", JSON.stringify(newData));
  };

  const fundingComplete = Object.values(data.fundingReadiness).every(val => val.trim() !== "");
  const exportComplete = Object.values(data.exportPlan).every(val => val.trim() !== "");
  const quizComplete = Object.values(data.quizAnswers).every(val => val !== "");
  const isComplete = fundingComplete && exportComplete && quizComplete;

  const calculateReadinessScore = () => {
    const yesCount = Object.values(data.quizAnswers).filter(val => val === "yes").length;
    return Math.round((yesCount / 3) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Scale – Growth Strategy</h2>
          <p className="text-muted-foreground mt-2">Prepare for funding and scale your business globally</p>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">Funding Readiness Quiz</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Do you have a comprehensive business plan?</Label>
            <RadioGroup value={data.quizAnswers.hasBusinessPlan} onValueChange={(val) => updateQuizAnswer("hasBusinessPlan", val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="plan-yes" />
                <Label htmlFor="plan-yes" className="font-normal">Yes, fully documented</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="plan-partial" />
                <Label htmlFor="plan-partial" className="font-normal">Partially complete</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="plan-no" />
                <Label htmlFor="plan-no" className="font-normal">Not yet</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Do you have 3-5 year financial projections?</Label>
            <RadioGroup value={data.quizAnswers.hasFinancials} onValueChange={(val) => updateQuizAnswer("hasFinancials", val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="fin-yes" />
                <Label htmlFor="fin-yes" className="font-normal">Yes, detailed projections</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="fin-partial" />
                <Label htmlFor="fin-partial" className="font-normal">Basic projections</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="fin-no" />
                <Label htmlFor="fin-no" className="font-normal">Not yet</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Do you have a strong team in place?</Label>
            <RadioGroup value={data.quizAnswers.hasTeam} onValueChange={(val) => updateQuizAnswer("hasTeam", val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="team-yes" />
                <Label htmlFor="team-yes" className="font-normal">Yes, complete team</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="team-partial" />
                <Label htmlFor="team-partial" className="font-normal">Key positions filled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="team-no" />
                <Label htmlFor="team-no" className="font-normal">Still building</Label>
              </div>
            </RadioGroup>
          </div>

          {quizComplete && (
            <Card className="p-4 bg-secondary">
              <p className="text-sm font-semibold mb-2">Funding Readiness Score:</p>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">{calculateReadinessScore()}%</div>
                <p className="text-sm text-muted-foreground">
                  {calculateReadinessScore() >= 67 ? "You're ready to approach investors!" : "Keep building your foundation"}
                </p>
              </div>
            </Card>
          )}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Funding Strategy</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessPlan">Business Plan Summary</Label>
              <Textarea
                id="businessPlan"
                placeholder="Executive summary of your business plan..."
                value={data.fundingReadiness.businessPlan}
                onChange={(e) => updateFundingField("businessPlan", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialProjections">Financial Projections</Label>
              <Textarea
                id="financialProjections"
                placeholder="3-5 year revenue and growth projections..."
                value={data.fundingReadiness.financialProjections}
                onChange={(e) => updateFundingField("financialProjections", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketSize">Market Size</Label>
              <Input
                id="marketSize"
                placeholder="Total addressable market (TAM)"
                value={data.fundingReadiness.marketSize}
                onChange={(e) => updateFundingField("marketSize", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
              <Textarea
                id="competitiveAdvantage"
                placeholder="What makes you unique and defensible?"
                value={data.fundingReadiness.competitiveAdvantage}
                onChange={(e) => updateFundingField("competitiveAdvantage", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-bold mb-4">Export Plan Builder</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetMarkets">Target Markets</Label>
              <Input
                id="targetMarkets"
                placeholder="e.g., Canada, UK, Australia"
                value={data.exportPlan.targetMarkets}
                onChange={(e) => updateExportField("targetMarkets", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distributionStrategy">Distribution Strategy</Label>
              <Textarea
                id="distributionStrategy"
                placeholder="How will you enter these markets?"
                value={data.exportPlan.distributionStrategy}
                onChange={(e) => updateExportField("distributionStrategy", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricingStrategy">Pricing Strategy</Label>
              <Input
                id="pricingStrategy"
                placeholder="International pricing approach"
                value={data.exportPlan.pricingStrategy}
                onChange={(e) => updateExportField("pricingStrategy", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regulations">Regulatory Considerations</Label>
              <Textarea
                id="regulations"
                placeholder="Import/export regulations to address..."
                value={data.exportPlan.regulations}
                onChange={(e) => updateExportField("regulations", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        </Card>
      </div>

      {isComplete && (
        <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
          <h3 className="text-xl font-bold mb-4">Growth Strategy Complete</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Readiness Score:</span> {calculateReadinessScore()}%</p>
            <p><span className="font-semibold">Target Markets:</span> {data.exportPlan.targetMarkets}</p>
            <p><span className="font-semibold">Market Size:</span> {data.fundingReadiness.marketSize}</p>
            <p className="pt-2 opacity-90">✓ Ready to pitch to investors and scale internationally</p>
          </div>
        </Card>
      )}
    </div>
  );
};
