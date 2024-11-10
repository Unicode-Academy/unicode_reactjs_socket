import NextBtn from "./NextBtn";
import PaginateItem from "./PaginateItem";
import PrevBtn from "./PrevBtn";

export default function Paginate({
  page,
  pageSize,
  prev = false,
  next = true,
  onClick,
}: {
  page: number;
  pageSize: number;
  prev?: boolean;
  next?: boolean;
  onClick?: (page: number) => void;
}) {
  const range = Array.from({ length: pageSize }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1 justify-center">
      {prev && <PrevBtn />}
      {range.map((item) => (
        <PaginateItem
          onClick={onClick}
          key={item}
          page={item}
          active={page === item}
        />
      ))}
      {next && <NextBtn />}
    </div>
  );
}
