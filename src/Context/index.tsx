import { Order } from "@/models/order";
import { Product } from "@/models/products";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ShoppingCartProviderProps {
    children: ReactNode;
}

interface ShoppingCartContextProps {
    // Aquí puedes definir los tipos de los valores que deseas compartir en el contexto.
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    isProductDetailOpen: boolean;
    openProductDetail: () => void;
    closeProductDetail: () => void;
    productToShow: Product
    setProductToShow: React.Dispatch<React.SetStateAction<Product>>;
    cartProducts: Product[],
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    isCheckoutSideMenuOpen: boolean;
    openCheckoutSideMenu: () => void;
    closeCheckoutSideMenu: () => void;
    order: Order[];
    setOrder: React.Dispatch<React.SetStateAction<Order[]>>;
    items: Product[];
    setItems: React.Dispatch<React.SetStateAction<Product[]>>;
    searchByTitle: string; 
    setSearchByTitle: React.Dispatch<React.SetStateAction<string>>
    filteredItems: Product[]
    searchByCategory: string; setSearchByCategory: React.Dispatch<React.SetStateAction<string>>
}


export const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);



const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {

    const [count, setCount] = useState(0);
    const [productToShow, setProductToShow] = useState({
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: ""
    });
    // Shopping Cart * Add Porducts to cart
    const [cartProducts, setCartProducts] = useState<Product[]>([])

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Shoping Cart * Order
    const [order, setOrder] = useState<Order[]>([])

    // Get Products
    const [items, setItems] = useState<Product[]>([])
    const [filteredItems, setFilteredItems] = useState<Product[]>([])

    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState<string>("")

    // Get Products by searchByCategory
    const [searchByCategory, setSearchByCategory] = useState<string>("")

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setItems(data))
        // setItems(dataTest)
    }, []);



    const filteredItemsByTitle = (items: Product[], searchByTitle: string) => {
        
        return items?.filter(item => (item.title.toLowerCase().includes(searchByTitle.toLowerCase())))
    }

    const filteredItemsByCategory = (items: Product[], searchByCategory: string) => {
        return items?.filter(item => (item.category.toLowerCase() === searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType: string, items: Product[], searchByTitle: string, searchByCategory: string) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        } else if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        } else if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)?.filter(item => (item.title.toLowerCase().includes(searchByTitle.toLowerCase())))
        } else {
            return items
        }
    }

    const handleFiltered = () => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if (searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy("", items, searchByTitle, searchByCategory))
        }
    }

    useEffect(() => {
        handleFiltered()
    }, [items, searchByTitle, searchByCategory]);

    return (
        <ShoppingCartContext.Provider
            value={{
                count, setCount,
                openProductDetail, closeProductDetail, isProductDetailOpen,
                productToShow, setProductToShow,
                cartProducts, setCartProducts,
                isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu,
                order, setOrder,
                items, setItems,
                searchByTitle, setSearchByTitle,
                filteredItems,
                searchByCategory, setSearchByCategory
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider