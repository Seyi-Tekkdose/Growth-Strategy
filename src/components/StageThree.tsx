import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface SOP {
  title: string;
  suppliers: string;
  inputs: string;
  process: string;
  outputs: string;
  customers: string;
}

interface StageThreeData {
  sops: SOP[];
  tasks: Task[];
}

export const StageThree = () => {
  const [data, setData] = useState<StageThreeData>({
    sops: [],
    tasks: [],
  });
  const [newSopTitle, setNewSopTitle] = useState("");
  const [newSopSuppliers, setNewSopSuppliers] = useState("");
  const [newSopInputs, setNewSopInputs] = useState("");
  const [newSopProcess, setNewSopProcess] = useState("");
  const [newSopOutputs, setNewSopOutputs] = useState("");
  const [newSopCustomers, setNewSopCustomers] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("stage-three");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const saveData = (newData: StageThreeData) => {
    setData(newData);
    localStorage.setItem("stage-three", JSON.stringify(newData));
  };

  const addSOP = () => {
    if (newSopTitle.trim() && newSopProcess.trim()) {
      const newData = {
        ...data,
        sops: [...data.sops, { 
          title: newSopTitle, 
          suppliers: newSopSuppliers,
          inputs: newSopInputs,
          process: newSopProcess,
          outputs: newSopOutputs,
          customers: newSopCustomers
        }],
      };
      saveData(newData);
      setNewSopTitle("");
      setNewSopSuppliers("");
      setNewSopInputs("");
      setNewSopProcess("");
      setNewSopOutputs("");
      setNewSopCustomers("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newData = {
        ...data,
        tasks: [...data.tasks, { id: Date.now().toString(), title: newTaskTitle, completed: false }],
      };
      saveData(newData);
      setNewTaskTitle("");
    }
  };

  const toggleTask = (taskId: string) => {
    const newData = {
      ...data,
      tasks: data.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };
    saveData(newData);
  };

  const deleteTask = (taskId: string) => {
    const newData = {
      ...data,
      tasks: data.tasks.filter(task => task.id !== taskId),
    };
    saveData(newData);
  };

  const isComplete = data.sops.length > 0 && data.tasks.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Three – Operations</h2>
          <p className="text-muted-foreground mt-2">Create standard procedures and track operational tasks</p>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Complete</span>
          </div>
        )}
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">Standard Operating Procedures (SIPOC Model)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use the SIPOC framework: Suppliers, Inputs, Process, Outputs, Customers
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sopTitle">Procedure Title</Label>
            <Input
              id="sopTitle"
              placeholder="e.g., Customer Onboarding Process"
              value={newSopTitle}
              onChange={(e) => setNewSopTitle(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sopSuppliers">Suppliers</Label>
              <Textarea
                id="sopSuppliers"
                placeholder="Who provides the inputs?"
                value={newSopSuppliers}
                onChange={(e) => setNewSopSuppliers(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sopInputs">Inputs</Label>
              <Textarea
                id="sopInputs"
                placeholder="What materials, data, or resources are needed?"
                value={newSopInputs}
                onChange={(e) => setNewSopInputs(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sopProcess">Process</Label>
            <Textarea
              id="sopProcess"
              placeholder="1. Step one&#10;2. Step two&#10;3. Step three..."
              value={newSopProcess}
              onChange={(e) => setNewSopProcess(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sopOutputs">Outputs</Label>
              <Textarea
                id="sopOutputs"
                placeholder="What is produced or delivered?"
                value={newSopOutputs}
                onChange={(e) => setNewSopOutputs(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sopCustomers">Customers</Label>
              <Textarea
                id="sopCustomers"
                placeholder="Who receives the outputs?"
                value={newSopCustomers}
                onChange={(e) => setNewSopCustomers(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          <Button onClick={addSOP} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add SIPOC Procedure
          </Button>
        </div>

        {data.sops.length > 0 && (
          <div className="mt-6 space-y-4">
            {data.sops.map((sop, index) => (
              <Card key={index} className="p-5 bg-secondary">
                <h4 className="font-semibold text-lg mb-4">{sop.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">SUPPLIERS</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{sop.suppliers || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">INPUTS</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{sop.inputs || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">PROCESS</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{sop.process}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">OUTPUTS</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{sop.outputs || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary mb-2">CUSTOMERS</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{sop.customers || "—"}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-bold mb-4">Task Tracker</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data.tasks.length > 0 && (
            <div className="space-y-2">
              {data.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {isComplete && (
        <Card className="p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
          <h3 className="text-xl font-bold mb-4">Operations Manual Preview</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">SOPs Created:</span> {data.sops.length}</p>
            <p><span className="font-semibold">Tasks Tracked:</span> {data.tasks.length}</p>
            <p><span className="font-semibold">Tasks Completed:</span> {data.tasks.filter(t => t.completed).length}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
