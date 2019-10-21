import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { Route } from 'react-router-dom';
import { ClientView } from './components/Client';
import { ArticleView } from './components/Article';
import { OrderView } from './components/Orders';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            profileMode: 'inline',
            layoutCompact: true,
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            rotateMenuButton: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkMenu: false,
            menuActive: false,
            theme: 'blue',
            layout: 'blue',
            version: 'v3',
        };

        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
        this.createMenu();
    }

    onMenuClick(event) {
        this.menuClick = true;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.setState(({
            rotateMenuButton: !this.state.rotateMenuButton,
            topbarMenuActive: false
        }));

        if (this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else {
            if (this.isDesktop())
                this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
            else
                this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
        }

        event.preventDefault();
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick(event) {
        this.topbarItemClick = true;

        if (this.state.activeTopbarItem === event.item)
            this.setState({ activeTopbarItem: null });
        else
            this.setState({ activeTopbarItem: event.item });

        event.originalEvent.preventDefault();
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.hideOverlayMenu();
        }
        if (!event.item.items && this.isHorizontal()) {
            this.setState({
                menuActive: false
            })
        }
    }

    onRootMenuItemClick(event) {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    onDocumentClick(event) {
        if (!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            this.hideOverlayMenu();
        }

        if (!this.rightPanelClick) {
            this.setState({
                rightPanelActive: false
            })
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    hideOverlayMenu() {
        this.setState({
            rotateMenuButton: false,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.state.layoutMode === 'slim';
    }

    changeTheme(theme) {
        this.setState({ theme: theme });
        if (this.state.version === 'v3') {
            this.changeStyleSheetUrl('theme-css', theme, 'theme');
        } else {
            this.changeStyleSheetUrl('theme-css', theme + '-v4', 'theme');
        }
    }

    changeLayout(layout, special) {
        this.setState({ layout: layout });
        if (this.state.version === 'v3') {
            this.changeStyleSheetUrl('layout-css', layout, 'layout');
        } else {
            this.changeStyleSheetUrl('layout-css', layout + '-v4', 'layout');
        }

        if (special) {
            this.setState({
                darkMenu: true
            })
        }
    }

    changeVersion(version) {
        this.setState({ version: version });
        if (version === 'v3') {
            this.changeStyleSheetUrl('layout-css', this.state.layout, 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme, 'theme');
        } else {
            this.changeStyleSheetUrl('layout-css', this.state.layout + '-v4', 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme + '-v4', 'theme');
        }
    }

    changeStyleSheetUrl(id, value, prefix) {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');
        element.setAttribute('href', newURL);
    }

    createMenu() {
        this.menu = [
            {label: 'Cliente', icon: 'fa fa-fw  fa-user', to: '/clients'},
            { label: 'Articulo', icon: 'fa fa-fw fa-product-hunt', to: '/articles' },
            { label: 'Ordenes', icon: 'fa fa-fw fa fa-shopping-cart', to: '/orders' },

        ];
    }

    render() {
        let layoutClassName = classNames('layout-wrapper', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });
        let menuClassName = classNames('layout-menu-container', { 'layout-menu-dark': this.state.darkMenu });

        return (
            <div className={layoutClassName} onClick={this.onDocumentClick}>
                <div>
                    <AppTopbar profileMode={this.state.profileMode} horizontal={this.isHorizontal()}
                        topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                        onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                        onTopbarItemClick={this.onTopbarItemClick} />

                    <div className={menuClassName} onClick={this.onMenuClick}>
                        <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                            <div className="menu-scroll-content">
                                {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') }
                                <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                    layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                            </div>
                        </ScrollPanel>
                    </div>

                    <div className="layout-main">
                        <Route path="/clients" exact component={ClientView} />
                        <Route path="/articles" exact component={ArticleView} />
                        <Route path="/orders" exact component={OrderView} />
                       
                        
                    </div>

                    <div className="layout-mask"></div>

                    <AppFooter />
                </div>
            </div>
        );
    }
}

export default App;
