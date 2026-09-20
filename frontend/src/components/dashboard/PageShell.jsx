/* eslint-disable react/prop-types -- this is a layout wrapper: its props are the
   slots every dashboard page fills in, and the project has no prop-types. */
import { Link } from "react-router-dom"
import Breadcrumb from "antd/es/breadcrumb"

// The storefront's page rhythm, scaled for a tool: the breadcrumb sits above a
// header that carries the same three beats the public pages use - a small
// uppercase label (FancyHeader's `small`), a bold title and a muted line - with
// room for actions on the right. Everything below is the page's own content.
const PageShell = ({ eyebrow, title, subtitle, breadcrumb = [], actions, children }) => {
	const items = [
		{ title: <Link to="/dashboard/products">Dashboard</Link> },
		...breadcrumb,
	]

	return (
		<div className="dashboard__page">
			<div className="dashboard__breadcrumb">
				<Breadcrumb items={items} />
			</div>

			<div className="dashboard__intro">
				<div className="intro-text">
					{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
					<h1>{title}</h1>
					{subtitle ? <p className="subtitle">{subtitle}</p> : null}
				</div>
				{actions ? <div className="intro-actions">{actions}</div> : null}
			</div>

			<div className="dashboard__body">{children}</div>
		</div>
	)
}

export default PageShell
