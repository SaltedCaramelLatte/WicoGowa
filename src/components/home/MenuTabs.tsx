import { Tabs, Tab } from "@nextui-org/react";
import { MdCoffee, MdFastfood, MdLocalDrink, MdMoreHoriz } from "react-icons/md";

interface MenuTabsProps {
  categories: { key: string; title: string; icon: React.ReactNode }[];
  activeTab: string;
  setActiveTab: (key: string) => void;
}

const MenuTabs = ({ categories, activeTab, setActiveTab }: MenuTabsProps) => (
  <div className="overflow-x-auto w-full min-w-0 px-0">
    <Tabs
      className="justify-start"
      placement="top"
      aria-label="Dynamic tabs"
      style={{ marginTop: '20px' }}
      selectedKey={activeTab}
      classNames={{
        tabList: 'flex flex-row min-w-max overflow-x-auto hide-scrollbar pl-0 dark:text-gray-200 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg p-1',
        base: 'w-full min-w-0',
      }}
      variant="bordered"
      onSelectionChange={(key) => setActiveTab(String(key))}
    >
      {categories.map(cat => (
        <Tab key={cat.key} title={
          <span className="flex items-center gap-2">
            {cat.icon}
            {cat.title}
          </span>
        } />
      ))}
    </Tabs>
  </div>
);

export default MenuTabs;
