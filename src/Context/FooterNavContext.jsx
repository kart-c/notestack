import { createContext, useContext, useState } from 'react';

const FooterNavContext = createContext({
	footerNav: { nav: false, labelNotes: false },
	setFooterNav: () => {},
});

export const FooterNavProvider = ({ children }) => {
	const [footerNav, setFooterNav] = useState({ nav: false, labelNotes: false });
	return (
		<FooterNavContext.Provider value={{ footerNav, setFooterNav }}>
			{children}
		</FooterNavContext.Provider>
	);
};

export const useFooterNav = () => useContext(FooterNavContext);
