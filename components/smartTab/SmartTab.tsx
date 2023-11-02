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

// Componente de Aba
function Tab({ label, isActive, onClick }: Readonly<TabProps>) {
  return (
    <button
      className={`w-full p-4 text-slate-600 bg-white border-b-4 lg:border-b-0 lg:border-l-4 duration-200 text-ellipsis whitespace-nowrap text-sm md:text-base ${
        isActive
          ? "border-slate-600 font-semibold"
          : "border-transparent hover:bg-slate-50 hover:border-slate-300"
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
    <div className="flex flex-row lg:flex-col w-full bg-gray-200 lg:block lg:divide-y divide-solid divide-slate-200 h-fit lg:overflow-hidden overflow-scroll border-b border-slate-200 lg:border-0">
      {tabs.map((tab, index) => (
        <div key={`${tab.label}-${index}`}>
          <Tab
            label={tab.label}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
          />
        </div>
      ))}
    </div>
  );
}

// Componente de Conteúdo
function Content({
  content,
  title,
}: Readonly<{
  content: JSX.Element;
  title: string;
}>) {
  return (
    <section className="w-full lg:w-3/4 px-8 pb-8 bg-white h-fit">
      <article className="text-xl py-8 text-slate-600 border-b border-slate-200 mb-6">
        {title}
      </article>
      <section>{content}</section>
    </section>
  );
}

export interface Props {
  tabs: Tab[];
  title: string;
}

const TabComponent = ({ tabs, title }: Props) => {
  const activeTab = useSignal(2);

  function setActiveTab(index: number) {
    activeTab.value = index;
  }

  return (
    <div className="lg:flex gap-10">
      <div className="flex flex-col w-full lg:w-1/4">
        <article className="px-10 py-8 bg-white text-lg lg:border-b border-slate-200 text-slate-600">
          Olá, {title}
        </article>
        <Tabs
          tabs={tabs}
          activeTab={activeTab.value}
          setActiveTab={setActiveTab}
        />
      </div>
      <Content
        content={tabs[activeTab.value].content}
        title={tabs[activeTab.value].label}
      />
    </div>
  );
};

export default TabComponent;
