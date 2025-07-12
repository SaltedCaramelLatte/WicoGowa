import { Tabs, Tab } from "@nextui-org/react";

interface MenuTabsProps {
  categories: { key: string; title: string }[];
  activeTab: string;
  setActiveTab: (key: string) => void;
}

const MenuTabs = ({ categories, activeTab, setActiveTab }: MenuTabsProps) => (
  <div className="overflow-x-auto w-full max-w-3xl">
    <Tabs
      className="justify-center"
      placement="top"
      aria-label="Dynamic tabs"
      style={{ marginTop: '20px' }}
      selectedKey={activeTab}
      classNames={{
        tabList: 'flex flex-row min-w-max overflow-x-auto hide-scrollbar dark:text-gray-200 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg p-1',
        base: 'mx-auto w-full',
      }}
      variant="bordered"
      onSelectionChange={(key) => setActiveTab(String(key))}
    >
      {categories.map(cat => (
        <Tab key={cat.key} title={cat.title} />
      ))}
    </Tabs>
  </div>
);

export default MenuTabs;
