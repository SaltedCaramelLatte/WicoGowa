// components/home/menuList/MenuSection.tsx
import MenuTabs from "./MenuTabs";
import { useMenuData } from "../../hooks/useMenuData";
import { MenuItemType } from "./menuList/menuData";
import MenuItem from "./MenuItem";
import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MENU_CATEGORIES = [
    { key: "wico-original", title: "Wico Original" },
    { key: "coffee", title: "Coffee" },
    { key: "sachet", title: "Sachet" },
    { key: "snack", title: "Snack" },
    { key: "other", title: "Other" },
];

const MenuSection = () => {
    const { menuItems, loading } = useMenuData();
    const [activeTab, setActiveTab] = useState<string>(MENU_CATEGORIES[0].key);
    const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(menuItems.length).fill(false));
    const observer = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = (entry.target as HTMLElement).dataset.index;
                        if (index !== undefined) {
                            setVisibleItems((prev) => {
                                const newVisibleItems = [...prev];
                                newVisibleItems[parseInt(index)] = true;
                                return newVisibleItems;
                            });
                            observer.current?.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        const elements = document.querySelectorAll('.menu-item');
        elements.forEach((item) => observer.current?.observe(item));
        return () => observer.current?.disconnect();
    }, [activeTab, menuItems]);

    if (loading) return <div>Loading...</div>;

    const filteredItems = menuItems.filter(item => item.category === activeTab);

    return (
        <section className="flex flex-col items-center justify-center bg-light-background dark:bg-dark-background min-h-screen pt-24 px-0 w-full lg:px-20" id="menu">
            <h2 className="text-4xl font-bold text-light mb-8 dark:text-gray-200 font-bossa">MENU</h2>
            <MenuTabs categories={MENU_CATEGORIES} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 justify-center w-full mt-6">
                {filteredItems.slice(0, 4).map((item, index) => (
                    <MenuItem item={item} index={index} visible={visibleItems[index]} key={index} />
                ))}
            </div>
            <Button
                onClick={() => navigate(`/menu/${activeTab}`)}
                className="mt-4 px-4 py-2 text-white bg-[#b45f33] rounded-full shadow-md hover:bg-[#9e4e29] transition duration-200"
            >
                More
            </Button>
        </section>
    );
};

export default MenuSection;
