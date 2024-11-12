import NextBtn from "./NextBtn";
import PaginateItem from "./PaginateItem";
import PrevBtn from "./PrevBtn";

export default function Paginate({
  page,
  pageSize,
  prev = false,
  next = true,
  onClick,
  onClickPrev,
  onClickNext,
}: {
  page: number;
  pageSize: number;
  prev?: boolean;
  next?: boolean;
  onClick?: (page: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}) {
  const range = Array.from({ length: pageSize }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1 justify-center">
      {<PrevBtn disabled={!prev} onClick={onClickPrev} />}
      {range.map((item) => (
        <PaginateItem
          onClick={onClick}
          key={item}
          page={item}
          active={page === item}
        />
      ))}
      {<NextBtn disabled={!next} onClick={onClickNext} />}
    </div>
  );
}
