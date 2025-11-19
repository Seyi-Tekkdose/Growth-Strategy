import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Link2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const ImportFromUrl = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sections, setSections] = useState({
    concept: true,
    brand: true,
    marketing: true,
    operations: false,
    growth: false,
  });

  const handleImport = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      toast.error("Please enter a valid URL (including https://)");
      return;
    }

    setIsProcessing(true);

    try {
      // Call backend API to scrape the website
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          sections: sections,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to scrape website');
      }

      // Store the scraped data in localStorage for each stage
      if (result.data) {
        // Store Stage Zero data
        if (sections.concept) {
          const stageZeroData = localStorage.getItem('stage-zero');
          const existingData = stageZeroData ? JSON.parse(stageZeroData) : {};
          
          const updatedStageZero = {
            ...existingData,
            ...(result.data.brandName && { businessName: result.data.brandName }),
            ...(result.data.mission && { mission: result.data.mission }),
            ...(result.data.vision && { vision: result.data.vision }),
            ...(result.data.coreValues && { coreValues: result.data.coreValues }),
            ...(result.data.targetAudience && { targetAudience: result.data.targetAudience }),
            ...(result.data.problemSolving && { problemSolving: result.data.problemSolving }),
            ...(result.data.uniqueValue && { uniqueValue: result.data.uniqueValue }),
          };
          
          localStorage.setItem('stage-zero', JSON.stringify(updatedStageZero));
        }

        // Store Stage One data
        if (sections.brand) {
          const stageOneData = localStorage.getItem('stage-one');
          const existingData = stageOneData ? JSON.parse(stageOneData) : {};
          
          const updatedStageOne = {
            ...existingData,
            ...(result.data.brandName && { brandName: result.data.brandName }),
            ...(result.data.tagline && { tagline: result.data.tagline }),
            ...(result.data.brandColors && { brandColors: result.data.brandColors }),
            ...(result.data.targetEmotion && { targetEmotion: result.data.targetEmotion }),
            ...(result.data.uvp && { uvp: result.data.uvp }),
          };
          
          localStorage.setItem('stage-one', JSON.stringify(updatedStageOne));
        }

        // Trigger a storage event to update components
        window.dispatchEvent(new Event('storage'));
      }

      setIsProcessing(false);
      setOpen(false);
      toast.success("Data imported successfully! Check the populated sections.", {
        description: "Website data has been analyzed and filled relevant fields.",
      });
      setUrl("");
      
    } catch (error) {
      console.error('Import error:', error);
      setIsProcessing(false);
      toast.error("Failed to import data", {
        description: error instanceof Error ? error.message : "Please make sure the backend server is running (npm run server:dev)",
      });
    }
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <Link2 className="h-4 w-4" />
          Import from URL
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Import Business Data
          </DialogTitle>
          <DialogDescription>
            Enter your website or portfolio URL. The scraper will analyze and auto-populate relevant sections including business name, mission, vision, and brand identity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="import-url">Website or Portfolio URL</Label>
            <Input
              id="import-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isProcessing}
            />
            <p className="text-xs text-muted-foreground">
              Enter a URL to your business website, LinkedIn, or portfolio
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Sections to Populate</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="concept"
                  checked={sections.concept}
                  onCheckedChange={() => toggleSection("concept")}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="concept"
                  className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="font-medium">Stage Zero: Concept & Research</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Business name, mission, vision, values, target audience
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="brand"
                  checked={sections.brand}
                  onCheckedChange={() => toggleSection("brand")}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="brand"
                  className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="font-medium">Stage One: Brand Identity</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Brand name, tagline, colors, UVP
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="marketing"
                  checked={sections.marketing}
                  onCheckedChange={() => toggleSection("marketing")}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="marketing"
                  className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <div className="font-medium">Stage Two: Marketing Campaigns</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Coming soon
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="operations"
                  checked={sections.operations}
                  onCheckedChange={() => toggleSection("operations")}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="operations"
                  className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stage Three: Operations & SOPs
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="growth"
                  checked={sections.growth}
                  onCheckedChange={() => toggleSection("growth")}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="growth"
                  className="text-sm cursor-pointer flex-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stage Scale: Growth & Funding
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleImport}
              disabled={isProcessing || !url.trim()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Import Data
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
