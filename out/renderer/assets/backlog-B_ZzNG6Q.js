import { A as require_jsx_runtime, D as Outlet, E as createLucideIcon, F as require_react, O as Link, b as twMerge, f as DisplayName, n as useQuery, v as Title, y as twJoin } from "./index-B6waIkEG.js";
import { t as Rating } from "./dist-Tz29Lhsi.js";
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
var ChevronsLeft = createLucideIcon("chevrons-left", [["path", {
	d: "m11 17-5-5 5-5",
	key: "13zhaf"
}], ["path", {
	d: "m18 17-5-5 5-5",
	key: "h8a8et"
}]]);
var ChevronsRight = createLucideIcon("chevrons-right", [["path", {
	d: "m6 17 5-5-5-5",
	key: "xnjwq"
}], ["path", {
	d: "m13 17 5-5-5-5",
	key: "17xmmf"
}]]);
var SquarePen = createLucideIcon("square-pen", [["path", {
	d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
	key: "1m0v6g"
}], ["path", {
	d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	key: "ohrbg2"
}]]);
var import_react = require_react();
const PaginationContext = (0, import_react.createContext)(void 0);
const usePagination = () => {
	const context = (0, import_react.useContext)(PaginationContext);
	if (!context) throw new Error("PaginationContext");
	return context;
};
const calculateFirstValidVisiblePage = (currentPage) => {
	return Math.max(1, currentPage - Math.floor(5 / 2));
};
const calculateLastValidVisiblePage = (totalPages, firstPageNumber) => {
	return Math.min(totalPages, firstPageNumber + 5 - 1);
};
const generatePageNumbersForNavbar = (currentPage, totalPages = 1) => {
	const firstPageNumber = calculateFirstValidVisiblePage(currentPage);
	const lastPageNumber = calculateLastValidVisiblePage(totalPages, firstPageNumber);
	return Array.from({ length: lastPageNumber - firstPageNumber + 1 }, (_, i) => firstPageNumber + i);
};
const getBacklogPageAmount = async (itemsPerPage = 30) => {
	return await window.api.getBacklogPageAmount(itemsPerPage);
};
var import_jsx_runtime = require_jsx_runtime();
const PaginationProvider = ({ children, itemsPerPage, queryKey, queryFn }) => {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const { data: totalPages } = useQuery({
		queryKey: [queryKey, itemsPerPage],
		queryFn: () => queryFn(itemsPerPage)
	});
	const navbarPageNumbers = (0, import_react.useMemo)(() => generatePageNumbersForNavbar(currentPage, totalPages), [currentPage, totalPages]);
	const goToPage = (page) => {
		setCurrentPage(page);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const goToPreviousPage = () => {
		if (currentPage <= 1) return;
		goToPage(currentPage - 1);
	};
	const goToNextPage = () => {
		if (totalPages && currentPage >= totalPages) return;
		goToPage(currentPage + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationContext.Provider, {
		value: {
			currentPage,
			navbarPageNumbers,
			totalPages: totalPages ?? 0,
			goToPage,
			goToPreviousPage,
			goToNextPage
		},
		children
	});
};
const formatGenres = (genres, maxLength = 30) => {
	let currentLength = 0;
	return genres.filter((genre) => {
		const lengthToAdd = genre.length + 2;
		if (currentLength + lengthToAdd >= maxLength) return false;
		currentLength += lengthToAdd;
		return true;
	}).join(", ");
};
const formatLength = (length) => {
	return length ? `${length} Hours` : "Unknown";
};
const formatMetadata = (status, metadata, review) => {
	if ([
		"Completed",
		"100%",
		"Dropped"
	].includes(status)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
		defaultValue: review ?? 0,
		isReadonly: true,
		starAmount: 5
	});
	return metadata;
};
const getBacklogGames = async (queryOptions) => {
	return await window.api.getBacklogGames(queryOptions);
};
const BacklogContext = (0, import_react.createContext)(void 0);
const useBacklog = () => {
	const context = (0, import_react.useContext)(BacklogContext);
	if (!context) throw new Error("BacklogGamesContext");
	return context;
};
const BacklogProvider = ({ children, currentPage }) => {
	const { data: games } = useQuery({
		queryKey: ["backlog-games", currentPage],
		queryFn: () => getBacklogGames({
			currentPage,
			itemsPerPage: 30
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BacklogContext.Provider, {
		value: games || [],
		children
	});
};
const GameCardContext = (0, import_react.createContext)(void 0);
const useGameCard = () => {
	const context = (0, import_react.useContext)(GameCardContext);
	if (!context) throw new Error("useGameCard must be used within a GameCardProvider!");
	return context;
};
const GameCardProvider = ({ children, game }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCardContext.Provider, {
		value: game,
		children
	});
};
const CardBodyItem = ({ value, formatter }) => {
	if (!formatter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: `${value}` });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatter(value) });
};
const CardBody = () => {
	const { genres, status, metadata, reviewScore, length, platform } = useGameCard();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: twJoin("flex w-full flex-1 flex-col items-center", "justify-between py-5 text-white/90"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBodyItem, {
				value: genres,
				formatter: formatGenres
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBodyItem, { value: status }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBodyItem, {
				value: metadata,
				formatter: (value) => formatMetadata(status, value, reviewScore)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBodyItem, {
				value: length,
				formatter: formatLength
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBodyItem, { value: platform })
		]
	});
};
const CardCover = () => {
	const { cover, name, id } = useGameCard();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative h-[300px] w-[200px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "size-full rounded-l-sm object-cover",
			src: cover,
			alt: `${name} game cover`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/backlog/edit/$gameId",
			params: { gameId: `${id}` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
				className: twJoin("absolute top-0 right-0 hidden cursor-pointer", "text-stone-500 transition-all duration-200", "ease-in hover:text-accent-normal group-hover:inline"),
				size: 30
			})
		})]
	});
};
const CardHeader = () => {
	const { name } = useGameCard();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full border-stone-900 border-b py-3 text-center text-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplayName, { name })
	});
};
const GameCard = ({ game }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCardProvider, {
		game,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: twJoin("flex h-[300px] w-[410px] rounded-r-sm border border-stone-900", "bg-stone-900/40 sm:w-full sm:max-w-[480px]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardCover, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, {})]
			})]
		})
	});
};
const BacklogGames = () => {
	const games = useBacklog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: twJoin("grid w-full grid-cols-1 justify-items-center gap-4", "lg:grid-cols-2 xl:w-[1500px] xl:grid-cols-3"),
		children: games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game }, `gameId${game.id}`))
	});
};
const Backlog = () => {
	const { currentPage } = usePagination();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BacklogProvider, {
		currentPage,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BacklogGames, {})
	});
};
const PaginationNavItem = ({ children, isPageActive, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: twMerge("flex size-12 cursor-pointer items-center justify-center rounded-sm", "border border-stone-800 bg-stone-900/40 text-lg transition-colors", "duration-200 ease-in hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-50", isPageActive && "bg-accent-light"),
		...props,
		children
	});
};
const PaginationNavbar = () => {
	const { currentPage, totalPages, navbarPageNumbers, goToPage, goToPreviousPage, goToNextPage } = usePagination();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex items-center justify-center gap-2 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavItem, {
				onClick: () => goToPage(1),
				disabled: currentPage === 1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { strokeWidth: 1.5 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavItem, {
				onClick: goToPreviousPage,
				disabled: currentPage === 1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					size: 20,
					strokeWidth: 2.5
				})
			}),
			navbarPageNumbers.map((pageNumber) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavItem, {
				onClick: () => goToPage(pageNumber),
				isPageActive: currentPage === pageNumber,
				children: pageNumber
			}, `PaginationNav${totalPages}${pageNumber}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavItem, {
				onClick: goToNextPage,
				disabled: currentPage === totalPages,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					size: 20,
					strokeWidth: 2.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavItem, {
				onClick: () => goToPage(totalPages),
				disabled: currentPage === totalPages,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { strokeWidth: 1.5 })
			})
		]
	});
};
function BacklogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "My Backlog" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "w-full place-items-center pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationProvider, {
			itemsPerPage: 30,
			queryFn: getBacklogPageAmount,
			queryKey: "backlog-pagination",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backlog, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNavbar, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	})] });
}
export { BacklogPage as component };
