import * as React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Info, UtensilsCrossed, Calendar, PartyPopper, Phone, MapPin, ShoppingBag } from "lucide-react"

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface MenuItem {
    name: string
    price: string
    category: string
    description: string
}

interface Category {
    id: string
    label: string
    bg: string | null
    filled: boolean
}

interface HeroSectionProps {
    logo?: string
    logoScale: number
    showHeroText: boolean
    logoSpacingTop: number
    logoSpacingBottom: number
    heroTitleSize: number
    heroSubtitleSize: number
    fontFamily: string
    isCanvas: boolean
}

interface NavigationBarProps {
    activeSection: string
    onCategoryClick: (categoryId: string) => void
    isCanvas: boolean
    navFontSize: number
    navPadding: number
}

interface MenuSectionProps {
    category: Category
    menuItems: MenuItem[]
    onItemClick: (item: MenuItem) => void
    fontFamily: string
    isCanvas: boolean
    onSectionInView: (categoryId: string) => void
    sectionHeaderSize: number
    itemTitleSize: number
    itemDescSize: number
    boxPadding: number
}

interface ItemModalProps {
    item: MenuItem | null
    onClose: () => void
    isCanvas: boolean
}

interface DenChaiMenuProps {
    logo?: string
    logoScale?: number
    showHeroText?: boolean
    logoSpacingTop?: number
    logoSpacingBottom?: number
    font?: { fontFamily: string }
    heroTitleSize?: number
    heroSubtitleSize?: number
    sectionHeaderSize?: number
    itemTitleSize?: number
    itemDescSize?: number
    contentWidth?: number
    boxPadding?: number
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const MENU_API_URL =
    "https://script.google.com/macros/s/AKfycbyk8Hjqop0qmThW0N1sGVIqOeeQ_L9-aG_SQF8_TQpWMWIpEbow2npwra_MaslASifL4g/exec"

const colors = {
    chocolate: "#5C2B1F",
    terracotta: "#D35230",
    white: "#FFFFFF",
    cream: "#FFF8F0",
}

const CATEGORIES: Category[] = [
    {
        id: "appetizers",
        label: "Appetizers",
        bg: colors.terracotta,
        filled: true,
    },
    {
        id: "noodle soups",
        label: "Noodle Soups",
        bg: colors.chocolate,
        filled: true,
    },
    { id: "noodles", label: "Noodles", bg: null, filled: false },
    { id: "fried rice", label: "Fried Rice", bg: null, filled: false },
    { id: "curries", label: "Curries", bg: colors.terracotta, filled: true },
    {
        id: "asian entrees",
        label: "Asian Entrees",
        bg: colors.chocolate,
        filled: true,
    },
    { id: "salads", label: "Salads", bg: null, filled: false },
    { id: "sides", label: "Sides", bg: null, filled: false },
    { id: "beverages", label: "Beverages", bg: null, filled: false },
]

const MOCK_ITEMS: MenuItem[] = [
    {
        name: "Spring Rolls",
        price: "8",
        category: "appetizers",
        description: "3 Rolls filled with glass noodles and vegetables",
    },
    {
        name: "Potstickers",
        price: "9",
        category: "appetizers",
        description: "6 Dumplings steamed then pan fried",
    },
    {
        name: "Khao Soi",
        price: "10",
        category: "noodle soups",
        description: "Rich, creamy and fragrant coconut curry noodle soup",
    },
    {
        name: "Pad Thai",
        price: "12",
        category: "noodles",
        description: "Rice noodles with egg, bean sprouts, peanuts",
    },
    {
        name: "Fried Rice",
        price: "11",
        category: "fried rice",
        description: "Thai style fried rice with vegetables",
    },
    {
        name: "Red Curry",
        price: "13",
        category: "curries",
        description: "Classic Thai red curry with vegetables",
    },
    {
        name: "Mongolian Beef",
        price: "14",
        category: "asian entrees",
        description: "Tender beef with scallions in savory sauce",
    },
    {
        name: "Papaya Salad",
        price: "9",
        category: "salads",
        description: "Fresh green papaya with spicy lime dressing",
    },
    {
        name: "Sticky Rice",
        price: "3",
        category: "sides",
        description: "Traditional Thai sticky rice",
    },
    {
        name: "Thai Iced Tea",
        price: "4",
        category: "beverages",
        description: "Sweet and creamy Thai tea",
    },
]

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const HeroSection: React.FC<HeroSectionProps> = ({
    logo,
    logoScale,
    showHeroText,
    logoSpacingTop,
    logoSpacingBottom,
    heroTitleSize,
    heroSubtitleSize,
    fontFamily,
    isCanvas,
}) => {
    const styles = {
        heroSection: {
            textAlign: "center" as const,
            paddingTop: `${logoSpacingTop}px`,
            paddingBottom: `${logoSpacingBottom}px`,
            paddingLeft: "30px",
            paddingRight: "30px",
            marginBottom: "20px",
        },
        logo: {
            width: `${400 * logoScale}px`,
            height: `${400 * logoScale}px`,
            margin: "0 auto",
            marginBottom: showHeroText ? "30px" : "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        heroTitle: {
            fontFamily: fontFamily,
            fontSize: `${heroTitleSize}px`,
            color: colors.chocolate,
            marginBottom: "20px",
            lineHeight: "1",
        },
        heroSubtitle: {
            fontSize: `${heroSubtitleSize}px`,
            color: colors.terracotta,
            fontWeight: "500",
            letterSpacing: "4px",
        },
    }

    return (
        <motion.div
            initial={{ opacity: 1, y: isCanvas ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={styles.heroSection}
        >
            {logo && (
                <motion.div
                    initial={{ opacity: 1, scale: isCanvas ? 1 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={styles.logo}
                >
                    <img
                        src={logo}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            transform: `scale(${logoScale || 1})`,
                        }}
                        alt="Den Chai Logo"
                    />
                </motion.div>
            )}
            {showHeroText && (
                <>
                    <motion.h1
                        initial={{ opacity: 1, y: isCanvas ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        style={styles.heroTitle}
                    >
                        Den Chai
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        style={styles.heroSubtitle}
                    >
                        THAI RESTAURANT
                    </motion.p>
                </>
            )}
        </motion.div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION BAR COMPONENT - MOBILE FRIENDLY VERSION
// ═══════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════
// HAMBURGER MENU COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const NAV_LINKS = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/den-chai-about", icon: Info },
    { label: "Menu", href: "/den-chai-menu", icon: UtensilsCrossed },
    { label: "Reservations", href: "/den-chai-reservations", icon: Calendar },
    { label: "Private Events", href: "/den-chai-reservations", icon: PartyPopper },
    { label: "Contact", href: "#contact", icon: Phone },
    { label: "Map & Hours", href: "https://maps.app.goo.gl/F4hJKI9xSi62PgpHk", icon: MapPin },
    { label: "My Order", href: "#order", icon: ShoppingBag },
]

const HamburgerMenu: React.FC<{ isCanvas: boolean }> = ({ isCanvas }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    top: "35px",
                    right: "20px",
                    zIndex: 200,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px",
                }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <X size={32} color={colors.white} strokeWidth={2.5} />
                ) : (
                    <Menu size={32} color={colors.white} strokeWidth={2.5} />
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                zIndex: 150,
                            }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{
                                position: "fixed",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: "min(400px, 80vw)",
                                backgroundColor: colors.chocolate,
                                zIndex: 160,
                                padding: "100px 40px 40px",
                                overflowY: "auto",
                                boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
                            }}
                        >
                            {NAV_LINKS.map((link, idx) => {
                                const IconComponent = link.icon
                                return (
                                    <motion.a
                                        key={link.label}
                                        href={isCanvas ? undefined : link.href}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => !isCanvas && setIsOpen(false)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "20px",
                                            padding: "20px",
                                            marginBottom: "10px",
                                            color: colors.white,
                                            textDecoration: "none",
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            borderRadius: "12px",
                                            transition: "all 0.2s",
                                            cursor: "pointer",
                                        }}
                                        whileHover={{
                                            backgroundColor: colors.terracotta,
                                            x: 10,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconComponent size={24} />
                                        <span>{link.label}</span>
                                    </motion.a>
                                )
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    activeSection,
    onCategoryClick,
    isCanvas,
    navFontSize,
    navPadding,
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const styles = {
        nav: {
            position: "sticky" as const,
            top: 0,
            zIndex: 100,
            backgroundColor: colors.chocolate,
            padding: "30px 0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
        navInner: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap" as const,
            gap: "16px",
        },
    }

    return (
        <motion.nav
            initial={{ y: isCanvas ? 0 : -100, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={styles.nav}
        >
            <div style={styles.navInner}>
                <motion.div
                    animate={{ x: isMenuOpen ? -300 : 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    style={{ display: "contents" }}
                >
                {CATEGORIES.map((cat) => {
                    const isActive = activeSection === cat.id
                    return (
                        <motion.button
                            key={cat.id}
                            onClick={() => onCategoryClick(cat.id)}
                            style={{
                                background: isActive
                                    ? colors.terracotta
                                    : "transparent",
                                border: "none",
                                color: isActive
                                    ? colors.white
                                    : "rgba(255,255,255,0.7)",
                                fontSize: `${navFontSize}px`,
                                fontWeight: "600",
                                cursor: "pointer",
                                padding: `${navPadding}px ${navPadding * 1.5}px`,
                                minHeight: "48px",
                                minWidth: "fit-content",
                                borderRadius: "8px",
                                transition: "all 0.2s",
                                fontFamily: "sans-serif",
                                textTransform: "uppercase" as const,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat.label}
                        </motion.button>
                    )
                })}
                </motion.div>
            </div>
        </motion.nav>
            <HamburgerMenu isCanvas={isCanvas} />
        </>
    )
}
// MENU SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const MenuSection: React.FC<MenuSectionProps> = React.memo(
    ({
        category,
        menuItems,
        onItemClick,
        fontFamily,
        isCanvas,
        onSectionInView,
        sectionHeaderSize,
        itemTitleSize,
        itemDescSize,
        boxPadding,
    }) => {
        const ref = useRef(null)
        const isInView = useInView(ref, {
            once: false,
            amount: 0.3,
            margin: "-100px",
        })

        useEffect(() => {
            if (isInView && !isCanvas) {
                onSectionInView(category.id)
            }
        }, [isInView, category.id, isCanvas, onSectionInView])

        const filtered = menuItems.filter(
            (i) =>
                i.category &&
                i.category.toLowerCase().trim() === category.id.toLowerCase()
        )

        if (filtered.length === 0) return null

        const isFilled = category.filled
        const textColor = isFilled ? colors.white : colors.chocolate

        const styles = {
            section: {
                marginBottom: "60px",
                scrollMarginTop: "120px",
            },
            sectionFilled: {
                backgroundColor: category.bg || colors.terracotta,
                padding: `${boxPadding}px 30px`,
                borderRadius: "12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            },
            sectionClean: {
                padding: "20px 0",
            },
            sectionHeader: {
                fontFamily: fontFamily,
                fontSize: `${sectionHeaderSize}px`,
                textAlign: "center" as const,
                marginBottom: "40px",
                lineHeight: "1",
            },
            item: {
                marginBottom: "25px",
                cursor: "pointer",
                padding: "20px",
                borderRadius: "10px",
                transition: "all 0.2s",
            },
            itemTitle: {
                fontFamily: "sans-serif",
                fontWeight: "900" as const,
                textTransform: "uppercase" as const,
                fontSize: `${itemTitleSize}px`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
            },
            itemDesc: {
                fontFamily: "serif",
                fontSize: `${itemDescSize}px`,
                lineHeight: "1.6",
                opacity: 0.85,
            },
        }

        return (
            <motion.div
                ref={ref}
                id={`section-${category.id}`}
                initial={{ opacity: 1, y: isCanvas ? 0 : 50 }}
                animate={
                    isInView || isCanvas
                        ? { opacity: 1, y: 0 }
                        : { opacity: 1, y: 50 }
                }
                transition={{ duration: 0.6, type: "spring" }}
                style={{
                    ...styles.section,
                    ...(isFilled ? styles.sectionFilled : styles.sectionClean),
                }}
            >
                <motion.h2
                    initial={{ opacity: 1, scale: isCanvas ? 1 : 0.9 }}
                    animate={
                        isInView || isCanvas
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 1, scale: 0.9 }
                    }
                    transition={{ delay: 0.2 }}
                    style={{ ...styles.sectionHeader, color: textColor }}
                >
                    {category.label}
                </motion.h2>

                <motion.div
                    initial="hidden"
                    animate={isInView || isCanvas ? "visible" : "hidden"}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {filtered.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { x: isCanvas ? 0 : -30, opacity: 1 },
                                visible: { x: 0, opacity: 1 },
                            }}
                            style={styles.item}
                            whileHover={{
                                x: 8,
                                backgroundColor: isFilled
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(211,82,48,0.05)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => !isCanvas && onItemClick(item)}
                        >
                            <div
                                style={{
                                    ...styles.itemTitle,
                                    color: textColor,
                                }}
                            >
                                <span>{item.name}</span>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    style={{ fontWeight: "bold" }}
                                >
                                    {item.price}
                                </motion.span>
                            </div>
                            {item.description && (
                                <div
                                    style={{
                                        ...styles.itemDesc,
                                        color: isFilled
                                            ? "rgba(255,255,255,0.9)"
                                            : colors.chocolate,
                                    }}
                                >
                                    {item.description}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        )
    }
)

MenuSection.displayName = "MenuSection"

// ═══════════════════════════════════════════════════════════════════════════
// ITEM MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, isCanvas }) => {
    if (!item || isCanvas) return null

    const styles = {
        modal: {
            position: "fixed" as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
        },
        modalContent: {
            backgroundColor: colors.white,
            borderRadius: "16px",
            padding: "40px",
            maxWidth: "500px",
            width: "100%",
        },
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.modal}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 100 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    style={styles.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2
                        style={{
                            color: colors.chocolate,
                            marginBottom: "10px",
                            fontSize: "28px",
                        }}
                    >
                        {item.name}
                    </h2>
                    <p
                        style={{
                            fontSize: "24px",
                            color: colors.terracotta,
                            fontWeight: "bold",
                            marginBottom: "20px",
                        }}
                    >
                        {item.price}
                    </p>
                    <p
                        style={{
                            color: "#666",
                            lineHeight: "1.6",
                            fontSize: "16px",
                        }}
                    >
                        {item.description}
                    </p>
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 5px 20px rgba(211,82,48,0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        style={{
                            marginTop: "30px",
                            padding: "14px 40px",
                            backgroundColor: colors.terracotta,
                            color: colors.white,
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function DenChaiMenu(props: DenChaiMenuProps) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [activeSection, setActiveSection] = useState("appetizers")

    const fontFamily = props.font?.fontFamily || "cursive"
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    // Fetch menu data
    useEffect(() => {
        if (isCanvas) {
            setMenuItems(MOCK_ITEMS)
            setLoading(false)
            return
        }

        const fetchMenu = async () => {
            try {
                setLoading(true)
                const response = await fetch(MENU_API_URL)
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const data = await response.json()
                const items = (data.items || []).map((item: any) => ({
                    name: item.Title || item.name || "",
                    price: item.Price || item.price || "",
                    category: item.Category || item.category || "",
                    description: item.Description || item.description || "",
                }))
                setMenuItems(items)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }
        fetchMenu()
    }, [isCanvas])

    const scrollToSection = useCallback((categoryId: string) => {
        setActiveSection(categoryId)
        const element = document.getElementById(`section-${categoryId}`)
        if (element) {
            const navHeight = 100
            const elementPosition =
                element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navHeight - 20
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
    }, [])

    const handleSectionInView = useCallback((categoryId: string) => {
        setActiveSection(categoryId)
    }, [])

    const styles = {
        wrapper: {
            width: "100%",
            backgroundColor: colors.cream,
            minHeight: "100vh",
        },
        content: {
            maxWidth: `${props.contentWidth || 900}px`,
            margin: "0 auto",
            padding: "40px 30px",
        },
    }

    if (loading) {
        return (
            <div
                style={{
                    ...styles.wrapper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: "center" }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: "50px",
                            height: "50px",
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #D35230",
                            borderRadius: "50%",
                            margin: "0 auto 20px",
                        }}
                    />
                    <h3>Loading Menu...</h3>
                </motion.div>
            </div>
        )
    }

    if (error) {
        return (
            <div
                style={{
                    ...styles.wrapper,
                    padding: "80px 20px",
                    textAlign: "center",
                }}
            >
                <h3 style={{ color: colors.terracotta }}>
                    ⚠️ Unable to Load Menu
                </h3>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <>
            <div style={styles.wrapper}>
                <NavigationBar
                    activeSection={activeSection}
                    onCategoryClick={scrollToSection}
                    isCanvas={isCanvas}
                navFontSize={props.navFontSize || 20}
                    navPadding={props.navPadding || 16}
                />

                <HeroSection
                    logo={props.logo}
                    logoScale={props.logoScale || 1}
                    showHeroText={props.showHeroText || false}
                    logoSpacingTop={props.logoSpacingTop || 80}
                    logoSpacingBottom={props.logoSpacingBottom || 50}
                    heroTitleSize={props.heroTitleSize || 96}
                    heroSubtitleSize={props.heroSubtitleSize || 28}
                    fontFamily={fontFamily}
                    isCanvas={isCanvas}
                navFontSize={props.navFontSize || 20}
                    navPadding={props.navPadding || 16}
                />

                <div style={styles.content}>
                    {CATEGORIES.map((category) => (
                        <MenuSection
                            key={category.id}
                            category={category}
                            menuItems={menuItems}
                            onItemClick={setSelectedItem}
                            fontFamily={fontFamily}
                            isCanvas={isCanvas}
                            onSectionInView={handleSectionInView}
                            sectionHeaderSize={props.sectionHeaderSize || 72}
                            itemTitleSize={props.itemTitleSize || 24}
                            itemDescSize={props.itemDescSize || 20}
                            boxPadding={props.boxPadding || 40}
                        navFontSize={props.navFontSize || 20}
                    navPadding={props.navPadding || 16}
                />
                    ))}
                </div>
            </div>

            <ItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                isCanvas={isCanvas}
            navFontSize={props.navFontSize || 20}
                    navPadding={props.navPadding || 16}
                />
        </>
    )
}

// ═══════════════════════════════════════════════════════════════════════════
// PROPERTY CONTROLS
// ═══════════════════════════════════════════════════════════════════════════

addPropertyControls(DenChaiMenu, {
    logo: { type: ControlType.Image, title: "Logo" },
    logoScale: {
        type: ControlType.Number,
        title: "Logo Scale",
        defaultValue: 1,
        min: 0.5,
        max: 10,
        step: 0.1,
        displayStepper: true,
    },
    showHeroText: {
        type: ControlType.Boolean,
        title: "Show Hero Text",
        defaultValue: false,
    },
    logoSpacingTop: {
        type: ControlType.Number,
        title: "Logo Top Space",
        defaultValue: 80,
        min: 0,
        max: 200,
        step: 10,
        displayStepper: true,
    },
    logoSpacingBottom: {
        type: ControlType.Number,
        title: "Logo Bottom Space",
        defaultValue: 50,
        min: 0,
        max: 200,
        step: 10,
        displayStepper: true,
    },
    font: { type: ControlType.Font, title: "Header Font" },
    heroTitleSize: {
        type: ControlType.Number,
        title: "Hero Title Size",
        defaultValue: 96,
        min: 40,
        max: 200,
        step: 4,
        displayStepper: true,
    },
    heroSubtitleSize: {
        type: ControlType.Number,
        title: "Hero Subtitle Size",
        defaultValue: 28,
        min: 16,
        max: 60,
        step: 2,
        displayStepper: true,
    },
    sectionHeaderSize: {
        type: ControlType.Number,
        title: "Section Header Size",
        defaultValue: 72,
        min: 32,
        max: 150,
        step: 4,
        displayStepper: true,
    },
    itemTitleSize: {
        type: ControlType.Number,
        title: "Item Title Size",
        defaultValue: 24,
        min: 14,
        max: 50,
        step: 2,
        displayStepper: true,
    },
    itemDescSize: {
        type: ControlType.Number,
        title: "Item Description Size",
        defaultValue: 20,
        min: 12,
        max: 40,
        step: 2,
        displayStepper: true,
    },
    navFontSize: {
        type: ControlType.Number,
        title: "Nav Button Font Size",
        defaultValue: 20,
        min: 12,
        max: 32,
        step: 2,
        displayStepper: true,
    },
    navPadding: {
        type: ControlType.Number,
        title: "Nav Button Padding",
        defaultValue: 16,
        min: 8,
        max: 32,
        step: 2,
        displayStepper: true,
    },
    contentWidth: {
        type: ControlType.Number,
        title: "Content Width",
        defaultValue: 900,
        min: 600,
        max: 1600,
        step: 50,
        displayStepper: true,
    },
    boxPadding: {
        type: ControlType.Number,
        title: "Box Padding",
        defaultValue: 40,
        min: 20,
        max: 100,
        step: 5,
        displayStepper: true,
    },
})
