import clsx from "clsx";
export default function PaginateItem({
  page,
  active,
  onClick,
}: {
  page: number;
  active?: boolean;
  onClick?: (page: number) => void;
}) {
  return (
    <button
      onClick={() => onClick && onClick(page)}
      className={clsx(
        `min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2`,
        active && "bg-slate-800 border-slate-800 text-white",
        !active && "text-slate-600"
      )}
    >
      {page}
    </button>
  );
}
