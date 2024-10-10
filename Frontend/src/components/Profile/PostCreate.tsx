import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { PostType, RootState } from "../../dataTypes";
import { createPost } from "../../utils/postFunctions";
import { base64 } from "../../constants/constnats";



export function PostCreate({
  imgUrl,
  setImgUrl,
  setUserPosts,
}: {
  imgUrl: string;
  setImgUrl: Dispatch<SetStateAction<string>>;
  setUserPosts: Dispatch<SetStateAction<PostType[]>>;
}) {
  const theme = useSelector((state: RootState) => state.theme);
  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
  });
  const profileId = useSelector((state:RootState)=>state.myprofile.myprofile.id)
  return (
    <div
      className={clsx(
        "flex flex-col absolute p-4 rounded-xl",
        theme ? "bg-slate-100" : "[&_*]:text-white bg-slate-900"
      )}
    >
      <ArrowLeftOutlined className="mb-2" onClick={() => setImgUrl("")} />
      <img src={`${base64}${imgUrl}`} alt="Post" className="rounded-xl max-h-[170px] object-contain" />
      <form
        onSubmit={(e) => e.preventDefault()}
        className={clsx("flex mt-2 flex-col")}
      >
        <div className="p-2">
          <fieldset className="border pb-2 px-2 rounded-lg">
            <legend className="font-bold">Title*</legend>
            <input
              required
              value={postForm.title}
              onChange={({ target }) =>
                setPostForm((prev) => ({ ...prev, title: target.value }))
              }
              className="outline-none w-full bg-transparent font-extrabold font-sans"
              type="text"
            />
          </fieldset>
        </div>
        <div>
          <fieldset className="border p-1 rounded-lg">
            <legend>Description</legend>
            <textarea
              value={postForm.description}
              onChange={({ target }) =>
                setPostForm((prev) => ({ ...prev, description: target.value }))
              }
              className="outline-none bg-transparent resize-none w-full overflow-y-auto"
            />
          </fieldset>
        </div>
        <button
          type="submit"
          onClick={() =>
            createPost({
              imgUrl,
              setImgUrl,
              setUserPosts,
              userId:profileId,
              postForm,
            })
          }
          disabled={!postForm.title.length}
          className={clsx(
            "text-white outline-none border-none mt-3 self-start disabled:opacity-45 hover:scale-110 rounded-md transition-all duration-300 py-3 px-5",
            theme ? "bg-gradient-header" : "bg-gradient-to-blue bg-cyan-300"
          )}
        >
          Submit
          <ExportOutlined className="ml-2" />
        </button>
      </form>
    </div>
  );
}
