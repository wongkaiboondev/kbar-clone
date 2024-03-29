import { ComputerDesktopIcon, UserIcon } from "@heroicons/react/24/solid";
import { KBarProvider, useKBar } from "kbar";
import "./App.css";
import CommandBar from "./CommandBar.tsx";
import { Button } from "./components/ui/button";

function App() {
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      section: "Navigation",
      perform: () => (window.location.pathname = "blog"),
      icon: <ComputerDesktopIcon className="w-6 h-6" />,
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      section: "Navigation",
      perform: () => (window.location.pathname = "contact"),
      icon: <UserIcon className="w-6 h-6" />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <CommandBar />
      <KBarButton />
    </KBarProvider>
  );
}

function KBarButton() {
  const { query } = useKBar();
  return (
    <Button variant="secondary" size="icon" onClick={query.toggle}>
      ⌘ K
    </Button>
  );
}

export default App;
