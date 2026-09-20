// No antd import here: this file only sets component tokens, and the old
// (unused) `theme` import still pulled antd's theme module into the first load.
const antdTheme = {
    components: {
        Button: {
            colorPrimary: "#111",
            colorPrimaryHover: "#222222b5",
            colorPrimaryActive: "#222",
            colorPrimaryBorder: "#222222b5",
            algorithm: true,
        },
        Form: {
            itemMarginBottom: 0,
        },
        Radio: {
            colorPrimary: "#111",
            algorithm: true, // Enable algorithm
        },
    },
}

// The dashboard mounts this through a nested ConfigProvider (see
// pages/dashboard/index.jsx), which merges on top of the tokens above. Keeping
// them separate is the point: the admin area can speak its own dial without
// changing a single storefront component, which shares the same ConfigProvider
// tree.
//
// Everything here is the storefront's palette expressed as antd tokens - the
// black from .btn-filled and the footer (#111), the muted copy, the 7px radius
// and #11111141 borders the public cards use.
//
// Two rules when adding to this object, both learned the hard way against
// antd 5.8:
//
//  1. A component's tokens are `Partial<ComponentToken> & Partial<AliasToken>`.
//     Invent a name and antd drops it silently - no warning, no type error at
//     build time, just the default. Layout's background is `colorBgHeader`
//     (which paints BOTH the header and the sider) - not `headerBg`/`siderBg`.
//  2. In 5.8 several components declare an empty or near-empty ComponentToken
//     (Table and Input have none at all), so their looks cannot be reached
//     from here and live in sass/dashboard.scss instead. Adding keys like
//     `Table.headerBg` does nothing.
//
// Where both could apply, sass/dashboard.scss wins by specificity, so the two
// must agree; the tokens below are the shell and the pieces the SASS leaves to
// antd. Only components the dashboard actually renders are listed - see the
// note on portals in dashboard.scss for why the popup surfaces have to be
// tokens rather than CSS.
const ink = "#111"
const muted = "rgba(0, 0, 0, 0.5)"

export const dashboardTheme = {
	// The seed tokens. This is the one that matters most: antd derives its
	// whole primary palette from colorPrimary, and left at the default #1677ff
	// the dashboard leaks blue in places component tokens cannot reach - the
	// uploader's drag icon, `type="link"` buttons, spinners, switches, the
	// active item in a select dropdown. Parking it on the store's black makes
	// every one of those neutral, the same way the storefront's own theme does
	// for its buttons and radios.
	token: {
		colorPrimary: ink,
		colorLink: ink,
		colorLinkHover: "#000",
		colorLinkActive: "#000",
	},
	components: {
		// colorBgHeader paints the sider too, so one token darkens the whole
		// shell to the store's black (#111) rather than antd's #001529.
		Layout: {
			colorBgHeader: ink,
			colorBgBody: "transparent",
			colorBgTrigger: "#1a1a1a",
		},
		// The sider stays dark, but in the store's black rather than antd's
		// #001529, with the active item as a white pill.
		Menu: {
			darkItemBg: "transparent",
			darkSubMenuItemBg: "transparent",
			darkItemColor: "rgba(255, 255, 255, 0.64)",
			darkItemHoverColor: "#fff",
			darkItemHoverBg: "rgba(255, 255, 255, 0.08)",
			darkItemSelectedBg: "#fff",
			darkItemSelectedColor: ink,
			itemBorderRadius: 7,
			itemHeight: 42,
			itemMarginInline: 0,
		},
		// Table, Input and InputNumber own no component tokens in antd 5.8 (see
		// the note above), so their treatment is entirely in dashboard.scss.
		Select: {
			// A real alias token, so the selector radius comes from antd rather
			// than needing an override. The popup list takes borderRadiusLG, so
			// both are needed to keep the control and its menu at 7px.
			borderRadius: 7,
			borderRadiusLG: 7,
			// The dropdown renders into a portal on <body>, so the SASS rules
			// scoped under .dashboard cannot reach it - these have to be tokens.
			controlItemBgHover: "rgba(0, 0, 0, 0.03)",
			controlItemBgActive: "rgba(0, 0, 0, 0.05)",
		},
		Button: {
			borderRadius: 9,
		},
		Breadcrumb: {
			itemColor: muted,
			lastItemColor: ink,
			linkColor: muted,
			linkHoverColor: ink,
			separatorColor: "rgba(0, 0, 0, 0.3)",
		},
		// Drawer, Popover and Tooltip take alias tokens only, which is all the
		// shell needs from them.
		Drawer: {
			colorBgElevated: "#fff",
			paddingLG: 20,
		},
		// The order pager (Table's pagination) and the upload previews' Modal.
		Pagination: {
			itemActiveBg: ink,
			borderRadius: 7,
		},
		Modal: {
			borderRadiusLG: 7,
			contentBg: "#fff",
		},
		// The account menu in the header.
		Dropdown: {
			borderRadiusLG: 7,
		},
		// The delete confirmation on the product page is a Popconfirm, which is
		// a Popover underneath (antd gives Popconfirm no tokens of its own), so
		// this is what rounds its bubble.
		Popover: {
			borderRadiusLG: 7,
		},
		Card: {
			borderRadiusLG: 7,
		},
	},
}

export default antdTheme