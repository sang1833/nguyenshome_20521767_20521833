import { Skeleton } from "@mui/material";

const ManySkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, indexTwo) => (
        <div key={indexTwo} className="plr-3 mt-3 block">
          <Skeleton variant="rectangular" width={280} height={140} />
          <Skeleton width="60%" />
          <Skeleton animation="wave" width={280} />
        </div>
      ))}
    </>
  );
};

export default ManySkeleton;
