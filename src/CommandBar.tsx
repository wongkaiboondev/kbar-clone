import { GlobeAltIcon } from "@heroicons/react/24/solid";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";

function CommandBar() {
  // const { query } = useKBar();

  // console.log(query.toggle);
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      section: "Web",
      perform: () => (window.location.pathname = "blog"),
      icon: <GlobeAltIcon />,
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      section: "Marketing",
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
  ];

  function RenderResults() {
    const { results } = useMatches();
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            // Section Header
            <div className={"section-wrapper"}>{item}</div>
          ) : (
            // Single Action
            <div
              className={`${
                active ? "dropdown__active" : "dropdown__inactive"
              }`}
            >
              {/* {console.log(item)} */}
              {item.name}
            </div>
          )
        }
      />
    );
  }

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          {/* Renders the content outside the root node */}
          <KBarPositioner className={"bg-black/50 backdrop-blur-sm"}>
            {" "}
            {/* Centers the content */}
            <KBarAnimator className={"animation-wrapper"}>
              {" "}
              {/* <div className={"search-icon"}>
                <GlobeIcon />
              </div> */}
              {/* Handles the show/hide and height animations */}
              <KBarSearch className={"search-bar"} />
              {/* Search input */}
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {/* <Button onClick={query.toggle}>⌘ K</Button> */}
      </KBarProvider>
    </>
  );
}

export default CommandBar;
