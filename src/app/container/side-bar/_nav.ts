interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}

export interface NavData {
    id?: number;
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
    role?: string[];
}

export module MyModule {
    export function getNavItems() {
        let navItems: NavData[] = [
            {
                role: [],
                name: 'APP.SIDEBAR.SECTIONS',
                icon: 'view_comfy',
                variant: 'secondary',
                title: true,
                url: '/sections',
                class: 'text-white',
            },

            {
                role: [],
                id: 1,
                name: 'APP.SIDEBAR.QUESTIONS',
                url: '/questions',
                icon: 'info',
                class: ' text-white ',
                attributes: { disabled: false },
            },
        ];

        return navItems;
    }
}
