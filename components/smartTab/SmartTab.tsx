import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface Tab {
  label: string;
  content: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

interface AccordionProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

// Componente de Aba
function Tab({ label, isActive, onClick }: Readonly<TabProps>) {
  return (
    <button
      className={`w-full p-2 border-t border-r border-l ${
        isActive ? "border-b bg-white" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Componente de Abas
function Tabs({ tabs, activeTab, setActiveTab }: Readonly<TabsProps>) {
  return (
    <div className="w-1/4 bg-gray-200 hidden lg:block">
      {tabs.map((tab, index) => (
        <Tab
          key={`${tab.label}-${index}`}
          label={tab.label}
          isActive={index === activeTab}
          onClick={() => setActiveTab(index)}
        />
      ))}
    </div>
  );
}

// Componente de Conteúdo
function Content({ content }: Readonly<{
  content: JSX.Element;
}>) {
  return <div className="w-3/4 p-4">{content}</div>;
}

// Componente Accordion para dispositivos móveis
function Accordion(
  { tabs, activeTab, setActiveTab }: Readonly<AccordionProps>,
) {
  return (
    <div className="w-full lg:hidden">
      {tabs.map((tab, index) => (
        <div
          key={`${tab.label}-${index}`}
          className={`border-t border-b p-2 ${
            index === activeTab ? "bg-white" : ""
          }`}
        >
          <button
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
          {index === activeTab && <div className="p-4">{tab.content}</div>}
        </div>
      ))}
    </div>
  );
}

export interface Props {
  title: string;
  tabs: Tab[];
}

const TabComponent = ({ tabs, title }: Props) => {
  const activeTab = useSignal(0);

  function setActiveTab(index: number) {
    activeTab.value = index;
  }

  return (
    <div className="lg:flex">
      <div>
        {title}
        <Tabs
          tabs={tabs}
          activeTab={activeTab.value}
          setActiveTab={setActiveTab}
        />
      </div>
      <Content content={tabs[activeTab.value].content} />
      <Accordion
        tabs={tabs}
        activeTab={activeTab.value}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default TabComponent;
