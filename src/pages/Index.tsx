import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StageZero } from "@/components/StageZero";
import { StageOne } from "@/components/StageOne";
import { StageTwo } from "@/components/StageTwo";
import { StageThree } from "@/components/StageThree";
import { StageScale } from "@/components/StageScale";
import { ExportButton } from "@/components/ExportButton";
import { Lightbulb, Palette, Megaphone, Cog, TrendingUp } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("zero");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Business Growth Planner
              </h1>
              <p className="text-muted-foreground mt-1">From concept to scale in 5 strategic stages</p>
            </div>
            <ExportButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2 bg-card shadow-card mb-8">
            <TabsTrigger value="zero" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lightbulb className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">Zero: Concept</span>
            </TabsTrigger>
            <TabsTrigger value="one" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">One: Brand</span>
            </TabsTrigger>
            <TabsTrigger value="two" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Megaphone className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">Two: Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="three" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cog className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">Three: Operations</span>
            </TabsTrigger>
            <TabsTrigger value="scale" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs md:text-sm font-medium">Scale: Growth</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="zero" className="mt-0">
            <StageZero />
          </TabsContent>

          <TabsContent value="one" className="mt-0">
            <StageOne />
          </TabsContent>

          <TabsContent value="two" className="mt-0">
            <StageTwo />
          </TabsContent>

          <TabsContent value="three" className="mt-0">
            <StageThree />
          </TabsContent>

          <TabsContent value="scale" className="mt-0">
            <StageScale />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>All data is stored locally in your browser. Export regularly to save your progress.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
