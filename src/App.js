import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation,Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';

import AppMenu from './AppMenu';


import Dashboard from './components/Dashboard';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import InvalidStateDemo from './components/InvalidStateDemo';
import ButtonDemo from './components/ButtonDemo';
import TableDemo from './components/TableDemo';
import ListDemo from './components/ListDemo';
import TreeDemo from './components/TreeDemo';
import PanelDemo from './components/PanelDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import FileDemo from './components/FileDemo';
import ChartDemo from './components/ChartDemo';
import MiscDemo from './components/MiscDemo';
import Documentation from './components/Documentation';
import IconsDemo from './utilities/IconsDemo';
import BlocksDemo from './components/BlocksDemo';
import CrudDemo from './pages/CrudDemo';
import CalendarDemo from './pages/CalendarDemo';
import TimelineDemo from './pages/TimelineDemo';
import Invoice from './pages/Invoice';
import Help from './pages/Help';
import EmptyPage from './pages/EmptyPage';
import KecloakLoginPage from './components/KecloakLoginPage';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {
    const [layoutMode, setLayoutMode] = useState('slim');
    const [lightMenu, setLightMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [isRTL, setIsRTL] = useState(false);
    const [inlineUser, setInlineUser] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [rightPanelMenuActive, setRightPanelMenuActive] = useState(null);
    const [inlineUserMenuActive, setInlineUserMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [topbarColor, setTopbarColor] = useState('');
    const [theme, setTheme] = useState('');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const inlineUserRef = useRef();

    const menu = [
        {
        label: 'Favorites',
        icon: 'pi pi-fw pi-home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dash' }]
    },
       
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-copy',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/crud' },
                { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
                { label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', to: '/error' },
                { label: '404', icon: 'pi pi-fw pi-times', to: '/notfound' },
                { label: 'Access Denied', icon: 'pi pi-fw pi-ban', to: '/access' },
                { label: 'Empty', icon: 'pi pi-fw pi-clone', to: '/empty' }
            ]
        },
       
       
    ];

    let topbarItemClick;
    let menuClick;
    let rightMenuClick;
    let userMenuClick;
    let configClick = false;

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        } else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!rightMenuClick) {
            setRightPanelMenuActive(false);
        }

        if (!userMenuClick && isSlim() && !isMobile()) {
            setInlineUserMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        topbarItemClick = false;
        menuClick = false;
        rightMenuClick = false;
        userMenuClick = false;
        configClick = false;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);
        setRightPanelMenuActive(false);

        if (layoutMode === 'overlay') {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        }

        if (isDesktop()) setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
        else {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }

        event.preventDefault();
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;

        if (activeTopbarItem === event.item) setActiveTopbarItem(null);
        else setActiveTopbarItem(event.item);

        event.originalEvent.preventDefault();
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onInlineUserClick = () => {
        userMenuClick = true;
        setInlineUserMenuActive((prevInlineUserMenuActive) => !prevInlineUserMenuActive);
        setMenuActive(false);
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onRightMenuButtonClick = (event) => {
        rightMenuClick = true;
        setRightPanelMenuActive((prevRightPanelMenuActive) => !prevRightPanelMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();
        }
        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
        setInlineUserMenuActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 1025;
    };

    const isHorizontal = () => {
        return layoutMode === 'horizontal';
    };

    const isSlim = () => {
        return layoutMode === 'slim';
    };

    const onLayoutModeChange = (layoutMode) => {
        setLayoutMode(layoutMode);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (layoutMode === 'horizontal' && inlineUser) {
            setInlineUser(false);
        }
    };

    const onMenuColorChange = (menuColor) => {
        setLightMenu(menuColor);
    };

    const onThemeChange = () => {
        
    };

    const onProfileModeChange = (profileMode) => {
        setInlineUser(profileMode);
    };

    const onOrientationChange = (orientation) => {
        setIsRTL(orientation);
    };

    const onTopbarColorChange = (color) => {
        setTopbarColor(color);
    };

    const layoutClassName = classNames(
        'layout-wrapper',
        {
            'layout-horizontal': layoutMode === 'horizontal',
            'layout-overlay': layoutMode === 'overlay',
            'layout-static': layoutMode === 'static',
            'layout-slim': layoutMode === 'slim',
            'layout-menu-light': lightMenu,
            'layout-menu-dark': !lightMenu,
            'layout-overlay-active': overlayMenuActive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-static-inactive': staticMenuDesktopInactive,
            'layout-rtl': isRTL,
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        },
        
    );

    const inlineUserTimeout = layoutMode === 'slim' ? 0 : { enter: 1000, exit: 450 };

    return (
        <div className={layoutClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar
                topbarMenuActive={topbarMenuActive}
                activeTopbarItem={activeTopbarItem}
                inlineUser={inlineUser}
                onRightMenuButtonClick={onRightMenuButtonClick}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick}
            />

           

            <div className="layout-menu-container" onClick={onMenuClick}>
                {inlineUser && (
                    <div className="layout-profile">
                        <button type="button" className="p-link layout-profile-button" onClick={onInlineUserClick}>
                            <img src="assets/layout/images/avatar.png" alt="roma-layout" />
                            <div className="layout-profile-userinfo">
                                <span className="layout-profile-name">Arlene Welch</span>
                                <span className="layout-profile-role">Design Ops</span>
                            </div>
                        </button>
                        <CSSTransition nodeRef={inlineUserRef} classNames="p-toggleable-content" timeout={inlineUserTimeout} in={inlineUserMenuActive} unmountOnExit>
                            <ul ref={inlineUserRef} className={classNames('layout-profile-menu', { 'profile-menu-active': inlineUserMenuActive })}>
                                <li>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-fw pi-user"></i>
                                        <span>Profile</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-fw pi-cog"></i>
                                        <span>Settings</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-fw pi-envelope"></i>
                                        <span>Messages</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="p-link">
                                        <i className="pi pi-fw pi-bell"></i>
                                        <span>Notifications</span>
                                    </button>
                                </li>
                            </ul>
                        </CSSTransition>
                    </div>
                )}
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} layoutMode={layoutMode} active={menuActive} mobileMenuActive={staticMenuMobileActive} />
            </div>

            <div className="layout-main">
                <div className="layout-content">
                    <Routes>
                       
                        
                    <Route path="/" element={<Dashboard />} />
                    
                        <Route path="/formlayout" element={<FormLayoutDemo />} />
                        <Route path="/input" element={<InputDemo />} />
                        <Route path="/floatlabel" element={<FloatLabelDemo />} />
                        <Route path="/invalidstate" element={<InvalidStateDemo />} />
                        <Route path="/button" element={<ButtonDemo />} />
                        <Route path="/table" element={<TableDemo />} />
                        <Route path="/list" element={<ListDemo />} />
                        <Route path="/tree" element={<TreeDemo />} />
                        <Route path="/panel" element={<PanelDemo />} />
                        <Route path="/overlay" element={<OverlayDemo />} />
                        <Route path="/media" element={<MediaDemo />} />
                        <Route path="/menu/*" element={<MenuDemo />} />
                        <Route path="/messages" element={<MessagesDemo />} />
                        <Route path="/file" element={<FileDemo />} />
                        <Route path="/chart" element={<ChartDemo />} />
                        <Route path="/blocks" element={<BlocksDemo />} />
                        <Route path="/misc" element={<MiscDemo />} />
                        <Route path="/icons" element={<IconsDemo />} />
                       
                        <Route path="/timeline" element={<TimelineDemo />} />
                        <Route path="/calendar" element={<CalendarDemo />} />
                        <Route path="/invoice" element={<Invoice />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/empty" element={<EmptyPage />} />
                        <Route path="/documentation" element={<Documentation />} />
                    </Routes>
                </div>

               

             
            </div>

            <div className="layout-content-mask"></div>
        </div>
    );
};

export default App;
