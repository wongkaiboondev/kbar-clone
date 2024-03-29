import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import type { ActionImpl } from "kbar/lib/action/ActionImpl";
import type { ActionId } from "kbar/src/types";
import { forwardRef, Fragment, useMemo } from "react";

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner className={"bg-black/50 backdrop-blur-sm"}>
        <KBarAnimator className={"animation-wrapper"}>
          <KBarSearch className={"search-bar"} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          // Section Header
          <div className={"section-wrapper"}>{item}</div>
        ) : (
          // Single Action
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}

const ResultItem = forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId | null | undefined;
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const ancestors = useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId,
      );
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={`${
          active
            ? "bg-slate-400  rounded-lg text-gray-100 "
            : "transparent text-gray-500"
        } 'rounded-lg px-4 py-2 flex items-center cursor-pointer justify-between `}
      >
        <div className="flex items-center gap-2 text-base">
          {/* icon button */}
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <Fragment key={ancestor.id}>
                    <span className="mr-4 opacity-50">{ancestor.name}</span>
                    <span className="mr-4">&rsaquo;</span>
                  </Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span className="text-sm">{action.subtitle}</span>
            )}
          </div>
        </div>
        {/* shortcut button */}
        {action.shortcut?.length ? (
          <div aria-hidden className="grid grid-flow-col gap-2">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className={`${
                  active
                    ? "bg-white text-slate-400 "
                    : "bg-gray-200 text-gray-500"
                } ' px-3 py-2 flex rounded-md items-center cursor-pointer justify-between `}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

export default CommandBar;
