import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AIGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fieldName: string;
  onGenerate: (generatedContent: string) => void;
}

export const AIGeneratorModal = ({ open, onOpenChange, fieldName, onGenerate }: AIGeneratorModalProps) => {
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!keywords.trim()) {
      toast.error("Please enter some keywords");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock generated content based on keywords
    const mockContent = `Generated content for "${fieldName}" based on keywords: ${keywords}. This is a placeholder that demonstrates how AI-generated content would appear here. In production, this would connect to an AI service to generate relevant, contextual content.`;
    
    onGenerate(mockContent);
    setIsGenerating(false);
    setKeywords("");
    onOpenChange(false);
    toast.success("Content generated successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Content Generator
          </DialogTitle>
          <DialogDescription>
            Enter keywords to generate content for: <span className="font-semibold text-foreground">{fieldName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords or Context</Label>
            <Input
              id="keywords"
              placeholder="e.g., innovative, sustainable, customer-focused..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isGenerating && handleGenerate()}
            />
            <p className="text-xs text-muted-foreground">
              Provide keywords, phrases, or context to guide the AI generation
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isGenerating}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating || !keywords.trim()}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
