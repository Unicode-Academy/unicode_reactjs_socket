import EllipsisBtn from "./EllipsisBtn";
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
  const range = 4;
  return (
    <div className="flex space-x-1 justify-center">
      {<PrevBtn disabled={!prev} onClick={onClickPrev} />}
      {pageSize < range * 2 ? (
        Array.from({ length: pageSize }, (_, i) => i + 1).map((item) => (
          <PaginateItem
            onClick={onClick}
            key={item}
            page={item}
            active={page === item}
          />
        ))
      ) : (
        <>
          {page <= range && (
            <>
              <PaginateItem onClick={onClick} page={1} active={page === 1} />
              {Array.from({ length: range }, (_, i) => i + 1).map((item) => (
                <PaginateItem
                  onClick={onClick}
                  key={item + 1}
                  page={item + 1}
                  active={page === item + 1}
                />
              ))}
              <EllipsisBtn />
              <PaginateItem
                onClick={onClick}
                page={pageSize}
                active={page === pageSize}
              />
            </>
          )}
          {page > range && page < pageSize - (range - 1) && (
            <>
              <PaginateItem onClick={onClick} page={1} active={page === 1} />
              <EllipsisBtn />
              <PaginateItem onClick={onClick} page={page - 1} />
              <PaginateItem
                onClick={onClick}
                page={page}
                active={page === page}
              />
              <PaginateItem onClick={onClick} page={page + 1} />
              <EllipsisBtn />
              <PaginateItem
                onClick={onClick}
                page={pageSize}
                active={page === pageSize}
              />
            </>
          )}
          {page > pageSize - range && (
            <>
              <PaginateItem onClick={onClick} page={1} active={page === 1} />
              <EllipsisBtn />
              <PaginateItem onClick={onClick} page={pageSize - range} />
              {Array.from({ length: range }, (_, i) => i)
                .reverse()
                .map((item) => (
                  <PaginateItem
                    onClick={onClick}
                    key={pageSize - item}
                    page={pageSize - item}
                    active={page === pageSize - item}
                  />
                ))}
            </>
          )}
        </>
      )}

      {<NextBtn disabled={!next} onClick={onClickNext} />}
    </div>
  );
}

/*
Trường hợp 1: page <= 4 --> Hiển thị 1 2 3 4 ... 7
Trường hợp 2: page > 4 && page <= pageSize - 3 --> Hiển thị 1 ... page - 1 page page + 1 ... 7
Trường hợp 3: page > pageSize - 4 --> Hiển thị 1 ... 4 5 6 7
*/
