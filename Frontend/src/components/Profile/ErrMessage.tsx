import { CloseCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";


export default function ErrMessage({
  errMessage,
  deleteMessage,
}: {
  errMessage: string;
  deleteMessage: () => any;
}) {
 
  return (
    <div
      className={clsx(
        "absolute flex items-start min-h-24 gap-3 bg-red-500 pt-3 px-5 transition-all duration-300 text-white rounded-xl",
        errMessage ? "bottom-[60%]" : "bottom-[2000px]"
      )}
    >
      <h1>{errMessage}</h1>

      <CloseCircleOutlined
        className="text-xl"
        onClick={() => deleteMessage()}
      />
    </div>
  );
}
