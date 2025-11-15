import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileImageLoader() {
  return (
    <div className="  w-full h-full flex items-center justify-center">
      <div className="w-full h-full rounded-full overflow-hidden">
        <Skeleton
          circle
          width={"100%"}
          height={"100%"}
          baseColor="#00000020"
          highlightColor="#ffffff50"
        />
      </div>
    </div>
  );
}
