// components/home/menuList/MenuSection.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Button } from "@nextui-org/react";
import { useMenuData } from "../../hooks/useMenuData";
import { MenuItemType } from "./menuList/menuData";
import MenuTabs from "./MenuTabs";

const MenuSection = () => {
    const { menuItems, loading } = useMenuData(); 
    const [activeTab, setActiveTab] = useState<string>("wico-original");
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

        return () => {
            observer.current?.disconnect();
        };
    }, [activeTab, menuItems]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Kategori dinamis
    const categories = [
        { key: "Original", title: "Original" },
        { key: "coffee", title: "Coffee" },
        { key: "tea", title: "Tea" },
        { key: "sachet", title: "Sachet" },
        { key: "snack", title: "Snack" },
        { key: "other", title: "Other" },
        
    ];

    // Filter menu sesuai tab aktif
    const filteredItems = menuItems.filter(item => item.category === activeTab);

    const renderMenuItems = (list: MenuItemType[]) => {
        return list.slice(0, 4).map((item, index) => (
            <MenuItem
                item={item}
                index={index}
                visible={visibleItems[index]}
                key={index}
            />
        ));
    };

    const handleMoreClick = () => {
        navigate(`/menu/${activeTab}`);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-light-background dark:bg-dark-background min-h-screen pt-24 px-4 lg:px-20">
            <h2 className="text-4xl font-bold text-light mb-8 dark:text-gray-200 font-bossa">MENU</h2>
            {/* Tab menu scrollable */}
            <MenuTabs categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 justify-center w-full mt-6">
                {renderMenuItems(filteredItems)}
            </div>
            <Button
                onClick={handleMoreClick}
                className="mt-4 px-4 py-2 text-white bg-[#b45f33] rounded-full shadow-md hover:bg-[#9e4e29] transition duration-200"
            >
                More
            </Button>
        </div>
    );
}

export default MenuSection;
